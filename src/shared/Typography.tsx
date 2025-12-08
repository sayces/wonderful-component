import clsx from 'clsx';
import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react';

type Props<T extends ElementType = 'p'> = {
  as?: T;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'bigest' | 'largest';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  align?: 'left' | 'center' | 'right';
  color?: 'black' | 'white' | 'orange' | 'red' | 'gray' | 'darkGray' | 'green';
  children: ReactNode;
  className?: string;
};

type TypographyProps<T extends ElementType> = Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>;

const Typography = <T extends ElementType = 'p'>(props: TypographyProps<T>) => {
  const {
    as,
    size = 'md',
    weight = 'normal',
    align = 'left',
    color = 'black',
    children,
    className,
    ref,
    ...rest
  } = props;
  const Tag = as ?? 'p';

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    xxl: 'text-2xl',
    xxxl: 'text-3xl',
    bigest: 'text-[32px]',
    largest: 'text-[40px]',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-black',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const colorClasses = {
    black: 'text-black-26',
    white: 'text-white',
    orange: 'text-orange-fd',
    red: 'text-accent-e0',
    gray: 'text-gray-9b',
    darkGray: 'text-dark-gray-4f',
    green: 'text-green-12',
  };
  return (
    <Tag
      ref={ref}
      className={clsx(sizeClasses[size], weightClasses[weight], alignClasses[align], colorClasses[color], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Typography;
