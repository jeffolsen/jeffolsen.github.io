import type { Meta, StoryObj } from '@storybook/angular';

import { CodeBlock } from './code-block';

const meta: Meta<CodeBlock> = {
  title: 'Shared/Components/CodeBlock',
  component: CodeBlock,
};

export default meta;
type Story = StoryObj<CodeBlock>;

export const Default: Story = {
  args: {
    label: 'Response',
    data: {
      id: 1,
      title: 'Example payload',
      tags: ['sample', 'raw-data'],
      nested: { ok: true },
    },
  },
};

export const NoLabel: Story = {
  args: {
    data: { hello: 'world' },
  },
};
