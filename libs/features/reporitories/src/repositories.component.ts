import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

import {
  filterRepositories,
  loadRepositories,
  selectRepositories,
  selectRepositoriesCursor,
  selectRepositoriesHasNextPage,
} from '@lib/shared/data-store';
import { Repository } from '@lib/shared/types';

@Component({
  selector: 'lib-repositories-list',
  standalone: true,
  imports: [AsyncPipe, AgGridAngular],
  providers: [DatePipe],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesComponent {
  repos$: Observable<Repository[]>;
  cursor$: Observable<string | null>;
  hasNextPage$: Observable<boolean>;

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'name', maxWidth: 150, pinned: 'left', resizable: true },
    { field: 'description', resizable: true },
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
    },
  };

  constructor(private store: Store, private datePipe: DatePipe) {
    this.repos$ = this.store.select(selectRepositories);
    this.cursor$ = this.store.select(selectRepositoriesCursor);
    this.hasNextPage$ = this.store.select(selectRepositoriesHasNextPage);
  }

  filterRepos(filter: string): void {
    this.store.dispatch(filterRepositories({ filter }));
  }

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }

  loadMore(cursor: string): void {
    this.store.dispatch(loadRepositories({ cursor, limit: 20 }));
  }
}
