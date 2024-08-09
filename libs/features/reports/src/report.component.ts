import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { BarchartComponent, BarChartItem } from '@lib/barchart';
import { RepositoriesStore } from '@lib/shared/data-store';
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
  store = inject(RepositoriesStore);
  topRepos$: Signal<BarChartItem[]> = computed(() => {
    return this.store.getTopRepositories();
  });
}
