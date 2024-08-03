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
      name: 'Chart Data',
      description: 'List of Chart Items',
      type: 'string',
      defaultValue: [],
      control: {
        type: 'object'
      }
    },
    chartHeight: {
      name: 'Chart Height',
      description: 'Height of the chart container',
      type: 'number',
      defaultValue: 400,
      control: { type: 'range', min: 1, max: 600, step: 10 }
    },
    barColor: {
      name: 'Bar Color',
      description: 'Color of the Bar',
      type: 'string',
      defaultValue: 40,
      control: { type: 'color', presetColors: ['red', 'green', 'blue', 'yellow', 'orange'] }
    },
    chartMargin:  {
      name: 'Chart Margin',
      description: 'Margin for the chart container',
      type: 'number',
      defaultValue: 50,
      control: { type: 'range', min: 5, max: 100, step: 5 }
    },
  }
};
export default meta;
type Story = StoryObj<BarchartComponent>;

export const Primary: Story = {
  args: {
    data: [
      { name: 'GameOfLife', value: 30 },
      { name: 'DataStructures', value: 20 },
      { name: 'LinkedIn CLone', value: 50 },
      { name: 'Frontend', value: 5 },
      { name: 'BAckend', value: 15 },
    ],
    chartHeight: 400,
    chartMargin: 50
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    //expect(canvas.getByText(/barchart works!/gi)).toBeTruthy();
  },
};
