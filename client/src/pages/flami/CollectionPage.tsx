import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { APIHandler } from "../../utils/api/api-handler";
import { Flami } from "../../interfaces/flami.interface";
import FlamiDisplay from "../../components/flami/FlamiDisplay";
import TopBar from "../../components/topbar/TopBar";

const CollectionPage = () => {
  const { token } = useAuth();
  const [collection, setCollection] = useState<Flami[]>([]);
  const getCollection = useCallback(() => {
    APIHandler<Flami[]>("/my/collection", false, "GET", undefined, token).then(
      (res) => {
        setCollection(res.data);
      }
    );
  }, [token]);

  useEffect(() => {
    getCollection();
  }, [getCollection]);

  return (
    <section className="flex flex-col gap-6 mb-24">
      <TopBar title="Ta collection de Flamis" hasReturn={false} prevPage="" />
      <div className="grid grid-cols-3 gap-6 w-full text-xs">
        { collection?.map(flami => (
          <FlamiDisplay isSelf={false} animation="Idle" flami={flami}></FlamiDisplay>
        )) }
      </div>
    </section>
  );
};

export default CollectionPage;
