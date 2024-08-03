import { Component } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

import * as RepositoryActions from './../../store/repositories.actions';
import * as RepositorySelectors from './../../store/repositories.selectors';
import { Repository } from '../../models/repositories.models';

@Component({
  selector: 'app-repositories-list',
  standalone: true,
  imports: [AsyncPipe, AgGridAngular],
  providers: [DatePipe],
  templateUrl: './repositories-list.component.html',
  styleUrl: './repositories-list.component.css',
})
export default class RepositoriesListComponent {
  repos$: Observable<Repository[]> | null = null;

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'name', flex: 1, filter: true },
    { field: 'description', flex: 2, filter: true },
    { field: 'stargazerCount', headerName: 'Stars', flex: 1, filter: true },
    {
      field: 'createdAt',
      flex: 1,
      filter: true,
      valueFormatter: (p) =>
        p.value && this.datePipe.transform(p.value || '', 'medium'),
    },
  ];

  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 15, 20];

  constructor(private store: Store, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.fetchRepos();
    this.repos$ = this.store.select(RepositorySelectors.selectRepositories);
  }

  fetchRepos(): void {
    this.store.dispatch(
      RepositoryActions.loadRepositories({ login: 'rohtashsethi' })
    );
  }

  filterRepos(filter: string): void {
    this.store.dispatch(RepositoryActions.filterRepositories({ filter }));
  }
}
