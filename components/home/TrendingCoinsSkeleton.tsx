import React from "react";

const TrendingCoinsSkeleton = () => {
  return (
    <div id="trending-coins" className="animate-pulse">
      <div className="h-8 w-48 skeleton mx-5 mb-4" />
      <div className="px-5 space-y-4">
        {/* Table Header Skeleton */}
        <div className="flex justify-between border-b border-dark-400 pb-2">
          <div className="h-4 w-20 skeleton" />
          <div className="h-4 w-20 skeleton" />
          <div className="h-4 w-20 skeleton" />
        </div>
        {/* Table Rows Skeleton */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex justify-between items-center py-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full skeleton" />
              <div className="h-4 w-24 skeleton" />
            </div>
            <div className="h-4 w-16 skeleton" />
            <div className="h-4 w-20 skeleton" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCoinsSkeleton;
