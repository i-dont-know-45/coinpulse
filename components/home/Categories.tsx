import React from "react";
import DataTable from "../DataTable";
import { fetcher } from "@/lib/actions/coingecko.actions";
import { cn, formatPercentage } from "@/lib/utils";
import Image from "next/image";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const Categories = async () => {
  const categories = await fetcher<Category[]>("/coins/categories");
  const columns: DataTableColumn<Category>[] = [
    {
      header: "Category",
      cell: (category) => category.name,
      cellClassName: "category-cell",
    },
    {
      header: "Top Gainers",
      cell: (category) =>
        category.top_3_coins.map((coin, k) => (
          <Image src={coin} key={k} width={28} height={28} alt={coin} />
        )),
      cellClassName: "top-gainers-cell",
    },
    {
      header: "24h Change",
      cellClassName: "change-header-cell",
      cell: (category) => {
        const isTrendingUp = category.market_cap_change_24h > 0;
        return (
          <div className={cn("change-cell",isTrendingUp ? "text-green-500" : "text-red-500")}>
            <p className="flex items-center">
              {formatPercentage(category.market_cap_change_24h)}
              {isTrendingUp ? (
                <TrendingUp width={16} height={16} />
              ) : (
                <TrendingDown width={16} height={16} />
              )}
            </p>
          </div>
        );
      },
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: (category) => formatCurrency(category.market_cap),
    },
    {
      header: "24h Volume",
      cellClassName: "volume-cell",
      cell: (category) => formatCurrency(category.volume_24h),
    },
  ];
  return (
    <div id="categories" className="custom-scrollbar">
      <h4>Categories</h4>
      <DataTable
        columns={columns}
        data={categories?.slice(0, 10)}
        rowKey={(_, index) => index}
        tableClassName="mt-3"
      />
    </div>
  );
};

export default Categories;
