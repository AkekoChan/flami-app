import { useEffect } from "react";
import { APIHandler } from "../../utils/api/api-handler";
import { GenericResponse } from "../../interfaces/api-response/generic-response";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const TrainFlami = () => {
    let value = parseInt(location.pathname.substring(location.pathname.lastIndexOf('/') + 1));
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        APIHandler<GenericResponse>(
            `/my/flami/training`,
            false,
            "PATCH",
            { worked_stat: 'speed' }, 
            token
          ).then(() => {
            toast.success("Ton Flami a gagné en vitesse !", {
              style: {
                background: "#3D3D3D",
                color: "#FAFAFA",
                borderRadius: "12px",
              },
            });
        });
        navigate("/");
    }, [toast, token]);

    return <>
    FLAMI TRAINED STATS VITESSE ADD {value} / ?
    </>;
};

export default TrainFlami;