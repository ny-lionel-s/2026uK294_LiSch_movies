import React from "react";
import { Field } from "formik";
import ErrorText from "../Atoms/ErrorText";
import Input from "../Atoms/Input";
import Label from "../Atoms/Label";

type FormFieldProps = {
  autoComplete?: string;
  error?: string;
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  step?: string;
  touched?: boolean;
};

const FormField: React.FC<FormFieldProps> = ({
  autoComplete,
  error,
  name,
  label,
  placeholder,
  type = "text",
  step,
  touched,
}) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Label htmlFor={name}>{label}</Label>
      <Field
        as={Input}
        autoComplete={autoComplete}
        id={name}
        name={name}
        placeholder={placeholder}
        step={step}
        type={type}
      />
      {error && touched && <ErrorText>{error}</ErrorText>}
    </div>
  );
};

export default FormField;
