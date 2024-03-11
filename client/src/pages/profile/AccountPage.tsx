import UpdateForm from "../../components/profile/UpdateForm";
import TopBar from "../../components/topbar/TopBar";

const AccountPage = () => {
  return (
    <div>
      <TopBar title="Mon compte" hasReturn={true} />
      <UpdateForm />
    </div>
  );
};

export default AccountPage;
