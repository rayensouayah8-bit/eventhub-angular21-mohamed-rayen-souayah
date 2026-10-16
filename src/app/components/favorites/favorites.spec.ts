import { TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { provideRouter } from '@angular/router';
import { Favorites } from './favorites';
import { FavoritesService } from '../../services/favorites.service';
import { EVENTS } from '../../data/events.data';

describe('Favorites', () => {
  beforeEach(async () => {
    registerLocaleData(localeFr);
    await TestBed.configureTestingModule({
      imports: [Favorites],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('explains how to add a favorite when the selection is empty', () => {
    const fixture = TestBed.createComponent(Favorites);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Votre sélection est encore vide');
    expect(fixture.nativeElement.textContent).toContain('Ajoutez un événement à vos favoris');
  });

  it('updates the list when favorites are added and removed', () => {
    const fixture = TestBed.createComponent(Favorites);
    const favorites = TestBed.inject(FavoritesService);
    fixture.detectChanges();

    favorites.toggle(EVENTS[0].id);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(EVENTS[0].title);
    expect(fixture.nativeElement.textContent).not.toContain('Votre sélection est encore vide');

    favorites.toggle(EVENTS[0].id);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain(EVENTS[0].title);
    expect(fixture.nativeElement.textContent).toContain('Votre sélection est encore vide');
  });
});
