import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css'
})
export class UserInfo {
  @Input() user!: {
    name: string;
    lastName: string;
    title: string;
    bio: string;
    email: string;
    phone?: string;
    avatarUrl?: string;
  };
}
