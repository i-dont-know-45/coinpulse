import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Time } from "lightweight-charts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertOHLCData(data: OHLCData[]) {
  return data
    .map((d) => ({
      time:  Math.floor(d[0] / 1000) as Time, // ensure seconds, not ms
      open: d[1],
      high: d[2],
      low: d[3],
      close: d[4],
    }))
    .filter(
      (item, index, arr) => index === 0 || item.time !== arr[index - 1].time,
    );
}

/**
 * Formats a price number into a human-readable string with proper currency formatting
 * @param price - The price number to format
 * @param currency - The currency symbol (default: '$')
 * @returns Formatted price string
 */
export function formatCurrency(price: number, currency: string = "$"): string {
  if (!Number.isFinite(price) || price < 0) return `${currency}—`;
  if (price === 0) return `${currency}0.00`;

  // For very small prices (less than 0.01)
  if (price < 0.01) {
    return `${currency}${price.toFixed(8).replace(/\.?0+$/, "")}`;
  }

  // For prices less than 1
  if (price < 1) {
    return `${currency}${price.toFixed(4).replace(/\.?0+$/, "")}`;
  }

  // For prices 1 and above
  return `${currency}${price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
