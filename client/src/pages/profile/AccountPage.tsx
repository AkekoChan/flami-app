import UpdateForm from "../../components/profile/UpdateForm";
import TopBar from "../../components/topbar/TopBar";
import { LinkComponent } from "../../components/ui";
import { useTheme } from "../../hooks/useTheme";

const AccountPage = () => {
  const { setShowNav } = useTheme();
  setShowNav(true);
  return (
    <div className="flex flex-col gap-8 mb-24">
      <TopBar title="Mon compte" hasReturn={true} prevPage="/profile" />
      <UpdateForm />
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Confidentialité</h3>
        <div className="flex flex-col gap-4">
          <LinkComponent variant={"secondary"} to="/legal-notices">
            Mentions Légales
          </LinkComponent>
          <LinkComponent variant={"secondary"} to="/thanks">
            Remerciements
          </LinkComponent>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
