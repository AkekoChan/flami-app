import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "../ui";

interface FormValues {
  email: string;
}

const ForgetPasswordForm = () => {
  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    console.log(values);
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
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Field
              type="email"
              name="email"
              placeholder="E-mail"
              className={`w-full bg-alabaster-600 border-3 rounded-xl p-4 placeholder:text-alabaster-50 focus:border-tree-poppy-500 outline-none ${
                errors.email && touched.email
                  ? "border-mandy-500"
                  : "border-alabaster-400"
              }`}
            />
            {errors.email && touched.email && (
              <p className="text-mandy-500 font-bold text-sm">{errors.email}</p>
            )}
          </div>

          <Button variant="primary" type="submit">
            Envoyer
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ForgetPasswordForm;