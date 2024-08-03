import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RepositoryActions from './store/repositories.actions';
import * as RepositorySelectors from './store/repositories.selectors';
import { Repository } from './models/repositories.models';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ng-challenge';
  repos$: Observable<Repository[]> | null = null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchRepos();
    this.repos$ = this.store.select(RepositorySelectors.selectRepositories);
  }

  fetchRepos(): void {
    this.store.dispatch(RepositoryActions.loadRepositories({ login: 'rohtashsethi' }));
  }

  filterRepos(filter: string): void {
    this.store.dispatch(RepositoryActions.filterRepositories({ filter }));
  }
}
