import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { ToastService } from '../../services/toast.service';

type EventFormSchema = {
  title: string;
  category: string;
  date: string;
  place: string;
  price: number | null;
  imageUrl: string;
  description: string;
};

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './event-form.html',
  styleUrl: './event-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventForm {
  private readonly eventService = inject(EventService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  readonly submitted = signal(false);
  readonly isSubmitting = signal(false);

  readonly eventForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
      nonNullable: true,
    }),
    category: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    date: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    place: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    price: new FormControl<number | null>(0, {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: false,
    }),
    imageUrl: new FormControl('', {
      validators: [this.imageUrlValidator],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(20)],
      nonNullable: true,
    }),
  });

  readonly formValue = toSignal(this.eventForm.valueChanges, {
    initialValue: this.eventForm.getRawValue() as EventFormSchema,
  });

  readonly formStatus = toSignal(this.eventForm.statusChanges, {
    initialValue: this.eventForm.status,
  });

  readonly imagePreview = computed(() => {
    const rawValue = this.eventForm.get('imageUrl')?.value?.trim();

    if (!rawValue) {
      return '';
    }

    try {
      const parsedUrl = new URL(rawValue);
      return parsedUrl.href;
    } catch {
      return '';
    }
  });

  readonly titleControl = this.eventForm.controls.title;
  readonly categoryControl = this.eventForm.controls.category;
  readonly dateControl = this.eventForm.controls.date;
  readonly placeControl = this.eventForm.controls.place;
  readonly priceControl = this.eventForm.controls.price;
  readonly imageUrlControl = this.eventForm.controls.imageUrl;
  readonly descriptionControl = this.eventForm.controls.description;

  addEvent(): void {
    if (this.eventForm.invalid) {
      this.submitted.set(true);
      this.eventForm.markAllAsTouched();
      this.toastService.show('Le formulaire contient des erreurs.', 'error');
      return;
    }

    this.isSubmitting.set(true);

    const formValues = this.eventForm.getRawValue() as EventFormSchema;
    const createdEvent = this.eventService.addEvent({
      title: formValues.title.trim(),
      category: formValues.category as Event['category'],
      date: formValues.date,
      location: formValues.place.trim(),
      price: Number(formValues.price ?? 0),
      image: formValues.imageUrl?.trim() || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      description: formValues.description.trim(),
    });

    this.toastService.show(`Événement « ${createdEvent.title} » publié avec succès.`, 'success');
    this.eventForm.reset({
      title: '',
      category: '',
      date: '',
      place: '',
      price: 0,
      imageUrl: '',
      description: '',
    });
    this.submitted.set(false);
    this.isSubmitting.set(false);

    this.router.navigate(['/events']);
  }

  cancel(): void {
    this.eventForm.reset({
      title: '',
      category: '',
      date: '',
      place: '',
      price: 0,
      imageUrl: '',
      description: '',
    });
    this.submitted.set(false);
    this.router.navigate(['/events']);
  }

  private imageUrlValidator(control: AbstractControl): { invalidUrl: true } | null {
    const rawValue = control.value?.trim();

    if (!rawValue) {
      return null;
    }

    try {
      new URL(rawValue);
      return null;
    } catch {
      return { invalidUrl: true };
    }
  }
}
