import OtpForm from "../../components/auth/otp/OtpForm";

const OtpPage = () => {
  return (
    <section className="flex flex-col justify-center gap-8 h-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center max-w-96 mx-auto">
          Saisis le code de sécurité pour finaliser ton inscription !
        </h1>
        <p className="text-center">
          Un code de sécurité a été envoyé à ton e-mail.
        </p>
      </div>
      <OtpForm />
    </section>
  );
};

export default OtpPage;
