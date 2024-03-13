import TopBar from "../../components/topbar/TopBar";

const AllBadges = () => {
  return (
    <div className="flex flex-col gap-8">
      <TopBar title="Mon compte" hasReturn={true} prevPage="/profile" />
    </div>
  );
};

export default AllBadges;
