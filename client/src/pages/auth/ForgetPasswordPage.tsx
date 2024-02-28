import ForgetPasswordForm from "../../components/auth/ForgetPasswordForm";

const ForgetPasswordPage = () => {
  return (
    <section className="flex flex-col justify-center gap-8 h-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">
          Mot de passe oublié ?
        </h1>
        <p className="text-center mx-auto">
          Saisis ton e-mail pour recevoir un lien de réinisialisation.
        </p>
      </div>
      <ForgetPasswordForm />
    </section>
  );
};

export default ForgetPasswordPage;
