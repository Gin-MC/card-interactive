import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Avatar } from './avatar/avatar';
import { UserInfo } from './user-info/user-info';
import { ContactButton } from './contact-button/contact-button';

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
  contactMethod: 'email'| 'phone' | 'both' | 'none' = 'none';

  onRequestContact(method: 'email' | 'phone' | 'both') {
    this.contactMethod = method;
    this.showContactInfo = true;
  }

  closeContact() {
    this.showContactInfo = false;
    this.contactMethod = 'none';
  }

  async copyEmailToClipboard() {
    try {
      await navigator.clipboard.writeText(this.user.email);
      alert('Se ha copiado el email: ' + this.user.email);
    } catch (err) {
      console.error('Failed to copy email: ', err);
      alert("No se puede copiar el email: " + this.user.email);
    }
  }

  @HostListener('document:keydown', ['$event'])
  onEsc(event: KeyboardEvent) {
      if (event.key === 'Escape' && this.showContactInfo) {
       event.preventDefault();
       this.closeContact();
     }
  }
  
}
