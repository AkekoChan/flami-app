import { useCallback, useEffect, useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import { APIHandler } from "../../utils/api/api-handler";
import { useAuth } from "../../hooks/useAuth";
import QRCode from "react-qr-code";
import { FlamiData } from "../../interfaces/flami.interface";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui";
import { useGeolocated } from "react-geolocated";
import { useTheme } from "../../hooks/useTheme";
import MyFlamiDisplay from "../../components/flami/MyFlamiDisplay";

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
      <TopBar title="Partager Flami" hasReturn={true} prevPage="/" />
      <div className="flex flex-col gap-8">
        { flami ? <MyFlamiDisplay myFlami={flami.kept_flami || flami.my_flami} /> : null }
        <div className="w-100 flex gap-8 items-center">
          <div className="flex flex-col gap-1 w-2/3 text-alabaster-50">
            {flami?.kept_flami ? (
              <>
                <span>
                  Relaie le
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
            className="w-1/3 bg-alabaster-50 rounded-xl"
            style={{ height: "auto", margin: "0 auto", padding: "10px" }}
          >
            <QRCode
              size={400}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={JSON.stringify({
                expires: new Date().getTime() + (60 * 1000 * 10),
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
