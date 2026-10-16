// Ce service conserve les favoris partagés entre les pages et le bandeau.
import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly favoriteIds = signal<Set<string>>(new Set());

  readonly ids = computed(() => this.favoriteIds());
  readonly count = computed(() => this.favoriteIds().size);

  isFavorite(eventId: string): boolean {
    return this.favoriteIds().has(eventId);
  }

  toggle(eventId: string): void {
    this.favoriteIds.update((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(eventId)) {
        nextIds.delete(eventId);
      } else {
        nextIds.add(eventId);
      }

      return nextIds;
    });
  }
}
