import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-button',
  standalone: true,
  imports: [],
  templateUrl: './contact-button.html',
  styleUrl: './contact-button.css'
})
export class ContactButton {
  @Input() email!: string;
  @Input() phone?: string;

  @Output() requestContact = new EventEmitter<'email' | 'phone' | 'both'>();

  request(type: 'email' | 'phone' | 'both') {
    this.requestContact.emit(type);
  }
}
