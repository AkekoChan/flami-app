import TopBar from "../../components/topbar/TopBar";
import { useAuth } from "../../hooks/useAuth";
import { QrReader } from 'react-qr-reader';
import { APIHandler } from "../../utils/api/api-handler";
import { Flami } from "../../interfaces/flami.interface";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { useGeolocated } from "react-geolocated";

const ScanPage = () => {
  const { token } = useAuth();

  const navigate = useNavigate();

  const { coords } =
  useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
  });

  let shareFlami = useCallback((data: string) => {
    const { id, location } = JSON.parse(data);
    APIHandler<Flami>("/my/flami/share", false, "POST", {
        flami_id: id,
        location_shared: location,
        location: {
          lat: coords?.latitude || null,
          long: coords?.longitude || null
        }
    }, token).then(
      (res) => {
        console.log(res);
        navigate("/");
        toast.success(`Flami de ${res.data.owner} reçu !`, {
            style: {
                background: "#3D3D3D",
                color: "#FAFAFA",
                borderRadius: "12px",
            },
        });
      }
    ).catch(() => {
        navigate("/share/scan");
    });
  }, [token]);

  return (
  <div className="flex flex-col gap-8">
    <TopBar title="Scanner un QR code" hasReturn={true} prevPage="/share" />
    <QrReader
        videoStyle={{ objectFit: "cover", border: "4px solid #ff9900", borderRadius: "12px" }}
        scanDelay={500}
        constraints={{ facingMode: 'environment' }}
        onResult={(result) => {
          if (!!result && token) {
            shareFlami(result?.getText());
            shareFlami = () => null;
          }
        }}
    />
    <span className="text-alabaster-50">Centrez le QR code de votre ami dans le carré et attendez qu'il soit détecté.</span>
  </div>
  );
};

export default ScanPage;
