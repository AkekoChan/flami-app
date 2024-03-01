import ResetPasswordForm from "../../components/auth/reset-password/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <section className="flex flex-col justify-center gap-8 h-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">
          Choisis un nouveau mot de passe
        </h1>
      </div>
      <ResetPasswordForm />
    </section>
  );
};

export default ResetPasswordPage;
