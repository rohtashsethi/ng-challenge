import { Component } from '@angular/core';
import { BarchartComponent, BarChartItem } from 'barchart';
import { map, Observable } from 'rxjs';
import { Repository } from '../../models/repositories.models';
import { Store } from '@ngrx/store';
import * as RepositorySelectors from '../../store/repositories.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [BarchartComponent, AsyncPipe],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export default class ReportComponent {
  stars$: Observable<BarChartItem[]> | null = null;

  constructor(private store: Store) {
    this.stars$ = this.store.select(RepositorySelectors.selectStarInfo);
  }
}
