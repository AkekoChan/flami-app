import SigninForm from "../../components/auth/signin/SigninForm";

const SigninPage = () => {
  return (
    <section className="flex flex-col justify-center gap-8 h-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Déjà un compte ?</h1>
        <p className="text-center mx-auto">
          Connecte-toi et amuse-toi avec Flami.
        </p>
      </div>
      <SigninForm />
    </section>
  );
};

export default SigninPage;
