// Cette page filtre le catalogue et coordonne les favoris des cartes.
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventCard } from '../event-card/event-card';
import { EventService } from '../../services/event.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-event-list',
  imports: [EventCard, RouterLink],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventList {
  private readonly eventService = inject(EventService);
  private readonly toastService = inject(ToastService);

  readonly categories = ['Tous', 'Atelier', 'Conférence', 'Sport'] as const;
  readonly selectedCategory = signal<(typeof this.categories)[number]>('Tous');
  readonly searchTerm = signal('');

  readonly eventCount = this.eventService.eventCount;
  readonly favoriteCount = this.eventService.favoriteCount;
  readonly freeEventCount = this.eventService.freeEventCount;

  readonly filteredEvents = computed(() => {
    const selectedCategory = this.selectedCategory();
    const rawSearch = this.searchTerm().trim().toLowerCase();

    return this.eventService.events().filter((event) => {
      const matchesCategory = selectedCategory === 'Tous' || event.category === selectedCategory;
      const matchesSearch =
        !rawSearch ||
        [event.title, event.category, event.location, event.description].some((value) =>
          value.toLowerCase().includes(rawSearch),
        );

      return matchesCategory && matchesSearch;
    });
  });

  selectCategory(category: (typeof this.categories)[number]): void {
    this.selectedCategory.set(category);
  }

  setSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  resetFilters(): void {
    this.selectedCategory.set('Tous');
    this.searchTerm.set('');
  }

  isFavorite(eventId: string): boolean {
    return this.eventService.favorites().has(eventId);
  }

  toggleFavorite(eventId: string): void {
    this.eventService.toggleFavorite(eventId);
  }

  deleteEvent(eventId: string): void {
    const event = this.eventService.getEventById(eventId);

    if (!event) {
      return;
    }

    const confirmed = window.confirm(`Supprimer l’événement « ${event.title} » ?`);

    if (!confirmed) {
      return;
    }

    this.eventService.deleteEvent(eventId);
    this.toastService.show('Événement supprimé avec succès.', 'success');
  }
}
