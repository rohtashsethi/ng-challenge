import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RepositoryActions from './../../store/repositories.actions';
import * as RepositorySelectors from './../../store/repositories.selectors';
import { Repository } from '../../models/repositories.models';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-repositories-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './repositories-list.component.html',
  styleUrl: './repositories-list.component.css'
})
export default class RepositoriesListComponent {
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
