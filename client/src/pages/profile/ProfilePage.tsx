import { useCallback, useEffect, useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import { Button, LinkComponent } from "../../components/ui";
import { useAuth } from "../../hooks/useAuth";
import { APIHandler } from "../../utils/api/api-handler";
import { User } from "../../interfaces/user.interface";
import { getReadableDate } from "../../utils/getReadableDate";
import BadgeDisplay from "../../components/profile/BadgeDisplay";

const ProfilePage = () => {
  const { signout, token } = useAuth();
  const [user, setUser] = useState<User>();

  const getUser = useCallback(() => {
    APIHandler<User>("/my/profile", false, "GET", undefined, token).then(
      (res) => {
        setUser(res.data);
      }
    );
  }, [token]);

  useEffect(() => {
    getUser();
  }, [getUser]);
  console.log(user?.badges);

  return (
    <div className="flex flex-col gap-8">
      <TopBar title="Mon profil" hasReturn={false} prevPage="" />
      <div className="flex flex-col gap-6">
        {user && (
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-bold">{user.name}</h3>
            <p className="text-alabaster-400">{user.email}</p>
            <p>inscrit le {getReadableDate(user.created_at)}</p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <LinkComponent variant={"primary"} to={"/account"}>
            Modifier mon compte
          </LinkComponent>
          <Button variant={"tertiary"} onClick={signout}>
            Se déconnecter
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-bold">Mes badges</h3>
        <div className="flex justify-between">
          {user && user.badges?.length !== 0 ? (
            user.badges?.map((badge) => (
              <BadgeDisplay badge={badge}></BadgeDisplay>
            ))
          ) : (
            <p>Tu n'as pas de badges !</p>
          )}
        </div>
        <LinkComponent
          to={"/badges"}
          variant={`${user?.badges?.length === 0 ? "disabled" : "primary"}`}
        >
          Voir tous mes badges
        </LinkComponent>
      </div>
    </div>
  );
};

export default ProfilePage;