import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import FlamiDisplay from "../../components/flami/FlamiDisplay";
import TopBar from "../../components/topbar/TopBar";
import { Button } from "../../components/ui";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { APIHandler } from "../../utils/api/api-handler";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Flami } from "../../interfaces/flami.interface";
import { Palier } from "../../interfaces/palier.interface";
import toast from "react-hot-toast";

const FlamiPage = () => {
  const { token } = useAuth();
  const { setShowNav } = useTheme();
  const [flami, setFlami] = useState<Flami[]>();
  const [palier, setPalier] = useState<Palier>();
  const navigate = useNavigate();

  setShowNav(true);

  const getFlami = useCallback(() => {
    APIHandler<Flami[]>("/my/flami", false, "GET", undefined, token).then(
      (res) => {
        setFlami(res.data);
      }
    );
    APIHandler<Palier>("/my/flami/paliers", false, "GET", undefined, token).then(
      (res) => {
        setPalier(res.data);
        if(res.data.message) {
          toast.success(`${res.data.message}`, {
            style: {
              background: "#3D3D3D",
              color: "#FAFAFA",
              borderRadius: "12px",
            },
          });
        } 
      }
    );
  }, [token]);

  const [animation, setAnimation] = useState('Idle');
  useEffect(() => {
    getFlami();
    setAnimation("Atchoum");
    setTimeout(() => setAnimation("Idle"), 10);
  }, [getFlami]);

  const driver1 = driver({
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
        element: "#shared-flami",
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

  return (
    <div className="flex flex-col mb-24 gap-8">
      <TopBar title="Ton Flami" hasReturn={false} prevPage="" />
      <div className="flex flex-col">
        <div className="flex gap-2">
          {flami
            ? flami.map((flami, k) =>
                flami ? (
                  <FlamiDisplay
                    isSelf={flami.self}
                    flami={flami}
                    animation={animation}
                    key={k}
                  ></FlamiDisplay>
                ) : null
              )
            : null}
        </div>
        <Button
          variant={"secondary"}
          type="button"
          onClick={() => driver1.drive()}
        >
          Besoin d'aide ?
        </Button>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Tes activités</h2>
          <div className="flex flex-col w-full gap-y-3 items-center">
            {
              palier ? (
                <span className="w-full">
                  Partage Flami encore <b>{palier.next_palier - palier.current_palier}</b> fois pour obtenir une récompense !
                </span>
              ) : (
                <span className="w-full">
                  Partage Flami pour obtenir des récompenses !
                </span>
              )
            }
            <div className="w-full bg-alabaster-300 rounded-xl h-4">
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width: `${palier ? (palier.current_palier * 100 / palier.next_palier) : 0}%`,
                }}
                className="bg-midnight-moss-500 h-4 rounded-xl relative"
              >
                <div className="h-1.5 rounded-xl w-90 absolute top-1 left-1/2 -translate-x-1/2 bg-midnight-moss-400 "></div>
              </motion.div>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-y-4 grid-cols-1">
            <Button
              disabled={
                (flami?.[0]?.last_trade &&
                  new Date(flami[0].last_trade).toDateString() ===
                    new Date().toDateString()) ||
                false
              }
              id="share-flami"
              className="bg-alabaster-900 col-span-2 border-tree-poppy-300 shadow-tree-poppy-300 border-3 flex flex-col items-center gap-2 rounded-xl hover:brightness-90 active:shadow-none active:translate-y-1 disabled:bg-alabaster-600 disabled:text-alabaster-300 disabled:shadow-none disabled:hover:brightness-100 disabled:active:translate-y-0"
              onClick={() => navigate("/share")}
            >
              <img src="/assets/img/icons/swap.svg" alt="" loading={"lazy"} />
              Partage Flami
            </Button>
            <Button
              onClick={() => navigate("/cosmetics")}
              id="cosmetics-flami"
              className="bg-alabaster-900 border-midnight-moss-300 border-3 shadow-midnight-300 flex flex-col items-center gap-2 rounded-xl hover:brightness-90 active:shadow-none active:translate-y-1"
            >
              <img
                src="/assets/img/icons/sparkling.svg"
                alt=""
                loading={"lazy"}
              />
              Cosmétiques
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlamiPage;
