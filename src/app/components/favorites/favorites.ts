// Cette page dérive la liste des événements affichés depuis les favoris partagés.
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventCard } from '../event-card/event-card';
import { EventService } from '../../services/event.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-favorites',
  imports: [EventCard, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Favorites {
  private readonly eventService = inject(EventService);
  private readonly toastService = inject(ToastService);

  readonly favoriteEvents = computed(() => {
    const favoriteIds = this.eventService.favorites();
    return this.eventService.events().filter((event) => favoriteIds.has(event.id));
  });

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
