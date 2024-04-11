import { Link } from "react-router-dom";
import { Button, LinkComponent } from "../../components/ui";
import { usePwa } from "@dotmind/react-use-pwa";
import { useCallback } from "react";

const WelcomePage = () => {
  const { installPrompt, isInstalled, canInstall } = usePwa();

  const handleInstallPrompt = useCallback(() => {
    if (canInstall) {
      installPrompt();
    }
  }, [canInstall, installPrompt]);

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
          Crée ton compte
        </LinkComponent>
        {canInstall || !isInstalled ? (
          <Button variant={"secondary"} onClick={handleInstallPrompt}>
            Télécharge l'application
          </Button>
        ) : (
          ""
        )}

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
