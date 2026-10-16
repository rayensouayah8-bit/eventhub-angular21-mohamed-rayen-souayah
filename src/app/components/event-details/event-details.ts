// Cette page lit l'identifiant de route et affiche la fiche de l'événement.
import { ChangeDetectionStrategy, Component, computed, input, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EVENTS } from '../../data/events.data';
import { Event } from '../../models/event.model';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-event-details',
  imports: [CurrencyPipe, DatePipe, RouterLink, UpperCasePipe],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetails {
  readonly id = input.required<string>();
  private readonly favorites = inject(FavoritesService);
  readonly event = computed<Event | undefined>(() => EVENTS.find((item) => item.id === this.id()));
  readonly favorite = computed(() => {
    const currentEvent = this.event();
    return currentEvent ? this.favorites.isFavorite(currentEvent.id) : false;
  });

  toggleFavorite(): void {
    const currentEvent = this.event();
    if (currentEvent) {
      this.favorites.toggle(currentEvent.id);
    }
  }
}
