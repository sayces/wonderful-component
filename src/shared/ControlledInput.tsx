import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";
import Input from "./Input";
import { type InputProps } from "./Input";

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  "defaultValue" | "disabled" | "rules"
> &
  InputProps;

const ControlledInput = <T extends FieldValues>(props: Props<T>) => {
  const {
    control,
    shouldUnregister,
    mask,
    onChangeValue,
    disabled,
    name,
    ...rest
  } = props;

  const {
    field: { onChange, onBlur, value },
  } = useController({
    control,
    disabled,
    name,
    shouldUnregister,
  });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const rawValue = e.target.value ?? "";

    const cleaned = rawValue.replace(/\u00A0/g, " ").trim();

    const finalValue =
      name === "tg_nickname" ? cleaned.replace(/\s+/g, "") : cleaned;

    onChange(finalValue);

    onBlur();
  };

  const handleOnChangeValue = (val: string) => {
    onChange(val); // react-hook-form обновляет state
    onChangeValue?.(val); // пробрасываем дальше
  };

  return (
    <Input
      {...rest}
      value={value ?? ""}
      mask={mask}
      onChangeValue={handleOnChangeValue}
      onBlur={handleBlur}
    />
  );
};

export default ControlledInput;
