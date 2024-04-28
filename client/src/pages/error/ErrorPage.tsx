import { LinkComponent } from "../../components/ui";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img
        src="/assets/img/animations/ThinkAnim.gif"
        className="w-full max-h-60 object-contain"
        alt="Flami qui te dit bonjour avec sa main."
      />
      <h1 className="text-2xl font-bold text-center ">Je pense que tu t'es perdu(e) ?</h1>
      <LinkComponent to="/" variant={"primary"}>Retour à l'accueil</LinkComponent>
    </div>
  );
};

export default ErrorPage;
