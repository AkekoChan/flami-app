import { useNavigate } from "react-router";
import { Badge } from "../../interfaces/badge.interface";
import { motion } from "framer-motion";

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
            badges.map((badge: Badge, index) =>
              badge.owned ? (
                <motion.img
                  variants={badgeVariants}
                  initial="hidden"
                  animate="owned"
                  onClick={() => navigate(`/badge/${badge.id}`)}
                  className="block w-full cursor-pointer"
                  src={badge.url}
                  alt={`Badge de ${badge.name}`}
                  key={index}
                  loading="eager"
                />
              ) : (
                <motion.img
                  variants={badgeVariants}
                  initial="hidden"
                  animate="shown"
                  className="block w-full grayscale opacity-50 cursor-not-allowed"
                  src={badge.url}
                  alt={`Badge de ${badge.name}`}
                  key={index}
                  loading="eager"
                />
              )
            )}
        </div>
      </section>
    </>
  );
};

export default BadgesListDisplay;
