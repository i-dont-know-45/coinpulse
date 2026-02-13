const CoinOverviewSkeleton = () => {
  return (
    <div id="coin-overview" className="animate-pulse space-y-5 flex flex-col">
      <div className="header">
        <div className="w-14 h-14 rounded-full skeleton" />
        <div className="info gap-2">
          <div className="h-4 w-24 skeleton" />
          <div className="h-8 w-32 skeleton" />
        </div>
      </div>
      <div className="h-[70%] w-[90%] mx-auto skeleton" />
    </div>
  );
};

export default CoinOverviewSkeleton;
