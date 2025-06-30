import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor() { }

  private baseOptions = {
    background: '#0f0f0f',
    color: '#ffffff',
    customClass: {
      title: 'swal2-title-custom',
      popup: 'swal2-popup-custom',
      confirmButton: 'swal2-confirm-custom',
      htmlContainer: 'swal2-text-custom'
    },
    buttonsStyling: false
  };

  showSuccess(title: string, message: string) {
    Swal.fire({
      ...this.baseOptions,
      icon: 'success',
      title,
      text: message
    });
  }

  showError(title: string, message: string) {
    Swal.fire({
      ...this.baseOptions,
      icon: 'error',
      title,
      text: message
    });
  }

  showWarning(title: string, message: string) {
    Swal.fire({
      ...this.baseOptions,
      icon: 'warning',
      title,
      text: message
    });
  }

  showInfo(title: string, message: string) {
    Swal.fire({
      ...this.baseOptions,
      icon: 'info',
      title,
      text: message
    });
  }

  showCustom(icon: SweetAlertIcon, title: string, message: string) {
    Swal.fire({
      ...this.baseOptions,
      icon,
      title,
      text: message
    });
  }
}