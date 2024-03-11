import { useFormik } from "formik";
import { useState } from "react";
import { Button } from "../../ui";
import OtpInput from "./OtpInput";
import { APIHandler } from "../../../utils/api/api-handler";
import { AuthResponse } from "../../../interfaces/api-response/auth-reponse";
import { OtpBody } from "../../../interfaces/api-body/otp-body";
import { GenericResponse } from "../../../interfaces/api-response/generic-response";
import toast from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const OtpForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleResendOtp = () => {
    const body = {
      email: auth.user?.email,
    };

    APIHandler<GenericResponse>("/auth/send-otp", false, "post", body).then(
      (res) => {
        toast.success(res.data.message, {
          style: {
            background: "#3D3D3D",
            color: "#FAFAFA",
            borderRadius: "12px",
          },
        });
      }
    );
  };

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: (values) => {
      const body: OtpBody = {
        email: auth.user?.email,
        otp: values.otp,
      };

      APIHandler<AuthResponse>("/auth/verify-otp", false, "post", body).then(
        (res) => {
          localStorage.setItem("token", res.data.token);
          toast.success(res.data.message, {
            style: {
              background: "#3D3D3D",
              color: "#FAFAFA",
              borderRadius: "12px",
            },
          });
          navigate("/");
        }
      );
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
        <div className="flex flex-col gap-2">
          <Button
            variant="primary"
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Valider
          </Button>
          <Button variant="tertiary" type="button" onClick={handleResendOtp}>
            Renvoyer code de validation
          </Button>
        </div>
      </div>
    </form>
  );
};

export default OtpForm;
