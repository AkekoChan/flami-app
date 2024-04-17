import { useState } from "react";

const Tooltip = ({ text }: { text: string }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative self-end">
      <div
        role="tooltip"
        tabIndex={0}
        className="bg-tree-poppy-500 text-alabaster-950 text-lg font-semibold rounded-full w-8 h-8 flex justify-center items-center cursor-pointer hover:brightness-90"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-describedby="tooltip"
      >
        ?
      </div>
      {showTooltip && (
        <span
          id="tooltip"
          className="absolute bottom-11 right-0 bg-alabaster-600 px-3 py-1.5 rounded-xl w-56"
        >
          {text}
          <span className="absolute h-0 w-0 border-x-8 border-x-transparent border-b-[16px] border-b-alabaster-600 rotate-180 -bottom-3 right-2 "></span>
        </span>
      )}
    </div>
  );
};

export default Tooltip;
