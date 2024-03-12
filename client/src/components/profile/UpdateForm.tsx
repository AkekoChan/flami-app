import { Field, Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "react-line-awesome";
import * as Yup from "yup";
import { Button } from "../ui";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../interfaces/user.interface";
import { APIHandler } from "../../utils/api/api-handler";
import { UpdateAccountBody } from "../../interfaces/api-body/update-account-body";
import { AuthResponse } from "../../interfaces/api-response/auth-reponse";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const validationSchema = Yup.object().shape({
  name: Yup.string().trim(),
  email: Yup.string().email("Le format de l'e-mail est incorrect.").trim(),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Le mot de passe doit contenir au moins huit caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère special."
    )
    .trim(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Le mot de passe ne correspond pas.")
    .trim(),
});
const UpdateForm = () => {
  const { token, setToken } = useAuth();
  const [user, setUser] = useState<User>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const getAccount = useCallback(() => {
    APIHandler<User>("/my/profile", false, "GET", undefined, token).then(
      (res) => {
        setUser(res.data);
      }
    );
  }, [token]);

  useEffect(() => {
    getAccount();
  }, [getAccount]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: user?.name ? user?.name : "",
        email: user?.email ? user?.email : "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        const body: UpdateAccountBody = {
          email: values.email,
          name: values.name,
          password: values.password,
        };
        console.log(token, body);
        APIHandler<AuthResponse>(
          "/my/account",
          false,
          "PATCH",
          body,
          token
        ).then((res) => {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          toast.success(res.data.message, {
            style: {
              background: "#3D3D3D",
              color: "#FAFAFA",
              borderRadius: "12px",
            },
          });
          navigate("/profile");
        });
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Field
                  type="text"
                  name="name"
                  placeholder="Nom d'utilisateur"
                  autoComplete="off"
                  aria-required="true"
                  aria-invalid={errors.name && touched.name ? "true" : "false"}
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
              <Button variant={"primary"} type="submit">
                Sauvegarder
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateForm;
