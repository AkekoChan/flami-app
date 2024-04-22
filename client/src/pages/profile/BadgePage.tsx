import { Badge } from "../../interfaces/badge.interface";
import { useCallback, useEffect, useState } from "react";
import ding from "../../../public/assets/sound/ding.wav";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { APIHandler } from "../../utils/api/api-handler";
import TopBar from "../../components/topbar/TopBar";

const BadgePage = () => {
  const { token } = useAuth();
  const [side, setSide] = useState(true);
  const [loading, setLoading] = useState(true);
  const medalDing = new Audio(ding);

  const { badgeId } = useParams();
  const [badge, setBadge] = useState<Badge>();

  const navigate = useNavigate();

  const getBadge = useCallback(() => {
    APIHandler<Badge>(`/my/badge/${badgeId}`, false, "GET", undefined, token)
      .then((res) => {
        setBadge(res.data);
      })
      .catch(() => {
        return navigate("/badges");
      });
  }, [token]);

  useEffect(() => {
    getBadge();
  }, [getBadge]);

  return (
    <div className={"w-full flex flex-col gap-8 mb-24"}>
      <TopBar
        title={`Badge de ${badge?.name || "ville"}`}
        hasReturn={true}
        prevPage="/badges"
      />
      <div
        className={
          "w-full relative badge-display flex flex-col items-center mb-24"
        }
      >
        <div
          data-loading={loading}
          className={`w-60 cursor-pointer relative badge-cover badge-${
            side ? "reverse" : "front"
          } data-[loading=true]:bg-alabaster-800 data-[loading=true]:animate-pulse min-h-badge rounded-lg`}
          onClick={() => {
            if (!badge || badge?.oneSided) return;
            setSide(!side);
            medalDing.play();
          }}
        >
          {badge ? (
            <>
              <img
                className="w-full h-full relative"
                src={badge.url}
                alt={`Badge de ${badge.region}`}
                onLoad={() => {
                  setLoading(false);
                  setSide(false);
                }}
                loading="eager"
              />
              {!badge.oneSided ? (
                <img
                  className="w-full h-full absolute top-0 side-cover"
                  src={badge.url_cover}
                  alt={`Badge de ${badge.name}`}
                  loading="eager"
                />
              ) : null}
            </>
          ) : null}
        </div>
        {badge ? (
          <>
            <p className="text-3xl mt-4 mb-4 font-bold text-center">
              {side ? badge.region : badge.name}
            </p>
            <p className="text-base w-90 leading-7">
              {side ? badge.description_region : badge.description}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default BadgePage;
