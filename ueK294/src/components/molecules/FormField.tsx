import React from "react";
import { Field } from "formik";
import Label from "../atoms/Label";
import ErrorText from "../atoms/ErrorText";

type FormFieldProps = {
  name: string;
  label: string;
  type?: string;
  step?: string;
  error?: string;
  touched?: boolean;
};

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = "text",
  step,
  error,
  touched,
}) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Label htmlFor={name}>{label}</Label>
      <Field name={name} type={type} step={step} />
      {error && touched && <ErrorText>{error}</ErrorText>}
    </div>
  );
};

export default FormField;
