import CoinOverview from "@/components/home/CoinOverview";
import CoinOverviewSkeleton from "@/components/home/CoinOverviewSkeleton";
import TrendingCoins from "@/components/home/TrendingCoins";
import Categories from "@/components/home/Categories";
import CategoriesSkeleton from "@/components/home/CategoriesSkeleton";
import TrendingCoinsSkeleton from "@/components/home/TrendingCoinsSkeleton";
import { Suspense } from "react";

const page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewSkeleton />}>
          <CoinOverview />
        </Suspense>
        <Suspense fallback={<TrendingCoinsSkeleton />}>
          <TrendingCoins />
        </Suspense>
      </section>
      <section className="w-full mt-7">
        <Suspense fallback={<CategoriesSkeleton />}>
          <Categories />
        </Suspense>
      </section>
    </main>
  );
};

export default page;
