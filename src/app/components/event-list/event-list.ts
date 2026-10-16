// Cette page filtre le catalogue et coordonne les favoris des cartes.
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { EventCard } from '../event-card/event-card';
import { EVENTS } from '../../data/events.data';
import { Event } from '../../models/event.model';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-event-list',
  imports: [EventCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventList {
  private readonly favorites = inject(FavoritesService);
  readonly categories = ['Tous', 'Atelier', 'Conférence', 'Sport'] as const;
  readonly selectedCategory = signal<string>('Tous');
  readonly events = signal<Event[]>(EVENTS);
  readonly filteredEvents = computed(() => {
    const category = this.selectedCategory();
    return category === 'Tous'
      ? this.events()
      : this.events().filter((event) => event.category === category);
  });

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  isFavorite(eventId: string): boolean {
    return this.favorites.isFavorite(eventId);
  }

  toggleFavorite(eventId: string): void {
    this.favorites.toggle(eventId);
  }
}
