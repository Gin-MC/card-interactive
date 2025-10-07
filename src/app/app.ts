import { Component, signal } from '@angular/core';
import { Profile } from "./profile/profile";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ Profile],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('card-interactive');
}
