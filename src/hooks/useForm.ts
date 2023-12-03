import { ChangeEvent, useState } from "react";
import { TInputValues } from "../utils/types";

const useForm = (inputValues: TInputValues<string>) => {
  const [values, setValues] = useState<TInputValues<string>>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}

export default useForm;
