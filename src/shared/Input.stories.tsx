import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Input, { type InputProps } from './Input'; // Предполагаю, что Input в той же папке
import * as Icons from '../assets'; // Твои иконки

// Мета: базовая конфигурация для всех сторис
const meta: Meta<typeof Input> = {
  title: 'Components/Input', // Название в сайдбаре Storybook
  component: Input,
  parameters: {
    layout: 'centered', // Центрируем для удобства
    docs: {
      description: {
        component: 'Универсальный инпут с поддержкой ошибок, масок, пароля и поиска.',
      },
    },
  },
  argTypes: {
    // Контролы для интерактивного редактирования в Storybook
    value: { control: 'text' },
    errorMessage: { control: 'text' },
    label: { control: 'text' },
    type: { control: 'select', options: ['text', 'password', 'search', 'email'] },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    mask: { control: 'text' }, // Например, '0000-0000' для маски
    extraButtonIcon: { control: false }, // Не редактируем, но можно задать в сторис
  },
};

export default meta;

// Тип для сторис
type Story = StoryObj<typeof Input>;

// Default: базовый инпут
export const Default: Story = {
  args: {
    placeholder: 'Введите текст...',
    label: 'Лейбл',
  },
};

// С ошибкой
export const WithError: Story = {
  args: {
    placeholder: 'С ошибкой',
    errorMessage: 'Это обязательное поле!',
    label: 'Email',
    type: 'email',
  },
};

// Полная ширина
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: 'Занимает всю ширину',
    label: 'Полное имя',
  },
};

// Для пароля
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Пароль',
    label: 'Введите пароль',
  },
};

// Для поиска
export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Поиск...',
  },
};

// С маской (пример для телефона)
export const WithMask: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Input {...args} value={value} onChangeValue={setValue} />;
  },
  args: {
    mask: '+7 (000) 000-00-00', // Маска для телефона (IMask поддерживает)
    placeholder: 'Номер телефона',
    label: 'Телефон',
  },
};

// С экстра-кнопкой (пример с иконкой)
export const WithExtraButton: Story = {
  args: {
    placeholder: 'С кнопкой',
    extraButtonIcon: <Icons.Search />, // Предполагаю, что у тебя есть такая иконка
    onExtraButtonClick: () => alert('Кнопка нажата!'),
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Заблокировано',
    label: 'Заблокированный инпут',
  },
};