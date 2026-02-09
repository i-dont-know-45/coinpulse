import React from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/priceFormatter";
import { fetcher } from "@/lib/actions/coingecko.actions";

const CoinOverview = async () => {
  const coin = await fetcher<CoinDetailsData>("/coins/bitcoin", {
    dex_pair_format: "symbol",
  });
  return (
    <div id="coin-overview">
      <div className="header">
        <Image src={coin.image.small} width={56} height={56} alt={coin.name} />
        <div className="info">
          <p>
            {coin.name} / {coin.symbol.toUpperCase()}
          </p>
          <h1>{formatPrice(coin.market_data.current_price.usd)}</h1>
        </div>
      </div>
    </div>
  );
};

export default CoinOverview;
