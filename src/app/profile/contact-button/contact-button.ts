import { Component, Input, Output, EventEmitter } from '@angular/core';

enum ContactMethod {
  EMAIL = 'email',
  PHONE = 'phone',
  BOTH = 'both',
  NONE = 'none'
}

@Component({
  selector: 'app-contact-button',
  standalone: true,
  imports: [],
  templateUrl: './contact-button.html',
  styleUrl: './contact-button.css'
})
export class ContactButton {
  // Exponer el enum al template para poder usar ContactMethod.EMAIL/PHONE en la vista
  ContactMethod = ContactMethod;
  @Input() email!: string;
  @Input() phone?: string;

  @Output() requestContact = new EventEmitter<ContactMethod>();

  request(type: ContactMethod) {
    this.requestContact.emit(type);
  }
}
