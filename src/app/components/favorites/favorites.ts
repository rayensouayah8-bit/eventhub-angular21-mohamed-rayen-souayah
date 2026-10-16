// Cette page dérive la liste des événements affichés depuis les favoris partagés.
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventCard } from '../event-card/event-card';
import { EVENTS } from '../../data/events.data';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  imports: [EventCard, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Favorites {
  private readonly favorites = inject(FavoritesService);

  readonly favoriteEvents = computed(() => {
    const favoriteIds = this.favorites.ids();
    return EVENTS.filter((event) => favoriteIds.has(event.id));
  });

  toggleFavorite(eventId: string): void {
    this.favorites.toggle(eventId);
  }
}
