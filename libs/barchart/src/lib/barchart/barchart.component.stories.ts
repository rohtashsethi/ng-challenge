import type { Meta, StoryObj } from '@storybook/angular';
import { BarchartComponent } from './barchart.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<BarchartComponent> = {
  component: BarchartComponent,
  title: 'Charts/Bar Chart',
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'List of Chart Items',
      type: 'string',
      defaultValue: [],
      control: {
        type: 'object'
      }
    },
    chartHeight: {
      description: 'Height of the chart container',
      type: 'number',
      defaultValue: 400,
      control: { type: 'range', min: 1, max: 600, step: 10 }
    },
    barColor: {
      description: 'Color of the Bar',
      type: 'string',
      defaultValue: 40,
      control: { type: 'color', presetColors: ['red', 'green', 'blue', 'yellow', 'orange'] }
    },
  }
};
export default meta;
type Story = StoryObj<BarchartComponent>;

export const Default: Story = {
  args: {
    data: [
      { name: 'Chrome', value: 60 },
      { name: 'Firefox', value: 20 },
      { name: 'Safari', value: 20 },
      { name: 'Edge', value: 10 },
    ],
    chartHeight: 400,
    barColor: '#d04a35',
  },
  play: async ({canvasElement}) => {
    const canvas = canvasElement as HTMLDivElement;
    // Check that the chart is rendered correctly
    const svg = canvas.querySelector('svg');
    expect(svg).toBeTruthy();

    if (!svg) {
      throw new Error('SVG element not found');
    }
    
    // Verify the number of bars
    const bars = svg.querySelectorAll('rect');
    expect(bars.length).toBe(4);

    if (bars.length !== 4) {
      throw new Error(`Expected 4 bars, but found ${bars.length}`);
    }

    // Verify the bar color
    bars.forEach(bar => {
      const barColor = bar.getAttribute('fill');
      expect(barColor).toBe('#d04a35');

      if (bar.getAttribute('fill') !== '#d04a35') {
        throw new Error(`Expected bar color #d04a35, but found ${bar.getAttribute('fill')}`);
      }
    });
  },
};

