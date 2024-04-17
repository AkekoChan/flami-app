import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "react-line-awesome";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../../hooks/useAuth";
import { SigninBody } from "../../../interfaces/api-body/signin-body";
import { Button, LinkComponent } from "../../ui";

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const auth = useAuth();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Le format de l'e-mail est incorrect.")
          .required("L'e-mail est obligatoire.")
          .trim(),
        password: Yup.string()
          .matches(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
            "Le mot de passe doit contenir au moins huit caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère special."
          )
          .required("Le mot de passe est obligatoire.")
          .trim(),
      })}
      onSubmit={(values, actions) => {
        const body: SigninBody = {
          email: values.email,
          password: values.password,
        };

        auth.signin(body);
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Field
                type="email"
                name="email"
                placeholder="E-mail"
                autoComplete="off"
                aria-required="true"
                aria-invalid={errors.email && touched.email ? "true" : "false"}
                aria-describedby="email-help"
                className={`w-100 bg-alabaster-600 border-3 rounded-xl p-4 placeholder:text-alabaster-50 focus:border-tree-poppy-500 outline-none ${
                  errors.email && touched.email
                    ? "border-mandy-500"
                    : "border-alabaster-400"
                }`}
              />
              {errors.email && touched.email && (
                <p
                  className="text-mandy-500 font-bold text-sm"
                  id="email-help"
                  aria-live="assertive"
                >
                  {errors.email}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Mot de passe"
                  autoComplete="off"
                  aria-required="true"
                  aria-invalid={
                    errors.password && touched.password ? "true" : "false"
                  }
                  aria-describedby="password-help"
                  className={`w-100 bg-alabaster-600 border-3 rounded-xl p-4 placeholder:text-alabaster-50 focus:border-tree-poppy-500 outline-none ${
                    errors.password && touched.password
                      ? "border-mandy-500"
                      : "border-alabaster-400"
                  }`}
                />
                {!showPassword ? (
                  <EyeSlashIcon
                    onClick={() => setShowPassword(true)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setShowPassword(true)
                    }
                    aria-hidden="false"
                    aria-label="Voir le mot de passe"
                    tabIndex={0}
                    className="absolute right-4 top-2/4 -translate-y-2/4 inline-block text-2xl text-alabaster-400 cursor-pointer"
                    component="span"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setShowPassword(false)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setShowPassword(false)
                    }
                    aria-hidden="false"
                    aria-label="Voir le mot de passe"
                    tabIndex={0}
                    className="absolute right-4 top-2/4 -translate-y-2/4 inline-block text-2xl text-alabaster-400 cursor-pointer"
                    component="span"
                  />
                )}
              </div>
              {errors.password && touched.password && (
                <p
                  className="text-mandy-500 font-bold text-sm"
                  id="password-help"
                  aria-live="assertive"
                >
                  {errors.password}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              variant={"primary"}
              type="submit"
              disabled={!(isValid && dirty)}
            >
              Connecte-toi
            </Button>
            <LinkComponent variant={"secondary"} to="/sign-up">
              Crée ton compte
            </LinkComponent>
            <p className="text-center">
              Tu as oublié ton mot de passe ?{" "}
              <Link
                to="/forget-password"
                className="text-tree-poppy-500 underline underline-offset-4"
              >
                Réinitialise le ici !
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SigninForm;
