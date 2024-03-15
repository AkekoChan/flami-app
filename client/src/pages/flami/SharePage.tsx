import { useCallback, useEffect, useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import { APIHandler } from "../../utils/api/api-handler";
import { useAuth } from "../../hooks/useAuth";
import QRCode from "react-qr-code";
import { Flami } from "../../interfaces/flami.interface";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui";
import { useGeolocated } from "react-geolocated";
import { useTheme } from "../../hooks/useTheme";

const SharePage = () => {
  const { token } = useAuth();
  const { setShowNav } = useTheme();
  const [flami, setFlami] = useState<Flami>();
  const navigate = useNavigate();

  setShowNav(true);

  const getFlami = useCallback(() => {
    APIHandler<Flami>("/my/flami", false, "GET", undefined, token).then(
      (res) => {
        setFlami(res.data);
      }
    );
  }, [token]);

  useEffect(() => {
    getFlami();
  }, [getFlami]);

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  return (
    <div className="flex flex-col gap-8 mb-24">
      <TopBar title="Partager Flami" hasReturn={true} prevPage="/" />
      <div className="flex flex-col gap-8">
        <img
          style={{ filter: "drop-shadow(0px 0px 43px #ff900047)" }}
          className="max-h-80 w-auto m-auto-v"
          src="/assets/img/animations/IdleAnim.gif"
          alt=""
        />
        <div className="w-100 flex gap-8 items-center">
          <div className="flex flex-col gap-1 w-2/3 text-alabaster-50">
            {flami?.shared_flami ? (
              <>
                <span>Relaie le Flami de</span>
                <span className="text-2xl text-tree-poppy-500">
                  {flami?.owner}
                </span>
              </>
            ) : (
              <div>
                <span className="text-tree-poppy-500">Partage ton Flami</span>
              </div>
            )}
            <span>En fesant scanner ce QR code à un ami.</span>
          </div>
          <div
            className="w-1/3 bg-alabaster-50 rounded-xl"
            style={{ height: "auto", margin: "0 auto", padding: "10px" }}
          >
            <QRCode
              size={400}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={JSON.stringify({
                id: flami?.shared_flami?._id ?? flami?._id ?? null,
                location: {
                  lat: coords?.latitude ?? null,
                  long: coords?.longitude ?? null,
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
            variant={"primary"}
            type="button"
            onClick={() => navigate("/share/scan")}
          >
            Scanner le QR code d'un ami
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SharePage;
