import React from "react";

const CategoriesSkeleton = () => {
  return (
    <div id="categories" className="animate-pulse custom-scrollbar">
      {/* Title Skeleton */}
      <div className="h-6 w-32 skeleton ml-4 mb-4" />

      {/* Table */}
      <div className="mt-3">
        {/* Table Header Skeleton */}
        <div className="flex bg-dark-400 py-4 px-5 rounded-t-lg">
          <div className="h-4 w-24 skeleton flex-1" />
          <div className="h-4 w-24 skeleton flex-1" />
          <div className="h-4 w-24 skeleton flex-1" />
          <div className="h-4 w-24 skeleton flex-1" />
          <div className="h-4 w-24 skeleton flex-1" />
        </div>

        {/* Table Rows Skeleton */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="flex items-center py-4 px-5 border-b border-purple-100/5"
          >
            {/* Category Name */}
            <div className="flex-1">
              <div className="h-4 w-28 skeleton" />
            </div>

            {/* Top Gainers (3 coin images) */}
            <div className="flex-1 flex gap-1">
              <div className="w-7 h-7 rounded-full skeleton" />
              <div className="w-7 h-7 rounded-full skeleton" />
              <div className="w-7 h-7 rounded-full skeleton" />
            </div>

            {/* 24h Change */}
            <div className="flex-1">
              <div className="h-4 w-16 skeleton" />
            </div>

            {/* Market Cap */}
            <div className="flex-1">
              <div className="h-4 w-24 skeleton" />
            </div>

            {/* 24h Volume */}
            <div className="flex-1">
              <div className="h-4 w-24 skeleton" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSkeleton;
