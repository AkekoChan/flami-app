import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useCallback, useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router";
import MyFlamiDisplay from "../../components/flami/myFlamiDisplay";
import TopBar from "../../components/topbar/TopBar";
import { Button } from "../../components/ui";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { FlamiData } from "../../interfaces/flami.interface";
import { APIHandler } from "../../utils/api/api-handler";

const driver2 = driver({
  nextBtnText: "Suivant",
  prevBtnText: "Précédant",
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

const SharePage = () => {
  const { token } = useAuth();
  const { setShowNav } = useTheme();
  const [flami, setFlami] = useState<FlamiData>();
  const navigate = useNavigate();

  setShowNav(true);

  const getFlami = useCallback(() => {
    APIHandler<FlamiData>("/my/flami", false, "GET", undefined, token).then(
      (res) => {
        setFlami(res.data);
      }
    );
  }, [token]);

  useEffect(() => {
    getFlami();
  }, [getFlami]);

  const [coords, setCoords] = useState<GeolocationCoordinates>();

  useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 15000,
    onSuccess: (position) => setCoords(position.coords),
  });

  return (
    <div className="flex flex-col gap-8 mb-24">
      <TopBar title="Partage Flami" hasReturn={true} prevPage="/" />
      <div className="flex flex-col gap-8">
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
            <MyFlamiDisplay
              animation="Idle"
              myFlami={flami.kept_flami || flami.my_flami}
            />
          ) : null}
        </div>
        <div className="w-100 flex gap-8 items-center">
          <div className="flex flex-col gap-1 w-2/3 text-alabaster-50">
            {flami?.kept_flami ? (
              <>
                <span>
                  Partage le{" "}
                  <span className="text-2xl text-tree-poppy-500">
                    {flami?.kept_flami.name}
                  </span>
                </span>
              </>
            ) : (
              <div>
                <span className="text-tree-poppy-500">Partage ton Flami</span>
              </div>
            )}
            <span>En faisant scanner ce QR code à un ami.</span>
          </div>
          <div
            className="w-1/3 bg-alabaster-50 rounded-xl share-qrcode"
            style={{ height: "auto", margin: "0 auto", padding: "10px" }}
          >
            <QRCode
              size={400}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={JSON.stringify({
                expires: new Date().getTime() + 60 * 1000 * 10,
                id: flami?.my_flami.owner,
                location: {
                  latitude: coords?.latitude || null,
                  longitude: coords?.longitude || null,
                },
              })}
              viewBox={`0 0 400 400`}
              fgColor={"#292929"}
              bgColor={"#fafafa"}
            />
          </div>
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
