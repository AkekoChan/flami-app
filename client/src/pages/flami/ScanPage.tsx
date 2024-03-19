import TopBar from "../../components/topbar/TopBar";
import { useAuth } from "../../hooks/useAuth";
import QrReader from "react-qr-reader-es6";
import { APIHandler } from "../../utils/api/api-handler";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { useGeolocated } from "react-geolocated";
import { useTheme } from "../../hooks/useTheme";

const ScanPage = () => {
  const { token } = useAuth();
  const { setShowNav } = useTheme();

  const navigate = useNavigate();

  setShowNav(true);

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  let shareFlami = useCallback(
    (data: string) => {
      const { id, location } = JSON.parse(data);
      console.log(coords)
      APIHandler<{ message: string }>(
        "/my/flami/share",
        false,
        "POST",
        {
          shared_user_id: id,
          shared_location: location,
          location: {
            lat: coords?.latitude,
            long: coords?.longitude,
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
    [token]
  );

  return (
    <div className="flex flex-col gap-8">
      <TopBar title="Scanner un QR code" hasReturn={true} prevPage="/share" />
      <QrReader
        style={{
          objectFit: "cover",
          border: "4px solid #ff9900",
          borderRadius: "12px",
        }}
        delay={500}
        facingMode="environment"
        onScan={(result) => {
          if (!!result && token) {
            shareFlami(result);
            shareFlami = () => null;
          }
        }}
        onError={(error) => console.error(error)}
      />
      <span className="text-alabaster-50">
        Centrez le QR code de votre ami dans le carré et attendez qu'il soit
        détecté.
      </span>
    </div>
  );
};

export default ScanPage;
