import { useCallback, useEffect, useState } from "react";
import FlamiShow from "../../components/flami/FlamiShow";
import TopBar from "../../components/topbar/TopBar";
import { useAuth } from "../../hooks/useAuth";
import { APIHandler } from "../../utils/api/api-handler";
import { Flami, FlamiData } from "../../interfaces/flami.interface";
import { Cosmetic } from "../../interfaces/cosmetic.interface";
import { Button } from "../../components/ui";
import { ArrowLeftIcon, ArrowRightIcon } from "react-line-awesome";
import head from "../../../public/assets/img/icons/face.svg";

const CosmeticPage = () => {
  const [flami, setFlami] = useState<Flami>();
  const [cosmetics, setCosmetics] = useState<Cosmetic[][]>();
  const [displayCosmetic, setDisplayCosmetic] = useState<Cosmetic[] | null>();
  const { token } = useAuth();
  const [displayIndex, setDisplayIndex] = useState(0);

  const getFlami = useCallback(() => {
    APIHandler<FlamiData>("/my/flami", false, "GET", undefined, token).then(
      (res) => {
        setFlami(res.data);
      }
    );
  }, [token]);

  const selectDisplayCosmetics = useCallback(() => {
    switch (displayIndex) {
      case 0:
        setDisplayCosmetic(cosmetics?.head);
        break;

      case 1:
        setDisplayCosmetic(cosmetics?.hands);
        break;

      case 2:
        setDisplayCosmetic(cosmetics?.feet);
        break;

      case 3:
        setDisplayCosmetic(cosmetics?.back);
        break;

      default:
        break;
    }
  }, [displayIndex, cosmetics]);

  const getCosmetics = useCallback(() => {
    APIHandler<Cosmetic[]>(
      "/my/cosmetics",
      false,
      "GET",
      undefined,
      token
    ).then((res) => {
      setCosmetics(res.data.cosmetics);
    });
  }, [token]);

  useEffect(() => {
    getFlami();
    getCosmetics();
    setDisplayCosmetic();
  }, [getFlami, getCosmetics, setDisplayCosmetic]);

  console.log(flami);

  return (
    <section className="flex flex-col gap-6 mb-24">
      <TopBar title="Modifier mon flami" hasReturn={true} prevPage="/" />
      <FlamiShow flami={flami} />
      <div className="grid grid-cols-3 gap-4 w-full">
        <Button
          variant={"secondary"}
          className="scale-75"
          onClick={() => {
            if (displayIndex <= 0) {
              setDisplayIndex(4);
            } else {
              setDisplayIndex(displayIndex - 1);
            }
            selectDisplayCosmetics();
          }}
        >
          <ArrowLeftIcon className="text-3xl text-alabaster-50" />
        </Button>
        <img src={head} alt="Face" className="w-full scale-75" />
        <Button
          variant={"secondary"}
          className="scale-75"
          onClick={() => {
            if (displayIndex >= 4) {
              setDisplayIndex(0);
            } else {
              setDisplayIndex(displayIndex + 1);
            }
            selectDisplayCosmetics();
          }}
        >
          <ArrowRightIcon className="text-3xl text-alabaster-50" />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {displayCosmetic?.map((cosmetic: Cosmetic, index) =>
          cosmetic &&
          flami?.cosmetics.findIndex((item) => item.id === cosmetic.id) ===
            -1 ? (
            <Button key={index} variant={"secondary"}>
              <img className="w-full" src={cosmetic.url} alt={cosmetic.name} />
            </Button>
          ) : null
        )}
      </div>
    </section>
  );
};

export default CosmeticPage;
