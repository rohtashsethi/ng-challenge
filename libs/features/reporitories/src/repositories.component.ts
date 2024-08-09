import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

import {
  RepositoriesStore,
} from '@lib/shared/data-store';

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
  readonly repositoryStore = inject(RepositoriesStore);

  repos$ = computed(() => {
    this.disableLoad = false;
      return this.repositoryStore.getRepositories();
  });

  loaded$ = computed(() => {
    return this.repositoryStore.loaded();
  })

  disableLoad = false;


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

  constructor(private store: Store, private datePipe: DatePipe) {}


  filterRepos(filter: string): void {
    this.repositoryStore.setFilter(filter);
  }

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }

  loadMore(cursor: string): void {
    this.disableLoad = true;
    this.repositoryStore.load(cursor, 20);
  }
}
