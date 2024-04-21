const FlamiLocation = ({ location }: { location: { 
  ville: string;
  dept: string;
  region: string; 
} | undefined}) => {
  return (
    <>
      <div className="grid grid-cols-3 border-3 border-alabaster-400 rounded-xl py-2 px-4 gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-alabaster-400">Position actuelle</p>
          <p className="font-bold">{location?.ville}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-alabaster-400">Département</p>
          <p className="font-bold">{location?.dept}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-alabaster-400">Région</p>
          <p className="font-bold">{location?.region}</p>
        </div>
      </div>
    </>
  );
};

export default FlamiLocation;
