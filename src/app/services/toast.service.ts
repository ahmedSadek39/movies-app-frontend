import { Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

type MessageTypes = 'success' | 'info' | 'error' | 'warn';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  
  constructor(private toast: HotToastService) {}

  private shortedMeassge(message: string) {
    if (message)
      return message?.length > 80 ? message?.slice(0, 80) + '...' : message;
    return 'Unknown Error';
  }

  showSuccess(message: string) {
    this.toast.success(this.shortedMeassge(message));
  }

  showError(message: string) {
    this.toast.error(this.shortedMeassge(message));
  }

  showWarning(message: string) {
    this.toast.warning(this.shortedMeassge(message));
  }

}
