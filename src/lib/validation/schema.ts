import { z } from 'zod';

// VALIDATION PATTERNS

export const nameAndLastNameValidationPattern = /^([а-яёa-z]+)[ ]*(?:[ -]([а-яёa-z]+)[ ]*){0,2}$/i;
export const emailValidationPattern = /^[a-z0-9._-]+@[a-z.]+\.[a-z]{2,}$/i;
export const passwordValidationPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;
export const phoneNumberValidationPattern = /^\+7[ ]\([0-9]{3}\)[ ][0-9]{3}\-[0-9]{2}\-[0-9]{2}$/;

// MESSAGES

export const REQUIRED_FIELD_MESSAGE = 'Обязательное поле';
export const REQUIRED_TERMS_MESSAGE = 'Необходимо принять условия';
export const INCORRECT_PASSWORD_MESSAGE = 'Неправильное имя пользователя или пароль';
export const NOT_REGISTERED_USER_MESSAGE = 'Такой пользователь не зарегестрирован';

// VALIDATION SCHEMAS

export const nameSchema = z
  .string()
  .min(2, 'Имя должно содержать минимум 2 символа')
  .max(40, 'Имя может содержать не более 40 символов')
  .regex(nameAndLastNameValidationPattern, 'Неверный формат имени')
  .nonempty(REQUIRED_FIELD_MESSAGE);

export const lastNameSchema = z
  .string()
  .min(2, 'Фамилия должна содержать минимум 2 символа')
  .max(40, 'Фамилия может содержать не более 40 символов')
  .regex(nameAndLastNameValidationPattern, 'Неверный формат фамилии')
  .nonempty(REQUIRED_FIELD_MESSAGE);

export const emailSchema = z
  .string()
  .min(4, 'Email должен быть не менее 4 символов')
  .max(64, 'Email может содержать не более 64 символов')
  .regex(emailValidationPattern, 'Неверный формат электронной почты')
  .nonempty(REQUIRED_FIELD_MESSAGE);

export const passwordSchema = z
  .string()
  .min(8, 'Пароль должен быть не менее 8 символов')
  .max(40, 'Пароль должен быть не более 40 символов')
  .regex(
    passwordValidationPattern,
    'Пароль должен содержать хотя бы одну заглавную, прописную букву латинского алфавита и цифру'
  )
  .nonempty(REQUIRED_FIELD_MESSAGE);

export const confirmPasswordSchema = passwordSchema;

export const phoneNumberSchema = z
  .string()
  .trim()
  .min(1, REQUIRED_FIELD_MESSAGE)
  .refine(
    (value) => value.replace(/\D/g, '').length === 11,
    'Неверный формат. Введите телефон в формате: +7 (XXX) XXX-XX-XX'
  );

// export const termsSchema = z.literal<boolean>(true, {
//   errorMap: () => ({ message: REQUIRED_TERMS_MESSAGE }),
// });

export const telegramUsernameSchema = z
  .string()
  .min(2, 'Никнейм должен содержать минимум 2 символа')
  .max(40, 'Никнейм может содержать не более 40 символов')
  .regex(/^@?[a-zA-Z0-9_]+$/, {
    message: 'Допустимы только латинские буквы, цифры и нижнее подчёркивание, может начинаться с @',
  })
  .transform((val) => (val.startsWith('@') ? val : `@${val}`));

// Базовые схемы валидации причины отмены
export const reasonSchema = z.string().nonempty('Пожалуйста, выберите причину отмены');

export const customReasonSchema = z.string().optional();

// тип для superRefine, от базовой схемы, а не итоговой
export type CancelOrderBaseData = {
  reason: string;
  customReason?: string | null;
};

// Логика проверки customReason если выбрано 'Другое''
export const validateCustomReason = (data: CancelOrderBaseData, ctx: z.RefinementCtx) => {
  if (data.reason !== 'Другое') return;

  const customReasonValue = data.customReason?.trim() ?? '';

  if (!customReasonValue) {
    ctx.addIssue({
      path: ['customReason'],
      message: REQUIRED_FIELD_MESSAGE,
      code: z.ZodIssueCode.custom,
    });
    return;
  }

  if (customReasonValue.length < 10) {
    ctx.addIssue({
      path: ['customReason'],
      message: 'Причина должна быть не менее 10 символов',
      code: z.ZodIssueCode.custom,
    });
  }

  if (customReasonValue.length > 128) {
    ctx.addIssue({
      path: ['customReason'],
      message: 'Причина должна быть не более 128 символов',
      code: z.ZodIssueCode.custom,
    });
  }
};
