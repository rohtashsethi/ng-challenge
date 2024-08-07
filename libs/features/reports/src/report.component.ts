import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BarchartComponent, BarChartItem } from '@lib/barchart';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectStarInfo } from '@lib/shared/data-store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-report',
  standalone: true,
  imports: [BarchartComponent, AsyncPipe],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent {
  stars$: Observable<BarChartItem[]> | null = null;

  constructor(private store: Store) {
    this.stars$ = this.store.select(selectStarInfo);
  }
}
