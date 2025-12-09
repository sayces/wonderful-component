import clsx from 'clsx';
import { type ComponentPropsWithRef, type ReactNode } from 'react';

type Button = {
  as?: 'button' | 'a';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'empty' | 'usermenu' | 'filter';
  fullWidth?: boolean;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  hasArrowRotation?: boolean;
} & ComponentPropsWithRef<'button'> &
  ComponentPropsWithRef<'a'>;

const Button = ({
  as = 'button',
  href,
  children,
  disabled,
  type = 'button',
  onClick,
  className,
  variant = 'primary',
  fullWidth = false,
  size = 'md',
  isLoading,
  leftIcon,
  rightIcon,
  hasArrowRotation = false, // для переворота стрелки (rightIcon)
  ...rest
}: Button) => {
  const baseButtonStyles =
    'py-[10px] px-[15px] h-[54px] text-[20px] leading-[18px] font-medium rounded-[30px] border-2 cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-fd';

  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-5 text-base',
    lg: 'py-4 px-6 text-lg',
  };

  const secondaryBase = 'border-orange-fd text-orange-fd bg-white-ff'; // общие стили от secondary

  const variants = {
    primary: clsx(
      'bg-orange-fd text-white-ff border-transparent hover:bg-white-ff hover:text-orange-fd hover:border-orange-fd active:border-dark-orange active:text-dark-orange ',
      'disabled:bg-orange-disabled disabled:cursor-not-allowed'
    ),
    secondary: clsx(
      secondaryBase,
      'hover:bg-orange-fd hover:text-white-ff active:border-dark-orange active:bg-dark-orange',
      'disabled:text-orange-disabled disabled:border-orange-disabled disabled:cursor-not-allowed'
    ),
    empty: clsx(
      'bg-transparent border-transparent text-black-26 hover:border-orange-fd active:border-dark-orange disabled:hover:border-transparent',
      'disabled:text-gray-9b disabled:border-gray-9b disabled:cursor-not-allowed'
    ),
    usermenu: clsx(secondaryBase, 'disabled:bg-white-ff disabled:border-dark-orange disabled:text-dark-orange'),
    filter: 'py-[0] px-[16px] text-gray-9b text-[16px] rounded-[10px] border-[1px] h-[39px] cursor-pointer',
  };

  const rotate180 = hasArrowRotation
    ? clsx('transition-transform duration-300', 'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-180')
    : '';

  const a = as === 'a' && clsx('text-center items-center pt-[15px]');

  const fullWidthClass = fullWidth ? 'w-full' : '';

  const hasIcons = leftIcon || rightIcon;

  const iconLayout = hasIcons ? 'flex items-center justify-between gap-2.5' : '';

  const classNames =
    variant === 'filter'
      ? clsx(variants[variant], className)
      : clsx(baseButtonStyles, variants[variant], sizes[size], fullWidthClass, iconLayout, a, className);

  return (
    <>
      {as === 'a' ? (
        <a href={href} className={classNames} {...rest}>
          {children}
        </a>
      ) : (
        <button disabled={disabled || isLoading} type={type} onClick={onClick} className={classNames} {...rest}>
          {leftIcon && <span className="flex items-center -translate-y-px">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className={clsx('flex items-center -translate-y-px', rotate180)}>{rightIcon}</span>}
        </button>
      )}
    </>
  );
};

export default Button;
