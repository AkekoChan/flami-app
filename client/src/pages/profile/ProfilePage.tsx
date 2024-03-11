import { Button } from "../../components/ui";
import { useAuth } from "../../hooks/useAuth";

const ProfilePage = () => {
  const auth = useAuth();

  return (
    <div>
      <Button variant={"tertiary"} onClick={auth.signout}>
        Se déconnecter
      </Button>
    </div>
  );
};

export default ProfilePage;
