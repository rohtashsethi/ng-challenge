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
  /**
   * Set the data which needs to be plotted in the Bar Chart
   * 
   * @memberof BarchartComponent
   * 
   * @example To display the current user of web browsers in billions
   * [
   *    { name: 'Chrome', value: 60 },
   *    { name: 'Firefox', value: 20 },
   *    { name: 'Safari', value: 20 },
   *    { name: 'Edge', value: 10 },
   * ]
   */
  @Input() set data(data: BarChartItem[]) {
    this.chartData = data;
    this.updateChart(this.height ? this.height + (this.margin * 2) : 400);
  };

  /**
   * Sets the Height of the chart including the margins
   * 
   * @example 
   * If the height is passed as 500, then the net height of the 
   * Bar Chart after excluding the top & bottom margins will be
   *  500 - (50 * 2) = 400
   *
   * @memberof BarchartComponent
   */
  @Input() set chartHeight(height: number) {
    this.updateChart(height);
  }


  /**
   * Sets the color of the bars
   * 
   * @example red, blue, #000000
   *
   * @memberof BarchartComponent
   */
  @Input() set barColor(color: string) {
    this._barColor = color;
    this.updateChart(this.height + (this.margin * 2));
  }

  /**
   * Rerenders the Bar Chart the Window is resized
   *
   * @memberof BarchartComponent
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateChart(this.height + (this.margin * 2));
  }
  
  private chartData: BarChartItem[] = [];
  private svg!: d3.Selection<SVGGElement, unknown, HTMLElement | null, undefined>;
  private margin = 50;
  private width!: number;
  private height = 400 - (this.margin * 2);
  private _barColor = '#d04a35';

  constructor(private el: ElementRef<HTMLElement>) {}

  /**
   * Creates the SVGElement inside which the chart will be rendered.
   *
   * @private
   * @memberof BarchartComponent
   */
  private createSvg(): void {
    this.svg = d3.select(this.el.nativeElement)
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', `translate(${this.margin}, ${this.margin})`);
  }

  /**
   * Draws the Chart axis (x & y) & the Bars.
   *
   * @private
   * @param {BarChartItem[]} data - The data which needs to be plotted in the Bar Chart
   * @memberof BarchartComponent
   * 
   * @example To display the current user of web browsers in billions
   * [
   *    { name: 'Chrome', value: 60 },
   *    { name: 'Firefox', value: 20 },
   *    { name: 'Safari', value: 20 },
   *    { name: 'Edge', value: 10 },
   * ]
   */
  private drawBars(data: BarChartItem[]): void {
    // Creates the band scale for x-axis
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.name))
      .padding(0.2);

    // Creates the continuous scale for y-axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .range([this.height, 0]);

    this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('class', 'translate-x-0 -rotate-45 lg:translate-x-5 lg:rotate-0 text-[8px] lg:text-x-[10px]')
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

  /**
   * Renders the initial Bar Chart & re-renders on updates.
   *
   * @private
   * @param {number} height - Height of the Bar Chart including the margins
   * @memberof BarchartComponent
   */
  private updateChart(height: number): void {
    if (this.svg) {
      this.el.nativeElement.innerHTML = '';
      this.setHeight(height);
    }
    this.width = this.el.nativeElement.offsetWidth - (this.margin * 2);
    this.createSvg();
    this.drawBars(this.chartData);
  }

  /**
   * Sets the net height of the Bar Chart excluding the margins.
   *
   * @private
   * @param {number} height - Height of the Bar Chart including the margins
   * @memberof BarchartComponent
   */
  private setHeight(height: number): void {
    this.height = height - (this.margin * 2);
  }
}
