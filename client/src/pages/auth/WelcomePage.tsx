import { Link } from "react-router-dom";
import { Button, LinkComponent } from "../../components/ui";

const WelcomePage = () => {
  return (
    <section className="flex flex-col justify-center gap-8 h-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">
          Bienvenue à toi sur Flami !
        </h1>
        <p className="text-center max-w-64 mx-auto">
          Découvre l’aventure captivante du relais de la flamme.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <LinkComponent variant={"primary"} to="/sign-up">
          Créer son compte
        </LinkComponent>
        <Button variant={"secondary"}>Télécharger l'application</Button>
        <p className="text-center">
          Tu as deja un compte ?{" "}
          <Link
            to="/sign-in"
            className="text-tree-poppy-500 underline underline-offset-4"
          >
            Connecte-toi ici !
          </Link>
        </p>
      </div>
    </section>
  );
};

export default WelcomePage;
