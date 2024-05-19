import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useCallback, useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router";
import TopBar from "../../components/topbar/TopBar";
import { Button } from "../../components/ui";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { Flami } from "../../interfaces/flami.interface";
import { APIHandler } from "../../utils/api/api-handler";
import FlamiDisplay from "../../components/flami/FlamiDisplay";
import { CircleNotchIcon } from "react-line-awesome";

const SharePage = () => {
  const { token } = useAuth();
  const { setShowNav } = useTheme();
  const [flami, setFlami] = useState<Flami>();
  const [userId, setUserId] = useState<string>();
  const navigate = useNavigate();

  setShowNav(true);

  const [showQRCode, setShowQRCode] = useState(false);

  const getFlami = useCallback(() => {
    APIHandler<Flami[]>("/my/flami", false, "GET", undefined, token).then(
      (res) => {
        setFlami(res.data[1] ?? res.data[0]);
        setUserId(res.data[0]?.owner_id);
      }
    );
  }, [token]);

  const driver2 = driver({
    nextBtnText: "Suivant",
    prevBtnText: "Précédent",
    doneBtnText: "Terminé",
    steps: [
      {
        popover: {
          title: "Comment partager un Flami ?",
          description:
            "Avant d'effectuer un échange, assure-toi d'avoir bien accepté la géolocalisation et l'usage de la caméra. Sans cela, tu ne pourras pas effectuer d'échange.",
        },
      },
      {
        element: ".share-qrcode",
        popover: {
          title: "Partager, c'est simple !",
          description:
            "Voici ton QR Code d'échange ! Lors de ton premier échange, c'est ton Flami qui sera échangé et tu recevras celui de ton ami. Ensuite, tu pourras partager ce nouveau Flami avec quelqu'un d'autre et en recevoir un nouveau en échange. Partager son QR Code est on ne peut plus simple, découvre comment à l'étape suivante !",
        },
      },
      {
        element: ".share-btn",
        popover: {
          title: `Scanner, c'est la clé !`,
          description:
            "Pour échanger des Flamis, rien de plus simple ! Il suffit que toi ou ton ami avec qui tu souhaites partager ton Flami cliquiez sur ce bouton et accediez au scan du QR Code.",
        },
      },
    ],
  });

  useEffect(() => {
    getFlami();
  }, [getFlami]);

  const [coords, setCoords] = useState<GeolocationCoordinates>();

  const [zoomOn, setZoomOn] = useState(false);

  useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 15000,
    onSuccess: (position) => {
      setCoords(position.coords);
      setShowQRCode(true);
    },
    onError: () => {
      setShowQRCode(true);
    }
  });

  return (
    <div className="flex flex-col gap-8 mb-24">
      <TopBar title="Partage Flami" hasReturn={true} prevPage="/" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <button
            onClick={() => {
              driver2.drive();
            }}
            className="bg-tree-poppy-500 text-alabaster-950 text-lg font-semibold rounded-full w-8 h-8 flex justify-center items-center cursor-pointer hover:brightness-90 self-end share-help"
          >
            ?<span className="sr-only">Besoin d'aide ?</span>
          </button>
          {flami ? (
            <FlamiDisplay
              isSelf={true}
              flami={flami}
            />
          ) : null}
        </div>
        <div className="w-100 flex flex-col gap-4">
          <div className="flex flex-col gap-1 text-alabaster-50">
              <div>
                {
                  flami?.self ? (
                    <span className="text-tree-poppy-500">Partage ton Flami</span>
                  ) : (
                    <span className="text-tree-poppy-500">Partage le {flami?.name || "Flami"}</span>
                  )
                }
              </div>
            <span>En faisant scanner ce QR code à un ami.</span>
          </div>
          <div
            className="flex justify-center w-full bg-alabaster-50 rounded-xl share-qrcode text-alabaster-900"
            style={{ height: "auto", margin: "0 auto", padding: "10px" }}
          >
            {
              showQRCode ? <QRCode
                style={{ margin: "0 auto", height: "auto", width: zoomOn ? "100%" : "40%" }}
                onClick={() => setZoomOn(!zoomOn)}
                value={JSON.stringify({
                  expires: new Date().getTime() + 60 * 1000 * 10,
                  id: userId,
                  location: {
                    latitude: coords?.latitude || null,
                    longitude: coords?.longitude || null,
                  },
                })}
                viewBox={`0 0 400 400`}
                fgColor={"#292929"}
                bgColor={"#fafafa"}
              /> : <div className="flex items-center gap-2">
                  <CircleNotchIcon className="animate-spin text-3xl mx-auto"/>
                  <span>En attente de la Géolocalisation</span>
                </div>
            }
          </div>
          <span className="text-sm opacity-40 w-full text-center">Cliquer pour agrandir</span>
        </div>
        <div className="flex">
          <Button
            className="share-btn"
            variant={"primary"}
            type="button"
            onClick={() => navigate("/share/scan")}
          >
            Scanne le QR code d'un ami
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SharePage;
