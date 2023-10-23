import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./profile-form.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useForm from "../../hooks/useForm";
import { changeUser } from "../../services/actions/auth";

const ProfileForm = () => {
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);

  const currentName = user.name;
  const currentEmail = user.email;
  const currentPassword = "";

  const { values, handleChange, setValues } = useForm({
    name: currentName,
    email: currentEmail,
    password: currentPassword,
  });

  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(true);

  const onIconClick = () => {
    setDisabled(false);
    if (inputRef.current !== document.activeElement) {
      setTimeout(() => inputRef.current.focus(), 0)
    } 
  }

  const handleCancel = () => {
    setValues({
      ...values,
      name: currentName,
      email: currentEmail,
      password: currentPassword,
    });
    setIsChanged(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsChanged(false);
    dispatch(changeUser({ ...values }));
    setValues({
      ...values,
      password: currentPassword,
    });
  }

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
