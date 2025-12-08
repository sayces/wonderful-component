// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';   // ← только этот

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', /* остальные */],
  framework: { name: '@storybook/react-vite', options: {} },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [tailwindcss()],           // ← только эта строка
      // НЕТ НИКАКИХ css.postcss или require('tailwindcss')
    });
  },
};

export default config;