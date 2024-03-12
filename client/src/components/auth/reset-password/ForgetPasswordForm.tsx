import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "../../ui";
import { APIHandler } from "../../../utils/api/api-handler";
import { GenericResponse } from "../../../interfaces/api-response/generic-response";
import toast from "react-hot-toast";

interface FormValues {
  email: string;
}

const ForgetPasswordForm = () => {
  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const body = {
      email: values.email,
    };
    APIHandler<GenericResponse>(
      "/auth/forget-password",
      false,
      "POST",
      body
    ).then((res) => {
      toast.success(res.data.message, {
        style: {
          background: "#3D3D3D",
          color: "#FAFAFA",
          borderRadius: "12px",
        },
      });
    });
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Le format de l'e-mail est incorrect.")
          .required("L'e-mail est obligatoire.")
          .trim(),
      })}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form className="flex flex-col gap-6">
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
              <p className="text-mandy-500 font-bold text-sm" id="email-help">
                {errors.email}
              </p>
            )}
          </div>

          <Button
            variant="primary"
            type="submit"
            disabled={!(isValid && dirty)}
          >
            Envoyer
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ForgetPasswordForm;
