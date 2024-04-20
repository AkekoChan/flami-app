import TopBar from "../../components/topbar/TopBar";

const ThanksPage = () => {
  return (
    <div className="flex flex-col gap-8 mb-24">
      <TopBar title="Remerciements" hasReturn={true} prevPage="/account" />
      <div className="flex flex-col gap-4">
        <p className="text-alabaster-50">
          Toute l'équipe de <b>Flami</b> tient à remercier sincèrement l'IUT
          d'Angoulême pour la formation que nous avons pu suivre.
        </p>
        <p className=" text-alabaster-50">
          Nos professeurs et intervenants qui nous ont suivis ou aidés tout au
          long de ce projet :
        </p>
        <ul className="max-w-md space-y-1 text-tree-poppy-500 list-disc list-inside ps-4">
          <li>Mme Chaulet</li>
          <li>M. Bariet</li>
          <li>M. Burn</li>
          <li>Mme Delayre</li>
          <li>M. Gaillard</li>
          <li>M. Bachir</li>
        </ul>
        <p className="text-alabaster-50">
          Les étudiants de création numérique qui nous ont réalisé l'ensemble
          des éléments graphiques de l'application :
        </p>
        <ul className="max-w-md space-y-1 text-tree-poppy-500 list-disc list-inside ps-4">
          <li>Paul</li>
          <li>Ryian</li>
          <li>Laura</li>
        </ul>
      </div>
    </div>
  );
};

export default ThanksPage;
