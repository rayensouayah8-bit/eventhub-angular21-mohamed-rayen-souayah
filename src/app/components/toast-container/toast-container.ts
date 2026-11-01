import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  template: `
    @if (toastService.items().length) {
      <div class="toast-stack" aria-live="polite" aria-atomic="true">
        @for (toast of toastService.items(); track toast.id) {
          <div class="toast toast-{{ toast.type }}">
            <span class="toast-icon" aria-hidden="true">{{ toast.type === 'success' ? '✓' : '!' }}</span>
            <span>{{ toast.message }}</span>
          </div>
        }
      </div>
    }
  `,
  styles: `
    :host {
      position: fixed;
      right: 1rem;
      bottom: 1rem;
      z-index: 1000;
      display: block;
    }

    .toast-stack {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .toast {
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;
      min-width: min(22rem, calc(100vw - 2rem));
      max-width: 24rem;
      padding: 0.9rem 1rem;
      border: 1px solid rgba(148, 163, 184, 0.25);
      border-radius: 14px;
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
      backdrop-filter: blur(10px);
      color: #0f172a;
      font-size: 0.9rem;
      font-weight: 700;
      animation: toast-slide-in 0.25s ease;
    }

    .toast-success {
      background: rgba(236, 253, 245, 0.94);
      border-color: rgba(16, 185, 129, 0.22);
    }

    .toast-error {
      background: rgba(254, 242, 242, 0.95);
      border-color: rgba(239, 68, 68, 0.22);
    }

    .toast-icon {
      display: grid;
      width: 1.5rem;
      height: 1.5rem;
      place-items: center;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.7);
      font-size: 0.8rem;
    }

    @keyframes toast-slide-in {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastContainer {
  protected readonly toastService = inject(ToastService);
}
