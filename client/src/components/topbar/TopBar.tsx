import { ArrowLeftIcon } from "react-line-awesome";
import { useNavigate } from "react-router";

const TopBar = ({
  title,
  hasReturn,
}: {
  title: string;
  hasReturn: boolean;
}) => {
  const navigate = useNavigate();
  const handlePrevPage = () => {
    navigate(-1);
  };
  return (
    <div className="flex items-center gap-4">
      <ArrowLeftIcon
        className={`text-3xl text-alabaster-50 cursor-pointer px-2 py-1 hover:bg-alabaster-300/20 rounded-xl ease-out duration-100 ${
          hasReturn ? "block" : "hidden"
        }`}
        component="span"
        role="button"
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Enter") {
            handlePrevPage();
          }
        }}
        aria-label="Retour"
        aria-hidden="false"
        onClick={handlePrevPage}
      />
      <h1 className="font-roboto text-xl font-bold">{title}</h1>
    </div>
  );
};

export default TopBar;
