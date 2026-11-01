// Ce service conserve les favoris partagés entre les pages et le bandeau.
import { computed, inject, Injectable } from '@angular/core';
import { EventService } from './event.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly eventService = inject(EventService);

  readonly ids = computed(() => this.eventService.favorites());
  readonly count = computed(() => this.eventService.favoriteCount());

  isFavorite(eventId: string): boolean {
    return this.eventService.favorites().has(eventId);
  }

  toggle(eventId: string): void {
    this.eventService.toggleFavorite(eventId);
  }
}
