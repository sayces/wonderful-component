import { nameSchema, lastNameSchema, phoneNumberSchema, emailSchema, termsSchema, telegramUsernameSchema }from "../lib/validation/schema";
import Button from "./Button";
import ControlledInput from "./ControlledInput";
// import { Modal } from "@/shared/ui/modal";
import Typography from "./Typography";
import clsx from "clsx";
// import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useAppDispatch } from "@/shared/store";
// import { openModal } from "@/shared/model/modal/ModalSlice";
// import { useRegisterCourierMutation } from "../../api";
// import { Loader } from "@/shared";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const signUpSchema = z.object({
  first_name: nameSchema,
  last_name: lastNameSchema,
  phone: phoneNumberSchema,
  email: emailSchema,
  tg_nickname: telegramUsernameSchema,
  agreementUser: termsSchema,
  agreementUseApp: termsSchema,
  agreement: termsSchema,
  agreementDocs: termsSchema,
  agreementGeo: termsSchema,
});

type FormTypes = z.infer<typeof signUpSchema>;

const SignUpForm = ({ open, onOpenChange }: Props) => {
  // const dispatch = useAppDispatch();

  // const [registerCourier, { isLoading }] = useRegisterCourierMutation();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid, isSubmitting, dirtyFields },
  } = useForm<FormTypes>({
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      tg_nickname: "",
      agreementUser: false,
      agreementUseApp: false,
      agreement: false,
      agreementDocs: false,
      agreementGeo: false,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all", // отслеживаем все ошибки
    resolver: zodResolver(signUpSchema),
  });

  const flexCol = "flex flex-col";

  const classNames = {
    form: clsx(
      flexCol,
      "gap-[35px] md:w-[500px] sm_max:w-[355px] sm:w-[305px]"
    ),
    inputBlock: clsx(flexCol, "gap-[15px]"),
    link: "text-orange-fd",
    checkboxAndbuttonsBlock: clsx(flexCol, "gap-[15px]"),
    buttonBlock: clsx(flexCol, "gap-[15px]"),
  };

  // const onSubmit = async (data: FormTypes) => {
  //   try {
  //     const { first_name, last_name, phone, email, tg_nickname } = data;

  //     const dataToSend = {
  //       first_name,
  //       last_name,
  //       phone: phone.replace(/[^\d+]/g, ""),
  //       email,
  //       tg_nickname,
  //     };

  //     await registerCourier(dataToSend).unwrap();
  //     dispatch(openModal("successRegister"));
  //   } catch (err: unknown) {
  //     const error = err as FetchBaseQueryError & {
  //       data?: Record<string, string[]>;
  //     };
  //     if (error?.status === 400 && error?.data) {
  //       const apiErrors = error.data;

  //       Object.entries(apiErrors).forEach(([field, messages]) => {
  //         if (Array.isArray(messages)) {
  //           setError(field as keyof FormTypes, {
  //             type: "server",
  //             message: messages[0],
  //           });
  //         }
  //       });
  //     } else {
  //       console.error("Неизвестная ошибка:", error);
  //     }
  //   }
  // };

  // const handleOpenLoginForm = () => {
  //   dispatch(openModal("signIn"));
  // };

  // функция для показа ошибки только если поле dirty
  const getError = (field: keyof FormTypes) =>
    dirtyFields[field] ? errors[field]?.message : undefined;

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Регистрация">
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)} className={classNames.form}>
        <div className={classNames.inputBlock}>
          <ControlledInput
            control={control}
            name="first_name"
            type="text"
            label="Имя*"
            placeholder="Имя"
            errorMessage={getError("first_name")}
            fullWidth
          />
          <ControlledInput
            control={control}
            name="last_name"
            type="text"
            label="Фамилия*"
            placeholder="Фамилия"
            errorMessage={getError("last_name")}
            fullWidth
          />
          <ControlledInput
            control={control}
            name="email"
            type="email"
            label="Электронная почта*"
            placeholder="Example@mail.ru"
            errorMessage={getError("email")}
            fullWidth
          />
          <ControlledInput
            control={control}
            fullWidth
            name="phone"
            type="phone"
            mask="+7 (000) 000-00-00"
            placeholder="Телефон"
            label="Телефон*"
            errorMessage={getError("phone")}
          />
          <ControlledInput
            control={control}
            name="tg_nickname"
            type="text"
            label="Никнейм Телеграм*"
            placeholder="@example"
            errorMessage={getError("tg_nickname")}
            fullWidth
          />
        </div>
        <div className={classNames.checkboxAndbuttonsBlock}>
          <ControlledCheckbox
            control={control}
            label={
              <Typography size="xs">
                Сoгласен c{" "}
                <Link
                  href="/rules/user-agreement"
                  target="blank"
                  className={classNames.link}
                >
                  Пользовательским соглашением
                </Link>
              </Typography>
            }
            name="agreementUser"
          />

          <ControlledCheckbox
            control={control}
            label={
              <Typography size="xs">
                Сoгласен c{" "}
                <Link
                  href="/rules/using-application"
                  target="blank"
                  className={classNames.link}
                >
                  Правилами использования продукта
                </Link>
              </Typography>
            }
            name="agreementUseApp"
          />

          <ControlledCheckbox
            control={control}
            label={
              <Typography size="xs">
                Сoгласен c{" "}
                <Link
                  href="/rules/personal-data-policy"
                  target="blank"
                  className={classNames.link}
                >
                  Политикой обработки данных
                </Link>
              </Typography>
            }
            name="agreement"
          />
          <ControlledCheckbox
            control={control}
            label={
              <Typography size="xs">
                Сoгласен c{" "}
                <Link
                  href="/rules/courier-contract"
                  target="blank"
                  className={classNames.link}
                >
                  Договором
                </Link>
              </Typography>
            }
            name="agreementDocs"
          />
          <ControlledCheckbox
            control={control}
            label={
              <Typography size="xs">
                Сoгласен на{" "}
                <Link
                  href="/rules/location-data"
                  target="blank"
                  className={classNames.link}
                >
                  Обработку данных геопозиции
                </Link>
              </Typography>
            }
            name="agreementGeo"
          />
        </div>
        <div className={classNames.checkboxAndbuttonsBlock}>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={!isValid || isSubmitting}
          >
            Зарегистрироваться
          </Button>
          <Button
            type="button"
            variant="empty"
            fullWidth
            onClick={handleOpenLoginForm}
          >
            Вход
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SignUpForm;
