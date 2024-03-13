import { useCallback, useState, useEffect } from "react";
import TopBar from "../../components/topbar/TopBar";
import { APIHandler } from "../../utils/api/api-handler";
import { useAuth } from "../../hooks/useAuth";
import { Badge } from "../../interfaces/badge.interface";
import { ArrowLeftIcon } from "react-line-awesome";
import BadgeDisplay from "../../components/profile/BadgeDisplay";

const AllBadgesPage = () => {
  const { token } = useAuth();
  const [badges, setBadges] = useState<Badge[]>();
  const [infoBadge, setInfoBadge] = useState<Badge | null>();

  const selectBadge = (badge: Badge | null) => {
    infoBadge ? setInfoBadge(null) : setInfoBadge(badge);
  };

  const getBadges = useCallback(() => {
    APIHandler<Badge[]>("/my/badges", false, "GET", undefined, token).then(
      (res) => {
        setBadges(res.data);
      }
    );
  }, [token]);

  useEffect(() => {
    getBadges();
  }, [getBadges]);

  return (
    <div className="w-full flex flex-col gap-8">
      <TopBar title="Mon compte" hasReturn={true} prevPage="/profile" />
      <section className="w-full flex flex-col gap-4">
        <h2 className="text-2xl">Badges villes étapes</h2>
        <div className="w-full grid grid-cols-3">
          {badges &&
            badges.map((badge: Badge) =>
              badge.owned ? (
                <img
                  onClick={() => selectBadge(badge)}
                  className="w-full"
                  src={badge.url}
                  alt={`Badge de ${badge.name}`}
                />
              ) : (
                <img
                  className="w-full grayscale opacity-50"
                  src={badge.url}
                  alt={`Badge de ${badge.name}`}
                />
              )
            )}
        </div>
      </section>
      {infoBadge ? (
        <section className="w-full min-h-dvh fixed top-0 left-0 z-100 flex gap-4 p-8 flex-col items-center bg-alabaster-950">
          <ArrowLeftIcon
            onClick={() => selectBadge(null)}
            className="text-3xl text-alabaster-50 cursor-pointer px-2 py-1 hover:bg-alabaster-300/20 rounded-xl ease-out duration-100 place-self-start"
          />
          <BadgeDisplay badge={infoBadge}></BadgeDisplay>
          <p className="text-2xl font-bold text-center">{infoBadge.name}</p>
          <p className="text-sm text-center">{infoBadge.description}</p>
        </section>
      ) : null}
    </div>
  );
};

export default AllBadgesPage;
