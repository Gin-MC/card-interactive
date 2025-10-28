import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Avatar } from './avatar/avatar';
import { UserInfo } from './user-info/user-info';
import { ContactButton } from './contact-button/contact-button';

enum ContactMethod {
  EMAIL = 'email',
  PHONE = 'phone',
  BOTH = 'both',
  NONE = 'none'
}

interface User {
  name: string;
  lastName: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, Avatar, UserInfo, ContactButton],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  user: User = {
    name: 'Gino',
    lastName: 'Cotos',
    title: 'Software Developer',
    bio: 'Developer passionate about creating interactive web applications.',
    email: 'xHn4o@example.com',
    phone: '123-456-7890',
    avatarUrl: 'https://cdn-icons-png.flaticon.com/512/1995/1995515.png'
  };

  showContactInfo: boolean = false;
  contactMethod: ContactMethod = ContactMethod.NONE;
  notificationTimeout?: number;

  constructor() {
    this.validateUserData();
  }

  private validateUserData(): void {
    if (!this.user.name || !this.user.lastName || !this.user.title || !this.user.bio || !this.user.email) {
      throw new Error('Campos obligatorios faltantes en datos de usuario');
    }
  }

  onRequestContact(method: ContactMethod) {
    if (!this.isValidContactMethod(method)) {
      this.showNotification('Método de contacto no válido');
      return;
    }
    this.contactMethod = method;
    this.showContactInfo = true;
  }

  // Maneja el evento emitido por el componente Avatar cuando cambia su tamaño
  onAvatarExpand(isLarge: boolean): void {
    // Ejemplo de reacción: mostrar una notificación breve y log en consola
    console.log('Avatar expandido?', isLarge);
    this.showNotification(isLarge ? 'Avatar expandido' : 'Avatar contraído');
  }

  private isValidContactMethod(method: ContactMethod): boolean {
    if (method === ContactMethod.PHONE && !this.user.phone) {
      return false;
    }
    return Object.values(ContactMethod).includes(method);
  }

  closeContact(): void {
    this.showContactInfo = false;
    this.contactMethod = ContactMethod.NONE;
  }

  async copyEmailToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.user.email);
      this.showNotification('Email copiado: ' + this.user.email);
    } catch (err) {
      console.error('Error al copiar email:', err);
      this.showNotification('No se pudo copiar el email', true);
    }
  }

  async copyPhoneToClipboard(): Promise<void> {
    if (!this.user.phone) return;
    try {
      await navigator.clipboard.writeText(this.user.phone);
      this.showNotification('Phone copiado: ' + this.user.phone);
    } catch (err) {
      console.error('Error al copiar phone:', err);
      this.showNotification('No se pudo copiar el phone', true);
    }
  }

  private showNotification(message: string, isError: boolean = false): void {
    // Limpiar notificación anterior si existe
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }

    const notificationEvent = new CustomEvent('show-notification', {
      detail: { message, isError }
    });
    document.dispatchEvent(notificationEvent);

    // Auto-ocultar después de 3 segundos
    this.notificationTimeout = window.setTimeout(() => {
      document.dispatchEvent(new CustomEvent('hide-notification'));
    }, 3000);
  }

  @HostListener('document:keydown', ['$event'])
  onEsc(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.showContactInfo) {
      event.preventDefault();
      this.closeContact();
    }
  }
  
}
