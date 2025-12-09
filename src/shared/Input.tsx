import {
  type ChangeEvent,
  type ComponentPropsWithRef,
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Typography from "./Typography";
import clsx from "clsx";
import * as Icons from "../assets";
import Button from "./Button";
import IMask from "imask";

export interface InputProps extends ComponentPropsWithRef<"input"> {
  value?: string;
  errorMessage?: string | null;
  label?: string;
  fullWidth?: boolean;
  onChangeValue?: (value: string) => void;
  onKeyEnter?: () => void;
  onExtraButtonClick?: () => void;
  mask?: string;
  extraButtonIcon?: React.ReactNode;
}

const Input = ({
  label,
  errorMessage,
  id,
  type,
  placeholder,
  disabled,
  value,
  className,
  fullWidth,
  onChangeValue,
  onKeyEnter,
  onKeyDown,
  onChange,
  onExtraButtonClick,
  mask,
  extraButtonIcon,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSearchType = type === "search";
  const isPasswordType = type === "password";

  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  const generatedId = useId();
  const finalId = id ?? generatedId;

  const onExtraButtonClickHandler = () => {
    onExtraButtonClick?.();
  };

  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (isPasswordType && newValue === "") {
      setShowPassword(false);
    }

    if (onChange) onChange?.(e); // уведомляем react-hook-form
    onChangeValue?.(newValue); // пробрасываем наружу
  };

  const handleInputOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onKeyEnter?.();
    }
    onKeyDown?.(e);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const fullWidthClass = fullWidth ? "w-full" : "w-auto";

  const baseInputStyles =
    "peer block px-[20px] py-[26px] max-sm_plus:px-[15px] max-sm_plus:py-[15px] leading-[140%] h-auto text-xl bg-white rounded-[10px] border focus:ring-0 mx-auto placeholder-shown:text-gray-9b placeholder-shown:border-black-26 border-black-26 disabled:border-dark-gray-4f";
  const baseLabelStyles =
    "absolute text-xl max-sm_plus:text-[14px] duration-200 transform -translate-y-3 peer-focus:scale-75 scale-75 top-0 origin-[0] bg-white px-1 peer-placeholder-shown:top-1/2 peer-focus:top-[0] start-4 rounded-[5px] peer-placeholder-shown:scale-90 cursor-text";
  const variantStyles = {
    focus: "focus:outline-orange-fd",
    error:
      "peer-focus:border-accent-e0 focus:border-accent-e0 border-accent-e0!",
  };

  const finalClassesMix = clsx(
    errorMessage && variantStyles.error,
    variantStyles.focus
  );

  const classNames = {
    container: clsx("relative", fullWidthClass),
    input: clsx(
      baseInputStyles,
      finalClassesMix,
      fullWidthClass,
      className && className
    ),
    label: clsx(
      baseLabelStyles,
      errorMessage
        ? "peer-focus:text-accent-e0 peer-not-placeholder-shown:text-accent-e0 peer-placeholder-shown:text-gray-400"
        : "text-black-26 peer-placeholder-shown:text-gray-400 peer-focus:text-orange-fd"
    ),
    search: clsx(
      finalClassesMix,
      `absolute bg-orange-fd px-5.5! py-1.5! rounded-[10px]! right-2 top-1/2 transform -translate-y-1/2`
    ),
    password: clsx(
      finalClassesMix,
      `absolute p-1! border-none right-2 top-1/2 transform -translate-y-1/2`
    ),
    extraButton: clsx(
      finalClassesMix,
      `absolute bg-white-ff p-[5px] border-none right-[10px] top-1/2 transform -translate-y-1/2`
    ),
    errorMessage: clsx(`pl-[10px] pt-[5px]`),
  };

  useEffect(() => {
    if (!mask || !inputRef.current) return;

    const maskInstance = IMask(inputRef.current, {
      mask,
      lazy: true,
    });

    maskInstance.on("accept", () => {
      onChangeValue?.(maskInstance.value);
    });

    return () => maskInstance.destroy();
  }, [mask, onChangeValue]);

  return (
    <div className={classNames.container}>
      <div className={"relative"}>
        {isSearchType && (
          <Button
            variant="primary"
            className={classNames.search}
            disabled={disabled}
            type="button"
          >
            <Icons.Search />
          </Button>
        )}

        <input
          autoComplete="off"
          id={finalId}
          type={inputType}
          ref={inputRef}
          placeholder={(!label && placeholder) || ""}
          value={value}
          className={classNames.input}
          disabled={disabled}
          onChange={mask ? () => {} : handleInputOnChange}
          onKeyDown={handleInputOnKeyDown}
          {...rest}
        />
        {label && (
          <Typography
            htmlFor={finalId}
            as="label"
            size="md"
            className={classNames.label}
          >
            {label}
          </Typography>
        )}

        {isPasswordType && (
          <Button
            variant="empty"
            className={classNames.password}
            disabled={disabled}
            type="button"
            onClick={handleTogglePasswordVisibility}
          >
            {showPassword ? <Icons.Eye /> : <Icons.EyeClosed />}
          </Button>
        )}

        {extraButtonIcon && (
          <Button
            variant="empty"
            className={classNames.extraButton}
            disabled={disabled}
            type="button"
            onClick={onExtraButtonClickHandler}
          >
            {extraButtonIcon}
          </Button>
        )}
      </div>

      {errorMessage && (
        <Typography
          color="red"
          size="sm"
          weight="normal"
          as="p"
          className={classNames.errorMessage}
        >
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export default Input;
