import UpdateForm from "../../components/profile/UpdateForm";
import TopBar from "../../components/topbar/TopBar";

const AccountPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <TopBar title="Mon compte" hasReturn={true} prevPage="/profile" />
      <UpdateForm />
    </div>
  );
};

export default AccountPage;
