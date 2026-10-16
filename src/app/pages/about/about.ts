// Cette page explique l'objectif d'EventHub et est chargée à la demande.
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  template: `
    <main class="about-page">
      <section class="about-hero">
        <span class="eyebrow">À PROPOS D’EVENTHUB</span>
        <h1>Le campus est plus vivant <span>qu’on ne le croit.</span></h1>
        <p>EventHub rassemble les rendez-vous universitaires au même endroit pour vous aider à apprendre, rencontrer et créer de beaux souvenirs.</p>
        <a routerLink="/events">Découvrir les événements <span aria-hidden="true">→</span></a>
      </section>
      <section class="about-values" aria-label="Nos valeurs">
        <article><span>01</span><h2>Apprendre</h2><p>Des ateliers accessibles pour découvrir des idées et des compétences nouvelles.</p></article>
        <article><span>02</span><h2>Rencontrer</h2><p>Des conférences et des moments partagés qui rapprochent toute la communauté.</p></article>
        <article><span>03</span><h2>Participer</h2><p>Des événements sportifs et solidaires pour faire bouger les campus ensemble.</p></article>
      </section>
      <footer class="about-credit">Un projet universitaire imaginé par <strong>Mohamed Rayen Souayah</strong>.</footer>
    </main>
  `,
  styles: [`
    .about-page { max-width: 1100px; min-height: 75vh; margin: 0 auto; padding: clamp(3rem, 8vw, 6rem) 1.5rem 3rem; }
    .about-hero { max-width: 720px; margin: 0 auto 4rem; text-align: center; }
    .eyebrow { color: #6366f1; font-size: 0.72rem; font-weight: 850; letter-spacing: 0.14em; }
    h1 { margin: 1rem 0; color: #1e293b; font-size: clamp(2.5rem, 7vw, 4.6rem); font-weight: 850; letter-spacing: -0.07em; line-height: 1.02; }
    h1 span { background: linear-gradient(135deg, #6366f1, #8b5cf6); background-clip: text; color: transparent; }
    .about-hero > p { max-width: 590px; margin: 0 auto 1.5rem; color: #64748b; font-size: 1.05rem; line-height: 1.75; }
    .about-hero > a { display: inline-flex; gap: 0.7rem; padding: 0.85rem 1.1rem; border-radius: 12px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-weight: 750; text-decoration: none; transition: transform 0.3s ease; }
    .about-hero > a:hover { transform: scale(1.03); }
    .about-values { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
    .about-values article { padding: 1.5rem; border: 1px solid #e9edf5; border-radius: 16px; background: #fff; box-shadow: 0 4px 20px rgb(0 0 0 / 6%); }
    .about-values article > span { color: #8b5cf6; font-size: 0.75rem; font-weight: 850; letter-spacing: 0.12em; }
    .about-values h2 { margin: 0.8rem 0 0.45rem; color: #1e293b; font-size: 1.2rem; }
    .about-values p { margin: 0; color: #64748b; font-size: 0.9rem; line-height: 1.65; }
    .about-credit { margin-top: 3rem; color: #64748b; font-size: 0.85rem; text-align: center; }
    .about-credit strong { color: #334155; }
    @media (max-width: 680px) { .about-values { grid-template-columns: 1fr; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {}
