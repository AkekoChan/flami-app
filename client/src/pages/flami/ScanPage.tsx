import TopBar from "../../components/topbar/TopBar";
import { useAuth } from "../../hooks/useAuth";
import QrReader from "react-qr-reader-es6";
import { APIHandler } from "../../utils/api/api-handler";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { useTheme } from "../../hooks/useTheme";

const ScanPage = () => {
  const { token } = useAuth();
  const { setShowNav } = useTheme();

  const navigate = useNavigate();
  const [coords, setCoords] = useState<GeolocationCoordinates>();

  setShowNav(true);

  useGeolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    userDecisionTimeout: 15000,
    onSuccess: (position) => {console.log(position.coords); setCoords(position.coords)},
  });

  const shareFlami = useCallback(
    (data: string) => {
      const { id, location, expires } = JSON.parse(data);

      if(expires < new Date().getTime()) {
          toast.error("Ce QR Code a expiré.", {
            style: {
              background: "#3D3D3D",
              color: "#FAFAFA",
              borderRadius: "12px",
            },
          });
          return;
      }

      APIHandler<{ message: string }>(
        "/my/flami/share",
        false,
        "POST",
        {
          shared_user_id: id,
          shared_location: location,
          location: {
            latitude: coords?.latitude,
            longitude: coords?.longitude,
          },
        },
        token
      )
        .then((res) => {
          console.log(res);
          navigate("/");
          toast.success(`${res.data.message} reçu !`, {
            style: {
              background: "#3D3D3D",
              color: "#FAFAFA",
              borderRadius: "12px",
            },
          });
        })
        .catch(() => {
          navigate("/share/scan");
        });
    },
    [token, coords]
  );

  return (
    <div className="flex flex-col gap-8 mb-24">
      <TopBar title="Scanne un QR code" hasReturn={true} prevPage="/share" />
      <QrReader
        style={{
          objectFit: "cover",
          border: "4px solid #ff9900",
          borderRadius: "12px",
        }}
        delay={2000}
        facingMode="environment"
        onScan={(result) => {
          if (!!result && token) {
            shareFlami(result);
          }
        }}
        onError={(error) => console.error(error)}
      />
      <span className="text-alabaster-50">
        Centre le QR code de ton ami dans le carré et attends qu'il soit
        détecté.
      </span>
    </div>
  );
};

export default ScanPage;
