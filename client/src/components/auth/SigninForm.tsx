import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "react-line-awesome";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Button, LinkComponent } from "../ui";

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Le format de l'e-mail est incorrect.")
          .required("L'e-mail est obligatoire.")
          .trim(),
        password: Yup.string()
          .min(8, "Le mot de passe doit faire 8 caractères minimum.")
          .required("Le mot de passe est obligatoire.")
          .trim(),
      })}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <Field
                type="email"
                name="email"
                placeholder="E-mail"
                className={`w-full bg-alabaster-600 border-3 rounded-xl p-4 placeholder:text-alabaster-50 focus:border-tree-poppy-500 outline-none mb-2 ${
                  errors.email && touched.email
                    ? "border-mandy-500"
                    : "border-alabaster-400"
                }`}
              />
              {errors.email && touched.email && (
                <p className="text-mandy-500 font-bold text-sm">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Mot de passe"
                  className={`w-full bg-alabaster-600 border-3 rounded-xl p-4 placeholder:text-alabaster-50 focus:border-tree-poppy-500 outline-none mb-2 ${
                    errors.password && touched.password
                      ? "border-mandy-500"
                      : "border-alabaster-400"
                  }`}
                />
                {!showPassword ? (
                  <EyeSlashIcon
                    onClick={() => setShowPassword(true)}
                    className="absolute right-4 top-1/3 -translate-y-1/4 inline-block text-2xl text-alabaster-400"
                    component="span"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setShowPassword(false)}
                    className="absolute right-4 top-1/3 -translate-y-1/4 inline-block text-2xl text-alabaster-400"
                    component="span"
                  />
                )}
              </div>
              {errors.password && touched.password && (
                <p className="text-mandy-500 font-bold text-sm">
                  {errors.password}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button variant={"primary"} type="submit">
              Se connecter
            </Button>
            <LinkComponent variant={"secondary"} to="/sign-up">
              Se créer un compte
            </LinkComponent>
            <p className="text-center">
              Tu as oublié ton mot de passe ?{" "}
              <Link
                to="/reset-password"
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
