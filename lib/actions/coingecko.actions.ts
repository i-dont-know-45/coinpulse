"use server";
import qs from "query-string";

const BASE_URL = process.env.COINGECKO_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error("COINGECKO_URL is not defined");
if (!API_KEY) throw new Error("COINGECKO_API_KEY is not defined");

export const fetcher = async <T>(
  endpoint: string,
  params?: QueryParams,
  revalidate: number = 60,
): Promise<T> => {
  try {
    const url = qs.stringifyUrl(
      {
        url: `${BASE_URL}/${endpoint}`,
        query: params,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    );

    const response = await fetch(url, {
      headers: {
        "x-cg-pro-api-key": API_KEY,
        "Content-Type": "application/json",
      } as Record<string, string>,
      next: { revalidate },
    });

    if (!response.ok) {
      const errorBody: CoinGeckoErrorBody | null = await response
        .json()
        .catch(() => null);
      throw new Error(
        `API Error: ${response.status}: ${errorBody?.error || response.statusText}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error("Fetcher error:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Unexpected error: ${String(error)}`);
  }
};
