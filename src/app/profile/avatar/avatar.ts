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
  // Emite el estado actual de expansión (true = grande, false = pequeño)
  @Output() expand = new EventEmitter<boolean>();

  islarge: boolean = false;

  toggleSize() {
    this.islarge = !this.islarge;
    // Emitimos el nuevo estado para que el padre pueda reaccionar
    this.expand.emit(this.islarge);
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
