import { useState, useRef, FC, FormEvent } from "react";
import styles from "./profile-form.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../hooks/typedHooks";
import useForm from "../../hooks/useForm";
import { changeUserThunk } from "../../services/actions/auth";

const ProfileForm: FC = () => {
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);

  const currentName = (user && user.name) as string;
  const currentEmail = (user && user.email) as string;
  const currentPassword = "";

  const { values, handleChange, setValues } = useForm({
    name: currentName,
    email: currentEmail,
    password: currentPassword,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState(true);

  const onIconClick = () => {
    setDisabled(false);
    if (inputRef.current !== document.activeElement) {
      setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
    }
  };

  const handleCancel = () => {
    setValues({
      ...values,
      name: currentName,
      email: currentEmail,
      password: currentPassword,
    });
    setIsChanged(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsChanged(false);
    await dispatch(changeUserThunk({ ...values }));
    setValues({
      ...values,
      password: currentPassword,
    });
  };

  return (
    <form className={styles.container} action="profile" onSubmit={handleSubmit}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        name={"name"}
        value={values.name}
        onChange={(e) => {
          handleChange(e);
          setIsChanged(true);
        }}
        ref={inputRef}
        disabled={disabled}
        onIconClick={onIconClick}
        icon="EditIcon"
      />
      <EmailInput
        placeholder="Логин"
        name={"email"}
        value={values.email}
        onChange={(e) => {
          handleChange(e);
          setIsChanged(true);
        }}
        isIcon={true}
        extraClass="mt-6"
      />
      <PasswordInput
        placeholder="Пароль"
        name={"password"}
        value={values.password}
        onChange={(e) => {
          handleChange(e);
          setIsChanged(true);
        }}
        icon="EditIcon"
        extraClass="mt-6"
      />
      {isChanged && (
        <div className={`${styles.wrapper} mt-6`}>
          <Button htmlType="button" type="secondary" onClick={handleCancel}>
            Отмена
          </Button>
          <Button htmlType="submit">Сохранить</Button>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
