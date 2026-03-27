import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { login } from "./authenticationService";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  
  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setError(null);
      await login(values);
      navigate("/movies"); 
    } catch (err: any) {
      setError(err.message || "Fehler beim Login");
    }
  };

  
  const validate = (values: { email: string; password: string }) => {
    const errors: { email?: string; password?: string } = {};

    if (!values.email) {
      errors.email = "E-Mail erforderlich";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Ungültige E-Mail";
    }

    if (!values.password) {
      errors.password = "Passwort erforderlich";
    } else if (values.password.length < 6) {
      errors.password = "Passwort mindestens 6 Zeichen";
    }

    return errors;
  };

  return (
    <div className="login-page" style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      <Formik
        initialValues={{ email: "", password: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div style={{ marginBottom: "10px" }}>
              <label htmlFor="email">E-Mail</label>
              <Field name="email" type="email" />
              {errors.email && touched.email && <div style={{ color: "red" }}>{errors.email}</div>}
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label htmlFor="password">Passwort</label>
              <Field name="password" type="password" />
              {errors.password && touched.password && <div style={{ color: "red" }}>{errors.password}</div>}
            </div>

            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;