import React from "react";
import Label from "../atoms/Label";
import InputField from "../atoms/InputField";

type Props = {
  type: string;
  //   id: string;
  //   value: string;
  //   setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  labelText?: string;
  required?: boolean;
  bgColor: string;
  mb?: string;
  textColor?: string;
};

const InputWithLabel = ({
  type,
  //   id,
  //   value,
  //   setValue,
  labelText,
  placeholder,
  required,
  bgColor,
  mb,
  textColor
}: Props) => {
  return (
    <>
      <Label text={labelText} color={textColor}/>
      <InputField
        type={type}
        //   id={id}
        //   value={value}
        //   onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required={required}
        bgColor={bgColor}
        mb={mb}
      />
    </>
  );
};

export default InputWithLabel;
