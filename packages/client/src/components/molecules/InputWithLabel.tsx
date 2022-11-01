import React from "react";
import Label from "../atoms/Label";
import InputField from "../atoms/InputField";

type Props = {
  type: string;
  id: string;
  value: string | null;
  setValue:
    | (React.Dispatch<React.SetStateAction<string>> | ((e: string) => void))
    | null;
  placeholder?: string;
  labelText?: string;
  required?: boolean;
  bgColor: string;
  mb?: string;
  textColor?: string;
};

const InputWithLabel = ({
  type,
  id,
  value,
  setValue,
  labelText,
  placeholder,
  required,
  bgColor,
  mb,
  textColor,
}: Props) => {
  return (
    <>
      <Label id={id} text={labelText} color={textColor} required={required} />
      <InputField
        type={type}
        id={id}
        value={value}
        setValue={setValue}
        placeholder={placeholder}
        required={required}
        bgColor={bgColor}
        mb={mb}
        color={textColor}
      />
    </>
  );
};

export default InputWithLabel;
