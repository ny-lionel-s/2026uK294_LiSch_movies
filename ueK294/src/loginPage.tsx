import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Components/Atoms/Button";
import ErrorText from "./Components/Atoms/ErrorText";
import FormField from "./Components/Molecules/FormField";
import PageLayout from "./Components/Organisms/PageLayout";
import { login } from "./AuthenticationService";
import type { AuthData } from "./AuthenticationService";

const initialValues: AuthData = {
  email: "",
  password: "",
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Fehler beim Login";
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: AuthData) => {
    try {
      setError(null);
      await login(values);
      navigate("/movies");
    } catch (loginError) {
      setError(getErrorMessage(loginError));
    }
  };

  const validate = (values: AuthData) => {
    const errors: Partial<Record<keyof AuthData, string>> = {};

    if (!values.email) {
      errors.email = "E-Mail erforderlich";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Ungültige E-Mail";
    }

    if (!values.password) {
      errors.password = "Passwort erforderlich";
    } else if (values.password.length < 4) {
      errors.password = "Passwort mindestens 4 Zeichen";
    }

    return errors;
  };

  return (
    <PageLayout maxWidth="420px">
      <h2>Login</h2>
      {error && (
        <div style={{ marginBottom: "12px" }}>
          <ErrorText>{error}</ErrorText>
        </div>
      )}

      <Formik<AuthData>
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ errors, isSubmitting, touched }) => (
          <Form style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <FormField
              autoComplete="email"
              error={errors.email}
              label="E-Mail"
              name="email"
              touched={touched.email}
              type="email"
            />
            <FormField
              autoComplete="current-password"
              error={errors.password}
              label="Passwort"
              name="password"
              touched={touched.password}
              type="password"
            />

            <Button style={{ alignSelf: "flex-start" }} type="submit">
              {isSubmitting ? "Logge ein..." : "Login"}
            </Button>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
};

export default LoginPage;
