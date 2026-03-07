"use client";
import Image from "next/image";
import { formatCurrency, cn, formatPercentage } from "@/lib/utils";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useState } from "react";

export const GainersAndLosers = ({ data }: { data: TopCell }) => {
  const [cell, setCell] = useState<"G" | "L">("G");
  const handleGainersAndLosers = (gl: "G" | "L") => {
    if (cell === gl) return;
    setCell(gl);
  };
  return (
    <div>
      <div className="w-full mt-8 flex grid grid-cols-2 justify-start">
        <button
          onClick={() => handleGainersAndLosers("G")}
          className={cn({ "text-gray-500 cursor-pointer": cell !== "G" })}
        >
          <h4 className="text-xl md:text-2xl font-semibold mb-2 text-start">
            Top Gainers
          </h4>
        </button>
        <button
          onClick={() => handleGainersAndLosers("L")}
          className={cn({ "text-gray-500 cursor-pointer": cell !== "L" })}
        >
          <h4 className="text-xl md:text-2xl font-semibold mb-2 text-start">
            Top Losers
          </h4>
        </button>
      </div>
      <div>
        <div className="mt-5">
          <ul className="grid grid-cols-1 gap-5">
            {(cell === "G"
              ? data?.top_gainers?.slice(0, 4)
              : data?.top_losers?.slice(0, 4)
            ).map((gainer) => (
              <li key={gainer.id}>
                <div className="flex justify-between px-5 py-3 bg-dark-400/50 rounded-lg items-center">
                  <div className="flex flex-row items-center gap-3">
                    <div>
                      <Image
                        src={gainer.image}
                        alt={gainer.name}
                        width={32}
                        height={32}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="flex flex-col text-base gap-1.5">
                      <p className="font-medium">{gainer.name}</p>
                      <p className="text-[10px] text-purple-100 font-semibold">
                        {gainer.id.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end font-medium text-base gap-1.5">
                    <div className="text-sm font-bold">
                      <p>{formatCurrency(gainer.usd)}</p>
                    </div>
                    <div
                      className={cn("flex items-center gap-1", {
                        "text-green-500": gainer.usd_24h_change >= 0,
                        "text-red-500": gainer.usd_24h_change < 0,
                      })}
                    >
                      {gainer.usd_24h_change > 0 ? (
                        <ArrowUpRight width={10} height={10} />
                      ) : (
                        <ArrowDownLeft width={10} height={10} />
                      )}
                      <p className="text-xs">
                        {formatPercentage(gainer.usd_24h_change)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GainersAndLosers;
