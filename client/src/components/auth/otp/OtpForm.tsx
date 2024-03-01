import { useFormik } from "formik";
import { useState } from "react";
import { Button } from "../../ui";
import OtpInput from "./OtpInput";

const OtpForm = () => {
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validate: (values) => {
      const errors: Partial<typeof values> = {};

      if (values.otp.length !== 6) {
        errors.otp = "Le code de sécurité doit contenir 6 chiffres";
      }
      if (!values.otp) {
        errors.otp = "Le code de sécurité est obligatoire";
      }

      return errors;
    },
  });

  const [otp, setOtp] = useState<string>("");

  const onChange = (value: string) => {
    formik.setValues({ otp: value });
    setOtp(value);
  };

  console.log(formik.errors);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <OtpInput value={otp} valueLength={6} onChange={onChange} />

          {formik.errors.otp && (
            <div className="text-mandy-500 font-bold text-sm">
              {formik.errors.otp}
            </div>
          )}
        </div>
        <Button variant="primary" type="submit">
          Valider
        </Button>
      </div>
    </form>
  );
};

export default OtpForm;
