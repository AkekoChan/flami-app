import UpdateForm from "../../components/profile/UpdateForm";
import TopBar from "../../components/topbar/TopBar";
import { useTheme } from "../../hooks/useTheme";

const AccountPage = () => {
  const { setShowNav } = useTheme();
  setShowNav(true);
  return (
    <div className="flex flex-col gap-8 mb-24">
      <TopBar title="Mon compte" hasReturn={true} prevPage="/profile" />
      <UpdateForm />
    </div>
  );
};

export default AccountPage;
