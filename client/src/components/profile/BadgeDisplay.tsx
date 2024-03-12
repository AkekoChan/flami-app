import { Badge } from "../../interfaces/badge.interface";
import { useState } from "react";

const BadgeDisplay = ({ badge }: { badge: Badge }) => {
    const [side, setSide] = useState(false);
    return (
    <div className={`w-full relative badge-display badge-${side ? "reverse" : "front"}`} onClick={() => setSide(!side)}>
        <img className="w-full absolute side-cover" src={badge.url_cover} alt={`Badge de ${badge.region}`}/>
        <img className="w-full absolute" src={badge.url} alt={`Badge de ${badge.name}`}/>
    </div>
    );
};

export default BadgeDisplay;