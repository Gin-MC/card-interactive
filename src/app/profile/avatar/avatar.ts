import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css'
})
export class Avatar {
  @Input() src?: string;
  @Input() alt: string = 'User Avatar';
  @Output() expand = new EventEmitter<void>();

  islarge: boolean = false;

  toggleSize() {
    this.islarge = !this.islarge;
    this.expand.emit();// Notifica al componente padre que se ha expandido o contraído el avatar
  }

  get initials(): string {
    if (!this.src) {
      return this.alt
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .join('');
    }
    return 'User';
  }
}
