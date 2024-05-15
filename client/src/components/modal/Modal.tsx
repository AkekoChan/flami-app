import { useTheme } from "../../hooks/useTheme";
import { Button } from "../ui";

const Modal = () => {
  const { isClose, handleCloseModal } = useTheme();

  return (
    <div className={`h-dvh ${isClose === "true" ? "hidden" : ""}`}>
      <div className="fixed top-1/2 left-1/2 z-50 justify-center items-center -translate-x-1/2 -translate-y-1/2 max-w-lg w-full">
        <div className="relative p-4">
          <div className="relative bg-alabaster-800 rounded-xl">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-alabaster-600">
              <h3 className="text-xl font-semibold text-alabaster-50">
                Attention !
              </h3>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-alabaster-50">
                Afin d'optimiser l'utilisation de l'application, nous te
                remercions de bien vouloir utiliser un navigateur moderne et
                d'accepter l'appareil photo et la géocalisation quand cela t'est
                demandé.
              </p>
            </div>

            <div className="flex items-center p-4 md:p-5 border-t rounded-b border-alabaster-600">
              <Button variant={"primary"} onClick={handleCloseModal}>
                J'accepte
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
