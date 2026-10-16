// Cette page informe l'utilisateur lorsqu'une URL ne correspond à aucune route.
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <main class="not-found">
      <span class="not-found-code">404</span>
      <h1>Oups, cette page s’est perdue.</h1>
      <p>Le lien est peut-être incorrect ou cette page n’existe plus.</p>
      <a routerLink="/events">Retourner aux événements</a>
    </main>
  `,
  styles: [`
    .not-found {
      display: grid;
      min-height: 70vh;
      align-content: center;
      justify-items: center;
      padding: 2rem;
      text-align: center;
    }
    .not-found-code {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      background-clip: text;
      color: transparent;
      font-size: clamp(5rem, 20vw, 9rem);
      font-weight: 900;
      letter-spacing: -0.09em;
      line-height: 1;
    }
    h1 { color: #1e293b; font-size: clamp(1.5rem, 5vw, 2.3rem); letter-spacing: -0.05em; }
    p { color: #64748b; }
    a {
      margin-top: 1rem;
      padding: 0.85rem 1.1rem;
      border-radius: 12px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: #fff;
      font-weight: 750;
      text-decoration: none;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {}
