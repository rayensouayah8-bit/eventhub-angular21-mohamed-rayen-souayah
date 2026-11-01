// Cette page lit l'identifiant de route et affiche la fiche de l'événement.
import { ChangeDetectionStrategy, Component, computed, input, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-event-details',
  imports: [CurrencyPipe, DatePipe, RouterLink, UpperCasePipe],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetails {
  readonly id = input.required<string>();
  private readonly eventService = inject(EventService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  readonly event = computed<Event | undefined>(() => this.eventService.getEventById(this.id()));
  readonly favorite = computed(() => {
    const currentEvent = this.event();
    return currentEvent ? this.eventService.favorites().has(currentEvent.id) : false;
  });

  toggleFavorite(): void {
    const currentEvent = this.event();
    if (currentEvent) {
      this.eventService.toggleFavorite(currentEvent.id);
    }
  }

  deleteEvent(): void {
    const currentEvent = this.event();
    if (!currentEvent) {
      return;
    }

    const confirmed = window.confirm(`Supprimer l’événement « ${currentEvent.title} » ?`);

    if (!confirmed) {
      return;
    }

    this.eventService.deleteEvent(currentEvent.id);
    this.toastService.show('Événement supprimé avec succès.', 'success');
    this.router.navigate(['/events']);
  }
}
