import { fetcher, getPools } from "@/lib/actions/coingecko.actions";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatPercentage, timeAgo } from "@/lib/utils";
import LiveDataWrapper from "@/components/LiveDataWrapper";
import Converter from "@/components/Converter";
import DataTable from "@/components/DataTable";
import Image from "next/image";
import { cn } from "@/lib/utils";
import GainersAndLosers from "@/components/home/GainersAndLosers";

const page = async ({ params }: NextPageProps) => {
  const { id } = await params;

  const [coinData, coinOHLCData, exchangeData, topGainersLosersData] =
    await Promise.all([
      fetcher<CoinDetailsData>(`/coins/${id}`, {
        dex_pair_format: "contract_address",
      }),
      fetcher<OHLCData[]>(`/coins/${id}/ohlc`, {
        vs_currency: "usd",
        days: 1,
        interval: "hourly",
        precision: "full",
      }),
      fetcher<ExchangeData>(`/coins/${id}/tickers`, {
        order: "volume_desc",
      }),
      fetcher<TopCell>("/coins/top_gainers_losers", {
        vs_currency: "usd",
        price_change_percentage: "24h",
      }),
    ]);

  const platform = coinData.asset_platform_id
    ? coinData.detail_platforms?.[coinData.asset_platform_id]
    : null;

  const network = platform?.geckoterminal_url.split("/")[3] || null;

  const contractAddress = platform?.contract_address || null;

  const pool: PoolData = await getPools(id, network, contractAddress);

  const coinDetails = [
    {
      label: "Market Cap",
      value: formatCurrency(coinData.market_data.market_cap.usd),
    },
    { label: "Market Cap Rank", value: `#${coinData.market_cap_rank}` },
    {
      label: "Total Volume",
      value: formatCurrency(coinData.market_data.total_volume.usd),
    },
    {
      label: "Website",
      value: "-",
      link: coinData.links.homepage[0],
      linkText: "Homepage",
    },
    {
      label: "Explorer",
      value: "-",
      link: coinData.links.blockchain_site[0],
      linkText: "Explorer",
    },
    {
      label: "Community",
      value: "-",
      link: coinData.links.subreddit_url,
      linkText: "Community",
    },
  ];

  const exchangeColumn: DataTableColumn<Tickers>[] = [
    {
      header: "Exchange",
      cell: (ticker) => (
        <Link href={ticker.trade_url}>
          <p>{ticker.market.name}</p>
        </Link>
      ),
      cellClassName: "exchange-name",
    },
    {
      header: "Pair",
      cell: (ticker) => (
        <div className="pair">
          <p>{ticker.base.slice(0, 4)}</p>
          <p>/</p>
          <p>{ticker.target.slice(0, 4)}</p>
        </div>
      ),
    },
    {
      header: "Price",
      cell: (ticker) => formatCurrency(ticker.last),
      cellClassName: "price-cell",
    },
    {
      header: "Last Traded",
      cell: (ticker) => timeAgo(ticker.last_traded_at),
      cellClassName: "time-cell",
      headClassName: "text-end",
    },
  ];

  return (
    <main id="coin-details-page">
      <section className="primary">
        <LiveDataWrapper
          coinId={id}
          poolId={pool.id}
          coin={coinData}
          coinOHLCData={coinOHLCData}
        >
          <div className="exchange-section">
            <h4>Exchange Listings</h4>
            <DataTable
              data={exchangeData.tickers?.slice(0, 6)}
              columns={exchangeColumn}
              rowKey={(_, index) => index}
              tableClassName="exchange-table"
            />
          </div>
        </LiveDataWrapper>
      </section>
      <section className="secondary">
        <Converter
          symbol={coinData.symbol}
          icon={coinData.image.small}
          priceList={coinData.market_data.current_price}
        />
        <div className="details">
          <h4>Coin Details</h4>
          <ul className="details-grid">
            {coinDetails.map(({ label, value, link, linkText }, index) => (
              <li key={index}>
                <p>{label}</p>
                {link ? (
                  <div className="link">
                    <Link href={link} target="_blank">
                      {linkText || label}
                    </Link>
                    <ArrowUpRight size={16} />
                  </div>
                ) : (
                  <p className="text-base font-medium">{value}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <GainersAndLosers data={topGainersLosersData}/>
        </div>
      </section>
    </main>
  );
};

export default page;
