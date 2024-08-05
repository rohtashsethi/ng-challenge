import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RepositoriesListComponent {
  repos$: Observable<Repository[]>;
  cursor$: Observable<string | null>;
  hasNextPage$: Observable<boolean>;

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'name', maxWidth: 150, pinned: 'left', resizable: true},
    { field: 'description', resizable: true  },
    { field: 'stargazerCount', headerName: 'Stars', resizable: true },
    {
      field: 'createdAt',
      resizable: true,
      valueFormatter: (p) =>
        p.value && this.datePipe.transform(p.value ?? '', 'medium'),
    },
  ];

  gridOptions: GridOptions = {
    defaultColDef: {
      flex: 1,
      minWidth: 200,
    }
  };

  constructor(private store: Store, private datePipe: DatePipe) {
    this.repos$ = this.store.select(RepositorySelectors.selectRepositories);
    this.cursor$ = this.store.select(RepositorySelectors.selectRepositoriesCursor);
    this.hasNextPage$ = this.store.select(RepositorySelectors.selectRepositoriesHasNextPage);
  }

  filterRepos(filter: string): void {
    this.store.dispatch(RepositoryActions.filterRepositories({ filter }));
  }

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }

  loadMore(cursor: string): void {
    this.store.dispatch(
      RepositoryActions.loadRepositories({ cursor, limit: 20})
    );
  }
}
