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
  ]

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchRepos();
  }

  fetchRepos(): void {
    this.store.dispatch(
      RepositoryActions.loadRepositories({ login: 'rohtashsethi' })
    );
  }
}
