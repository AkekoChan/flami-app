import { Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "react-line-awesome";
import * as Yup from "yup";
import { Button } from "../ui";

interface FormValues {
  password: string;
  confirmPassword: string;
}

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .required("Le mot de passe est obligatoire.")
          .min(8, "Le mot de passe doit contenir 8 caractères minimum.")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère special."
          )
          .trim(),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Le mot de passe ne correspond pas.")
          .required("La confirmation du mot de passe est obligatoire.")
          .trim(),
      })}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Mot de passe"
                  className={`w-full bg-alabaster-600 border-3 rounded-xl p-4 placeholder:text-alabaster-50 focus:border-tree-poppy-500 outline-none ${
                    errors.password && touched.password
                      ? "border-mandy-500"
                      : "border-alabaster-400"
                  }`}
                />
                {!showPassword ? (
                  <EyeSlashIcon
                    onClick={() => setShowPassword(true)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 inline-block text-2xl text-alabaster-400 cursor-pointer"
                    component="span"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setShowPassword(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 inline-block text-2xl text-alabaster-400 cursor-pointer"
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
            <div className="flex flex-col gap-2">
              <div className="relative">
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmation mot de passe"
                  className={`w-full bg-alabaster-600 border-3 rounded-xl p-4 placeholder:text-alabaster-50 focus:border-tree-poppy-500 outline-none ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-mandy-500"
                      : "border-alabaster-400"
                  }`}
                />
                {!showConfirmPassword ? (
                  <EyeSlashIcon
                    onClick={() => setShowConfirmPassword(true)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 inline-block text-2xl text-alabaster-400 cursor-pointer"
                    component="span"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setShowConfirmPassword(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 inline-block text-2xl text-alabaster-400 cursor-pointer"
                    component="span"
                  />
                )}
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-mandy-500 font-bold text-sm">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <Button variant={"primary"} type="submit">
            Envoyer
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;