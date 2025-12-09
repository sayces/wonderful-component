// src/components/ControlledInput.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';


// Импортируем наш компонент
import ControlledInput from './ControlledInput';

// Типы для формы (можно вынести отдельно, но для сторис хватит и так)
type FormValues = {
  email: string;
  password: string;
  phone: string;
  tg_nickname: string;
  search: string;
};

const meta: Meta<typeof ControlledInput> = {
  title: 'Components/ControlledInput',
  component: ControlledInput,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    // Оборачиваем каждую стори в FormProvider — обязательно для react-hook-form
    (Story, context) => {
      const methods = useForm<FormValues>({
        defaultValues: {
          email: '',
          password: '',
          phone: '',
          tg_nickname: '',
          search: '',
        },
      });

      // Для дебага можно выведем значения формы
      const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log('Form submitted:', data);
      };

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            <Story args={{ ...context.args, control: methods.control }} />
          </form>
        </FormProvider>
      );
    },
  ],
  argTypes: {
    name: { control: false }, // скрываем, потому что будет меняться в каждой стори
    control: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof ControlledInput<FormValues>>;

// Обычный email
export const Email: Story = {
  args: {
    name: 'email',
    label: 'Email',
    placeholder: 'example@mail.ru',
    type: 'email',
  },
};

// Пароль с переключением видимости
export const Password: Story = {
  args: {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    placeholder: '••••••••',
  },
};

// Телефон с маской
export const PhoneWithMask: Story = {
  args: {
    name: 'phone',
    label: 'Телефон',
    mask: '+7 (000) 000-00-00',
    placeholder: '+7 (999) 123-45-67',
  },
};

// Telegram ник — автоматически убирает пробелы
export const TelegramNickname: Story = {
  args: {
    name: 'tg_nickname',
    label: 'Telegram',
    placeholder: '@username',
  },
};

// Поиск
export const Search: Story = {
  args: {
    name: 'search',
    type: 'search',
    placeholder: 'Поиск...',
  },
};

// С ошибкой валидации (имитация)
export const WithError: Story = {
  decorators: [
    (Story) => {
      const methods = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: { email: 'неправильный-емейл' },
      });

      // Принудительно добавляем ошибку
      methods.setError('email', { type: 'manual', message: 'Неверный формат email' });

      return (
        <FormProvider {...methods}>
          <form>
            <Story args={{ name: 'email', control: methods.control }} />
          </form>
        </FormProvider>
      );
    },
  ],
  args: {
    name: 'email',
    label: 'Email с ошибкой',
    errorMessage: 'Неверный формат email', // можно передать вручную, если хочешь
  },
};

// Заблокированный
export const Disabled: Story = {
  args: {
    name: 'email',
    label: 'Заблокированный инпут',
    disabled: true,
    placeholder: 'Нельзя редактировать',
    value: 'locked@example.com',
  },
};