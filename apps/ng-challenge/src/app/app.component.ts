import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-challenge';
  constructor(private router: Router) {
    this.router.events.subscribe({
      next: data => {
        console.log(data);
      }
    })
  }
}
