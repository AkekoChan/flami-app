import { useCallback, useState, useEffect } from "react";
import TopBar from "../../components/topbar/TopBar";
import { APIHandler } from "../../utils/api/api-handler";
import { useAuth } from "../../hooks/useAuth";
import { Badge } from "../../interfaces/badge.interface";
import { useTheme } from "../../hooks/useTheme";
import BadgesListDisplay from "../../components/profile/BadgesListDisplay";

const AllBadgesPage = () => {
  const { token } = useAuth();
  const { setShowNav } = useTheme();
  const [badges, setBadges] = useState<Badge[]>();
  setShowNav(true);

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
    <div className="w-full flex flex-col gap-8 mb-24">
      <TopBar title="Tes badges" hasReturn={true} prevPage="/profile" />
      <div className="grid grid-cols-1 gap-4 w-full">
        <BadgesListDisplay
            badges={badges}
          ></BadgesListDisplay>
      </div>
    </div>
  );
};

export default AllBadgesPage;
