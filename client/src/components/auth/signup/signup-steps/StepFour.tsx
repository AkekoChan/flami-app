import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from "react-line-awesome";
import * as Yup from "yup";
import { useAuth } from "../../../../hooks/useAuth";
import { SignupBody } from "../../../../interfaces/api-body/signup-body";
import { Button, Reveal } from "../../../ui";

const lastStepValidationSchema = Yup.object().shape({
  name: Yup.string().required("Le nom est obligatoire.").trim(),
  email: Yup.string()
    .email("Le format de l'e-mail est incorrect.")
    .required("L'e-mail est obligatoire.")
    .trim(),
  password: Yup.string()
    .required("Le mot de passe est obligatoire.")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
      "Le mot de passe doit contenir au moins huit caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère special."
    )
    .trim(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Le mot de passe ne correspond pas.")
    .required("La confirmation du mot de passe est obligatoire.")
    .trim(),
  age: Yup.number()
    .min(13, "Tu dois avoir au moins 13 ans.")
    .max(120, "Saisie un âge valide.")
    .required("L'âge est obligatoire.")
    .truncate(),
});

const StepFour = ({
  nextStep,
  prevStep,
  data,
  animDir,
}: {
  nextStep: (newData: SignupBody, final?: boolean) => void;
  prevStep: (newData: SignupBody) => void;
  data: SignupBody;
  animDir: "next" | "prev";
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const auth = useAuth();

  return (
    <Formik
      initialValues={{ ...data, confirmPassword: "" }}
      validationSchema={lastStepValidationSchema}
      onSubmit={(values, actions) => {
        const { name, email, password, age, metadata } = values;

        const SignupBody: SignupBody = {
          name,
          email,
          password,
          age,
          metadata,
        };

        nextStep(SignupBody, true);

        auth.signup(SignupBody);

        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <ArrowLeftIcon
              className="text-3xl text-alabaster-50 cursor-pointer px-2 py-1 hover:bg-alabaster-300/20 rounded-xl ease-out duration-100"
              component="span"
              role="button"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter") {
                  prevStep(data);
                }
              }}
              aria-label="Retour"
              aria-hidden="false"
              onClick={() => prevStep(data)}
            />
            <div className="w-100 bg-alabaster-300 rounded-xl h-4">
              <motion.div
                initial={{ width: animDir === "next" ? "75%" : "100%" }}
                animate={{ width: animDir === "next" ? "100%" : "100%" }}
                className="bg-tree-poppy-500 h-4 rounded-xl relative"
              >
                <div className="h-1.5 rounded-xl w-90 absolute top-1 left-1/2 -translate-x-1/2 bg-tree-poppy-400"></div>
              </motion.div>
            </div>
          </div>
          <Reveal className="flex flex-col gap-8">
            <h1 className="text-2xl font-bold text-center">
              Finalise ton inscription pour commencer à utiliser l'application !
            </h1>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Nom d'utilisateur"
                    autoComplete="off"
                    aria-required="true"
                    aria-invalid={
                      errors.name && touched.name ? "true" : "false"
                    }
                    aria-describedby="name-help"
                    className={`w-100 bg-alabaster-600 border-3 rounded-xl p-4 placeholder:text-alabaster-50 focus:border-tree-poppy-500 outline-none ${
                      errors.name && touched.name
                        ? "border-mandy-500"
                        : "border-alabaster-400"
                    }`}
                  />
                  {errors.name && touched.name && (
                    <p
                      className="text-mandy-500 font-bold text-sm"
                      id="name-help"
                      aria-live="assertive"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Field
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    autoComplete="off"
                    aria-required="true"
                    aria-invalid={
                      errors.email && touched.email ? "true" : "false"
                    }
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
                  <Field
                    type="number"
                    name="age"
                    min={0}
                    placeholder="Age"
                    autoComplete="off"
                    aria-required="true"
                    aria-invalid={errors.age && touched.age ? "true" : "false"}
                    aria-describedby="age-help"
                    className={`w-100 bg-alabaster-600 border-3 rounded-xl p-4 placeholder:text-alabaster-50 focus:border-tree-poppy-500 outline-none ${
                      errors.age && touched.age
                        ? "border-mandy-500"
                        : "border-alabaster-400"
                    }`}
                  />
                  {errors.age && touched.age && (
                    <p
                      className="text-mandy-500 font-bold text-sm"
                      id="age-help"
                      aria-live="assertive"
                    >
                      {errors.age}
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
                        className="absolute right-4 top-1/3 -translate-y-1/4 inline-block text-2xl text-alabaster-400 cursor-pointer"
                        component="span"
                        aria-hidden="false"
                        aria-label="Voir le mot de passe"
                        tabIndex={0}
                      />
                    ) : (
                      <EyeIcon
                        onClick={() => setShowPassword(false)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && setShowPassword(false)
                        }
                        className="absolute right-4 top-1/3 -translate-y-1/4 inline-block text-2xl text-alabaster-400 cursor-pointer"
                        component="span"
                        aria-hidden="false"
                        aria-label="Cacher le mot de passe"
                        tabIndex={0}
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
                <div className="flex flex-col gap-2">
                  <div className="relative">
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirmation mot de passe"
                      autoComplete="off"
                      aria-required="true"
                      aria-invalid={
                        errors.confirmPassword && touched.confirmPassword
                          ? "true"
                          : "false"
                      }
                      aria-describedby="confirm-password-help"
                      className={`w-100 bg-alabaster-600 border-3 rounded-xl p-4 placeholder:text-alabaster-50 focus:border-tree-poppy-500 outline-none ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "border-mandy-500"
                          : "border-alabaster-400"
                      }`}
                    />
                    {!showConfirmPassword ? (
                      <EyeSlashIcon
                        onClick={() => setShowConfirmPassword(true)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && setShowConfirmPassword(true)
                        }
                        className="absolute right-4 top-2/4 -translate-y-2/4 inline-block text-2xl text-alabaster-400 cursor-pointer"
                        component="span"
                        aria-hidden="false"
                        aria-label="Voir le mot de passe"
                        tabIndex={0}
                      />
                    ) : (
                      <EyeIcon
                        onClick={() => setShowConfirmPassword(false)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && setShowConfirmPassword(false)
                        }
                        className="absolute right-4 top-2/4 -translate-y-2/4 inline-block text-2xl text-alabaster-400 cursor-pointer"
                        component="span"
                        aria-hidden="false"
                        aria-label="Cacher le mot de passe"
                        tabIndex={0}
                      />
                    )}
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p
                      className="text-mandy-500 font-bold text-sm"
                      id="confirm-password-help"
                      aria-live="assertive"
                    >
                      {errors.confirmPassword}
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
                  Termine ton inscription
                </Button>
              </div>
            </div>
          </Reveal>
        </Form>
      )}
    </Formik>
  );
};

export default StepFour;
