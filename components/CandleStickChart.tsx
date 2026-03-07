"use client";
import { useState, useRef, useTransition, useEffect } from "react";
import {
  getCandlestickConfig,
  getChartConfig,
  PERIOD_BUTTONS,
  PERIOD_CONFIG,
  LIVE_INTERVAL_BUTTONS,
} from "@/constant";
import { convertOHLCData } from "@/lib/utils";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  CandlestickSeries,
} from "lightweight-charts";
import { fetcher } from "@/lib/actions/coingecko.actions";

const CandleStickChart = ({
  children,
  data,
  coinId,
  height = 360,
  liveOhlcv = null,
  mode = "historical",
  liveInterval,
  setLiveInterval,
  initialPeriod = "daily",
}: CandleStickChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick">>(null);
  const prevOhlcDataLength = useRef<number>(data?.length || 0);

  const [period, setPeriod] = useState(initialPeriod);
  const [ohlcData, setohlcData] = useState<OHLCData[]>(data ?? []);
  const [isPending, StartTransition] = useTransition();

  const fetchOHLCData = async (selectedPeriod: Period) => {
    try {
      const { days, interval } = PERIOD_CONFIG[selectedPeriod];
      const newData = await fetcher<OHLCData[]>(`/coins/${coinId}/ohlc`, {
        vs_currency: "usd",
        days,
        interval,
        precision: "full",
      });
      setohlcData(newData ?? []);
    } catch (error) {
      console.error("Error fetching OHLC data:", error);
    }
  };

  const handlePeriodChange = (newPeriod: Period) => {
    if (newPeriod === period) return;
    StartTransition(async () => {
      setPeriod(newPeriod);
      await fetchOHLCData(newPeriod);
    });
  };

  useEffect(() => {
    const container = chartContainerRef.current;

    if (!container) return;

    const showTime = true;

    const chart = createChart(container, {
      ...getChartConfig(height, showTime),
      width: container.clientWidth,
    });
    const series = chart.addSeries(CandlestickSeries, getCandlestickConfig());
    const convertedToSeconds = ohlcData.map(
      (item) =>
        [
          Math.floor(item[0] / 1000),
          item[1],
          item[2],
          item[3],
          item[4],
        ] as OHLCData,
    );
    series.setData(convertOHLCData(convertedToSeconds));
    chart.timeScale().fitContent();

    chartRef.current = chart;
    candleSeriesRef.current = series;

    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      chart.applyOptions({
        width: entries[0].contentRect.width,
        height: entries[0].contentRect.height,
      });
    });

    observer.observe(container);
    return () => {
      observer.disconnect();
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
    };
  }, [height]);

  useEffect(() => {
    if (!candleSeriesRef.current) return;
    const convertedToSeconds = ohlcData.map(
      (item) =>
        [
          Math.floor(item[0] / 1000),
          item[1],
          item[2],
          item[3],
          item[4],
        ] as OHLCData,
    );
    let merged: OHLCData[];
    if (liveOhlcv) {
      const lastCandle = convertedToSeconds[convertedToSeconds.length - 1];
      if (lastCandle && lastCandle[0] == liveOhlcv[0]) {
        merged = [...convertedToSeconds.slice(0, -1), liveOhlcv];
      } else {
        merged = [...convertedToSeconds, liveOhlcv];
      }
    } else {
      merged = convertedToSeconds;
    }

    merged.sort((a, b) => a[0] - b[0]);
    candleSeriesRef.current.setData(convertOHLCData(merged));
    const dataChanged = prevOhlcDataLength.current !== ohlcData.length;
    if (dataChanged || mode === "historical") {
      chartRef.current?.timeScale().fitContent();
      prevOhlcDataLength.current = ohlcData.length;
    }
  }, [ohlcData, period, liveOhlcv, mode]);

  return (
    <div id="candlestick-chart">
      <div className="chart-header">
        <div>{children}</div>
          <div className="button-group">
            <span className="text-sm font-medium text-purple-100/50 mx-2">
              Period:
            </span>
            {PERIOD_BUTTONS.map(({ value, label }) => (
              <button
                key={value}
                className={
                  value === period ? "config-button-active" : "config-button"
                }
                onClick={() => handlePeriodChange(value)}
                disabled={isPending}
              >
                {label}
              </button>
            ))}
          </div>
          {liveInterval && (
            <div className="button-group">
              <span className="text-sm font-medium text-purple-100/50 mx-2">
                Update Frequency:
              </span>
              {LIVE_INTERVAL_BUTTONS.map(({ value, label }) => (
                <button
                  key={value}
                  className={
                    value === liveInterval
                      ? "config-button-active"
                      : "config-button"
                  }
                  onClick={() => setLiveInterval && setLiveInterval(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      <div ref={chartContainerRef} className="chart" />
    </div>
  );
};

export default CandleStickChart;
