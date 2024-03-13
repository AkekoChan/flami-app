import { useCallback, useEffect, useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import { APIHandler } from "../../utils/api/api-handler";
import { useAuth } from "../../hooks/useAuth";

const SharePage = () => {
  const { token } = useAuth();
//   const [flami, setFlami] = useState<Flami>();
//   const navigate = useNavigate();

//   const getFlami = useCallback(() => {
//     APIHandler<Flami>("/my/flami", false, "GET", undefined, token).then(
//       (res) => {
//         setFlami(res.data);
//       }
//     );
//   }, [token]);

//   useEffect(() => {
//     getFlami();
//   }, [getFlami]);

  return (
  <div className="flex flex-col gap-8">
    <TopBar title="Partager Flami" hasReturn={true} prevPage="/" />
  </div>
  );
};

export default SharePage;
