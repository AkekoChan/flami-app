import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Badge } from "../../interfaces/badge.interface";

const BadgesListDisplay = ({ badges }: { badges: Badge[] | undefined }) => {
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    shown: { opacity: 0.5, scale: 1, filter: "grayscale(75%)" },
    owned: { opacity: 1, scale: 1 },
  };

  const navigate = useNavigate();

  return (
    <>
      <section className="w-full flex flex-col gap-4">
        <div className="w-full grid grid-cols-3">
          {badges &&
            badges
              .sort((badge1, badge2) =>
                badge1.owned ? -1 : badge2.owned ? 1 : 0
              )
              .map((badge: Badge, index) =>
                badge.owned ? (
                  <div className="" key={index}>
                    <motion.img
                      variants={badgeVariants}
                      initial="hidden"
                      animate="owned"
                      onClick={() => navigate(`/badge/${badge.id}`)}
                      className="block w-full h-full object-contain cursor-pointer"
                      src={badge.url}
                      alt={`Badge de ${badge.name}`}
                      key={index}
                      loading="eager"
                    />
                  </div>
                ) : (
                  <div className="" key={index}>
                    <motion.img
                      variants={badgeVariants}
                      initial="hidden"
                      animate="shown"
                      className="block w-full h-full object-contain grayscale opacity-50 cursor-not-allowed"
                      src={badge.url}
                      alt={`Badge de ${badge.name}`}
                      key={index}
                      loading="eager"
                    />
                  </div>
                )
              )}
        </div>
      </section>
    </>
  );
};

export default BadgesListDisplay;
