import DataTable from "@/components/DataTable";
import { fetcher } from "@/lib/actions/coingecko.actions";
import Image from "next/image";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CoinsPagination from "@/components/home/CoinsPagination";

const Coins = async ({ searchParams }: NextPageProps) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const perPage = 10;

  const coinsData = await fetcher<CoinMarketData[]>("/coins/markets", {
    vs_currency: "usd",
    per_page: perPage,
    page: currentPage,
  });

  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: "Rank",
      cell: (coin) => (
        <>
          #{coin.market_cap_rank}
          <Link href={`/coins/${coin.id}`} aria-label="View Coin" />
        </>
      ),
      cellClassName: "rank-cell",
    },
    {
      header: "Token",
      cell: (coin) => (
        <div className="token-info w-fit">
          <Image src={coin.image} alt={coin.name} width={36} height={36} />
          <p>
            {coin.name} ({coin.symbol.toUpperCase()})
          </p>
        </div>
      ),
      cellClassName: "token-cell",
    },
    {
      header: "Price",
      cell: (coin) => formatCurrency(coin.current_price),
      cellClassName: "price-cell",
    },
    {
      header: "24h Change",
      cell: (coin) => {
        const isTrendingUp = coin.market_cap_change_percentage_24h > 0;
        return (
          <span
            className={cn(
              "change-value",
              isTrendingUp ? "text-green-500" : "text-red-500",
            )}
          >
            {isTrendingUp && "+"}
            {formatPercentage(coin.market_cap_change_percentage_24h)}
          </span>
        );
      },
      cellClassName: "change-cell",
    },
    {
      header: "Market Cap",
      cell: (coin) => formatCurrency(coin.market_cap),
      cellClassName: "market-cap-cell",
    },
  ];

  const hasMorePages = coinsData.length === perPage;
  const estimatedTotalPages =
    currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100;
  return (
    <main id="coins-page">
      <div className="content">
        <h4>All coins</h4>
        <DataTable
          data={coinsData}
          columns={columns}
          rowKey={(coin) => coin.id}
          tableClassName="coins-table"
        />
        <CoinsPagination
          currentPage={currentPage}
          totalPages={estimatedTotalPages}
          hasMorePages={hasMorePages}
        />
      </div>
    </main>
  );
};

export default Coins;
