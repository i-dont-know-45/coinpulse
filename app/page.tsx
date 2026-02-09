import CoinOverview from "@/components/home/CoinOverview";
import CoinOverviewSkeleton from "@/components/home/CoinOverviewSkeleton";
import TrendingCoins from "@/components/home/TrendingCoins";
import TrendingCoinsSkeleton from "@/components/home/TrendingCoinsSkeleton";
import { Suspense } from "react";

const page = async () => {
  return (
    <main className="main-container md:py-12">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewSkeleton />}>
          <CoinOverview />
        </Suspense>
        <Suspense fallback={<TrendingCoinsSkeleton />}>
          <TrendingCoins />
        </Suspense>
      </section>
      <section className="w-full mt-7">
        <p>Categories</p>
      </section>
    </main>
  );
};

export default page;
