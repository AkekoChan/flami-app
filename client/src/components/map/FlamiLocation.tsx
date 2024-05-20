const FlamiLocation = ({ location }: { location: { 
  ville: string;
  dept: string;
  region: string; 
} | undefined}) => {
  return (
    <>
      <div className="flex flex-wrap border-3 border-alabaster-400 rounded-xl py-2 px-4 gap-x-6 gap-y-2 text-base">
        <div className="flex flex-col gap-1">
          <p className="text-alabaster-400 text-balance">Position actuelle</p>
          <p className="font-bold text-balance">{location?.ville}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-alabaster-400 text-balance">Département</p>
          <p className="font-bold text-balance">{location?.dept}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-alabaster-400 text-balance">Région</p>
          <p className="font-bold text-balance">{location?.region}</p>
        </div>
      </div>
    </>
  );
};

export default FlamiLocation;
