import { Routes } from '@angular/router';
import { EventList } from './components/event-list/event-list';
import { EventDetails } from './components/event-details/event-details';
import { NotFound } from './components/not-found/not-found';

// Les pages principales sont routées ici ; la page À propos est importée à la demande.
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'events' },
  { path: 'events', component: EventList },
  { path: 'events/:id', component: EventDetails },
  {
    path: 'favorites',
    loadComponent: () => import('./components/favorites/favorites').then((module) => module.Favorites),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((module) => module.About),
  },
  { path: '**', component: NotFound },
];
