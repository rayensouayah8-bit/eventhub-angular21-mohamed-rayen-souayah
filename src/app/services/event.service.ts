import { computed, Injectable, signal } from '@angular/core';
import { Event } from '../models/event.model';
import { EVENTS } from '../data/events.data';

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly _events = signal<Event[]>([...EVENTS]);
  private readonly _favorites = signal<Set<string>>(new Set());

  readonly events = this._events.asReadonly();
  readonly favorites = this._favorites.asReadonly();

  readonly eventCount = computed(() => this._events().length);
  readonly favoriteCount = computed(() => this._favorites().size);
  readonly freeEventCount = computed(() => this._events().filter((event) => event.price === 0).length);

  getEventById(id: string): Event | undefined {
    return this._events().find((event) => event.id === id);
  }

  addEvent(event: Omit<Event, 'id'>): Event {
    const createdEvent: Event = {
      ...event,
      id: this.generateId(),
    };

    this._events.update((currentEvents) => [...currentEvents, createdEvent]);
    return createdEvent;
  }

  deleteEvent(id: string): void {
    this._events.update((currentEvents) => currentEvents.filter((event) => event.id !== id));
    this._favorites.update((currentFavorites) => {
      const nextFavorites = new Set(currentFavorites);
      nextFavorites.delete(id);
      return nextFavorites;
    });
  }

  toggleFavorite(id: string): void {
    if (!this._events().some((event) => event.id === id)) {
      return;
    }

    this._favorites.update((currentFavorites) => {
      const nextFavorites = new Set(currentFavorites);

      if (nextFavorites.has(id)) {
        nextFavorites.delete(id);
      } else {
        nextFavorites.add(id);
      }

      return nextFavorites;
    });
  }

  private generateId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }

    return `event-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
}
