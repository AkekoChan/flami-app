import TopBar from "../../components/topbar/TopBar";

const LegalNoticesPage = () => {
  return (
    <div className="flex flex-col gap-8 mb-24">
      <TopBar title="Mentions légales" hasReturn={true} prevPage="/account" />
      <div className="flex flex-col gap-4">
        <p className="font-bold">En vigueur au 22/03/2024</p>
        <p>
          Conformément aux dispositions des Articles 6-III et 19 de la Loi
          n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie
          numérique, dite L.C.E.N., il est porté à la connaissance des
          utilisateurs et visiteurs, ci-après l'utilisateur, du site{" "}
          <a
            href="https://monflami.fr"
            className="underline text-tree-poppy-500"
          >
            https://monflami.fr
          </a>
          , ci-après le site, les présentes mentions légales.
        </p>
        <p>
          La connexion et la navigation sur le site par l’utilisateur implique
          acceptation intégrale et sans réserve des présentes mentions légales.
        </p>
        <p>
          Ces dernières sont accessibles sur le Site à la rubrique "
          <b>Mentions légales</b>"".
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-xl">ARTICLE 1 - L'EDITEUR</h2>
        <p>
          L’édition et la direction de la publication du site est assurée par :
        </p>
        <ul>
          <li className="font-bold">MARTIN Théo</li>
          <li>12 rue de la République</li>
          <li>17430 Saint-Hippolyte</li>
          <li>06 58 92 77 17</li>
          <li>
            <a
              className="underline text-tree-poppy-500"
              href="mailto: support@monflami.fr"
            >
              support@monflami.fr
            </a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-xl">ARTICLE 2 - L'HEBERGEUR</h2>
        <p>L'hébergeur du site est :</p>
        <ul>
          <li className="font-bold">O2SWITCH</li>
          <li>Chem. des Pardiaux</li>
          <li>63000 Clermont-Ferrand</li>
          <li>04 44 44 60 40</li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-xl">ARTICLE 3 - ACCES AU SITE</h2>
        <p>
          Le site est accessible en tout endroit, 7j/7, 24h/24 sauf cas de force
          majeure, interruption programmée ou non et pouvant découlant d’une
          nécessité de maintenance.
        </p>
        <p>
          En cas de modification, interruption ou suspension du site, l'éditeur
          ne saurait être tenu responsable.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-xl">ARTICLE 4 - COLLECTE DES DONNEES</h2>
        <p>
          Le site assure à l'utilisateur une collecte et un traitement
          d'informations personnelles dans le respect de la vie privée
          conformément à la loi n°78-17 du 6 janvier 1978 relative à
          l'informatique, aux fichiers et aux libertés.
        </p>
        <p>
          En vertu de la loi Informatique et Libertés, en date du 6 janvier
          1978, l'utilisateur dispose d'un droit d'accès, de rectification, de
          suppression et d'opposition de ses données personnelles. L'utilisateur
          exerce ce droit :
        </p>
        <p>
          Par mail, à l'adresse email{" "}
          <a
            className="underline text-tree-poppy-500"
            href="mailto: support@monflami.fr"
          >
            support@monflami.fr
          </a>
        </p>
        <p>
          Toute utilisation, reproduction, diffusion, commercialisation,
          modification de toute ou partie du site, sans autorisation de
          l’Editeur est prohibée et pourra entraînée des actions et poursuites
          judiciaires telles que notamment prévues par le Code de la propriété
          intellectuelle et le Code civil.
        </p>
      </div>
    </div>
  );
};

export default LegalNoticesPage;
