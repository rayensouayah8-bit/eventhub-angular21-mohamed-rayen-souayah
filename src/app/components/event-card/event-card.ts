// Cette carte présente un événement et remonte au parent les clics favoris.
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-card',
  imports: [CurrencyPipe, DatePipe, RouterLink, UpperCasePipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCard {
  readonly event = input.required<Event>();
  readonly favorite = input(false);
  readonly favoriteToggle = output<string>();
}
