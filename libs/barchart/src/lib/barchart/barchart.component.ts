import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
 import { BarChartItem } from './barchart';

@Component({
  selector: 'lib-barchart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barchart.component.html',
  styleUrl: './barchart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarchartComponent {
  @Input() set data(data: BarChartItem[]) {
    this.chartData = data || [];
    this.updateChart(this.height + (this.margin * 2));
  };

  @Input() set chartHeight(height: number) {
    this.updateChart(height);
  }

  @Input() set barColor(hexcode: string) {
    this._barColor = hexcode;
    this.updateChart(this.height + (this.margin * 2));
  }

  @Input() set chartMargin(margin: number) {
    this.margin = margin;
    this.width = this.el.nativeElement.offsetWidth - (this.margin * 2);
    this.updateChart(this.height + (this.margin * 2));
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = this.el.nativeElement.offsetWidth - (this.margin * 2);
    this.updateChart(this.height + (this.margin * 2));
  }
  private chartData: BarChartItem[] = [];
  private svg!: d3.Selection<SVGGElement, unknown, HTMLElement | null, undefined>;
  private margin = 50;
  private width: number;
  private height = 400 - (this.margin * 2);
  private _barColor = '#d04a35';

  constructor(private el: ElementRef<HTMLElement>) {
    this.width = this.el.nativeElement.offsetWidth - (this.margin * 2);
  }

  private createSvg(): void {
    this.svg = d3.select(this.el.nativeElement)
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', `translate(${this.margin}, ${this.margin})`);
  }

  private drawBars(data: BarChartItem[]): void {
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.name))
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .range([this.height, 0]);

    this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    this.svg.append('g')
      .call(d3.axisLeft(y));

    this.svg.selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', ((d: BarChartItem) => x(d.name) as number))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => this.height - y(d.value))
      .attr('fill', this._barColor);
  }

  private updateChart(height: number): void {
    if (this.svg) {
      this.el.nativeElement.innerHTML = '';
      this.setHeight(height);
    }
    this.createSvg();
    this.drawBars(this.chartData);
  }

  private setHeight(height: number): void {
    this.height = height - (this.margin * 2);
  }
}
