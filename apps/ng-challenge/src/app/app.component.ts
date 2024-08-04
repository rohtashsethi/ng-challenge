import { GITHUB_OAUTH_APP } from './configs/oauth.config';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import * as RepositoryActions from './store/repositories.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ng-challenge';
  pages = [
    { title: 'Home', route: '/' },
    { title: 'Repositories', route: '/repositories' },
    { title: 'Report', route: '/report'}
  ];
  githubOauthUrl = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.setGithubOAuthUrl();
    this.fetchRepos();
  }

  /**
   * Dispaches Load Repository action to store 
   *
   * @memberof AppComponent
   */
  fetchRepos(): void {
    this.store.dispatch(
      RepositoryActions.loadRepositories({ login: 'rohtashsethi' })
    );
  }

  setGithubOAuthUrl(): void {
    const config = GITHUB_OAUTH_APP;
    this.githubOauthUrl = `${config.URI}?client_id=${config.CLIENT_ID}&scope=${config.SCOPE}`;
  }
}
