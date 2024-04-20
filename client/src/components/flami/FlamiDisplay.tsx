import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Button } from "../../components/ui";
import { FlamiData } from "../../interfaces/flami.interface";
import FlamiShow from "./FlamiShow";

const driverObj = driver({
  nextBtnText: "Suivant",
  prevBtnText: "Précédant",
  doneBtnText: "Terminé",
  steps: [
    {
      element: "#your-flami",
      popover: {
        title: "Qui est ce petit personnage ?",
        description:
          "Voici ton Flami, unique en son genre ! Il peut partager des aventures avec un autre Flami, appartenant à un autre joueur.",
      },
    },
    {
      element: "#share-flami",
      popover: {
        title: "Partage ton Flami avec le monde !",
        description: `Prépare ton Flami pour une aventure extraordinaire !
        Envoie ton Flami explorer le monde chez un autre joueur et découvre un nouveau Flami à partager.
        Ton Flami poursuivra son périple en étant échangé contre un autre, et tu en feras de même avec ceux que tu recevras.        
        N'oublie pas : un échange par jour maximum, alors choisis bien ton destinataire !        
        Plus tu échanges, plus tu accumules de chances de remporter des récompenses exceptionnelles !`,
      },
    },
    {
      element: "#cosmetics-flami",
      popover: {
        title: "Personnalise ton Flami !",
        description: `Ton Flami est unique, mais il peut l'être encore plus !
          Découvre un univers de possibilités pour personnaliser ton Flami et le rendre à ton image.          
          Comment ?          
          Échange ton Flami avec d'autres joueurs et obtiens de nouvelles apparences.
          Récupère ton badge quotidien pour débloquer des cosmétiques exclusives.
          Exprime ta personnalité et fais de ton Flami un véritable reflet de ton style !`,
      },
    },
    {
      element: "#profile",
      popover: {
        title: "Ton profil",
        description: "Personnalise ton compte et découvre tes badges !",
      },
    },
    {
      element: "#map",
      popover: {
        title: "Suis les flammes",
        description: `Aventure-toi sur la carte et découvre :
          Le parcours quotidien de la vraie Flamme.
          Le voyage extraordinaire de ton Flami.
          Suis leurs traces et découvre des surprises passionnantes !`,
      },
    },
  ],
});

const FlamiDisplay = ({ flami }: { flami: FlamiData }) => {
  return (
    <div className="relative flex flex-col gap-6">
      <div className="w-full flex justify-around">
        <FlamiShow flami={flami} />
      </div>
      <Button
        variant={"secondary"}
        type="button"
        onClick={() => driverObj.drive()}
      >
        Besoin d'aide ?
      </Button>
    </div>
  );
};

export default FlamiDisplay;
