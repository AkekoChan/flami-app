const FlamiLocation = () => {
  return (
    <>
      <div className="flex border-3 border-alabaster-400 rounded-xl py-2 px-4 gap-6 justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-alabaster-400">Position actuelle</p>
          <p className="font-bold">Lyon</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-alabaster-400">Département</p>
          <p className="font-bold">Rhônes-Alpes</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-alabaster-400">Ancienne Position</p>
          <p className="font-bold">Lyon</p>
        </div>
      </div>
    </>
  );
};

export default FlamiLocation;
