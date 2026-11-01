import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly messageList = signal<ToastMessage[]>([]);

  readonly items = this.messageList.asReadonly();

  show(message: string, type: ToastType = 'success'): void {
    const toast: ToastMessage = {
      id: Date.now() + Math.random(),
      type,
      message,
    };

    this.messageList.update((currentMessages) => [...currentMessages, toast]);

    window.setTimeout(() => {
      this.messageList.update((currentMessages) => currentMessages.filter((currentToast) => currentToast.id !== toast.id));
    }, 3200);
  }
}
