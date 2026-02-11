import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { fetcher } from "@/lib/actions/coingecko.actions";
import CoinOverviewSkeleton from "@/components/home/CoinOverviewSkeleton";
import CandleStickChart from "./CandleStickChart";

const CoinOverview = async () => {
  let coin, coinOHLCData;
  try {
    [coin, coinOHLCData] = await Promise.all([
      fetcher<CoinDetailsData>("/coins/bitcoin", {
        dex_pair_format: "symbol",
      }),
      fetcher<OHLCData[]>("/coins/bitcoin/ohlc", {
        vs_currency: "usd",
        days: 1,
        interval: "hourly",
        precision: "full",
      }),
    ]);
  } catch (error) {
    console.error("Error fetching coin overview:", error);
    return <CoinOverviewSkeleton />;
  }
  return (
    <div id="coin-overview">
      <CandleStickChart data={coinOHLCData} coinId={coin.id}>
        <div className="header">
          <Image
            src={coin.image.small}
            width={56}
            height={56}
            alt={coin.name}
          />
          <div className="info">
            <p>
              {coin.name} / {coin.symbol.toUpperCase()}
            </p>
            <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
          </div>
        </div>
      </CandleStickChart>
    </div>
  );
};

export default CoinOverview;
