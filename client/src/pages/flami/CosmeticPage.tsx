import { useCallback, useEffect, useState } from "react";
import FlamiShow from "../../components/flami/FlamiShow";
import TopBar from "../../components/topbar/TopBar";
import { useAuth } from "../../hooks/useAuth";
import { APIHandler } from "../../utils/api/api-handler";
import { Flami } from "../../interfaces/flami.interface";
import { Cosmetic } from "../../interfaces/cosmetic.interface";
import { Button } from "../../components/ui";
import face from "../../../public/assets/img/icons/face.svg";
import { ArrowLeftIcon, ArrowRightIcon } from "react-line-awesome";

const CosmeticPage = () => {
  const [flami, setFlami] = useState<Flami>();
  const [Cosmetics, setCosmetics] = useState<Cosmetic[]>();
  const { token } = useAuth();

  const getFlami = useCallback(() => {
    APIHandler<Flami>("/my/flami", false, "GET", undefined, token).then(
      (res) => {
        setFlami(res.data);
      }
    );
  }, [token]);

  const getCosmetics = useCallback(() => {
    APIHandler<Cosmetic[]>(
      "/my/cosmetics",
      false,
      "GET",
      undefined,
      token
    ).then((res) => {
      setCosmetics(res.data);
    });
  }, [token]);

  useEffect(() => {
    getFlami();
    getCosmetics();
  }, [getFlami, getCosmetics]);

  console.log(Cosmetics);

  return (
    <section className="flex flex-col gap-6 mb-24">
      <TopBar title="Modifier mon flami" hasReturn={true} prevPage="/" />
      <FlamiShow flami={flami} />
      <div className="grid grid-cols-3 gap-5 w-full">
        <Button variant={"secondary"} className="w-full">
          <ArrowLeftIcon className="text-3xl text-alabaster-50" />
        </Button>
        <img src={face} alt="Face" className="w-full" />
        <Button variant={"secondary"} className="w-full">
          <ArrowRightIcon className="text-3xl text-alabaster-50" />
        </Button>
      </div>
    </section>
  );
};

export default CosmeticPage;
