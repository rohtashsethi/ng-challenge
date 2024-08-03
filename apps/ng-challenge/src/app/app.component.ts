import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GithubService } from './services/github.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ng-challenge';

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.githubService.getUserInfo('rohtashsethi').subscribe({
      next: (user) => {
        console.log('User Info: ', user);
      },
    });

    this.githubService.getRepositories('rohtashsethi').subscribe({
      next: (repos) => {
        console.log('User Repos: ', repos);
      },
    });
  }
}
