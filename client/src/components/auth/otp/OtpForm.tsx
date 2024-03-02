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

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <OtpInput
            value={otp}
            valueLength={6}
            onChange={onChange}
            aria-required="true"
            aria-invalid={formik.errors.otp ? "true" : "false"}
            aria-describedby="otp-error"
          />

          {formik.errors.otp && (
            <div
              className="text-mandy-500 font-bold text-sm"
              id="otp-error"
              aria-live="assertive"
            >
              {formik.errors.otp}
            </div>
          )}
        </div>
        <Button
          variant="primary"
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
        >
          Valider
        </Button>
      </div>
    </form>
  );
};

export default OtpForm;
