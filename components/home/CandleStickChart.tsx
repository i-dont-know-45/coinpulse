"use client";
import { useState, useRef, useTransition, useEffect } from "react";
import {
  getCandlestickConfig,
  getChartConfig,
  PERIOD_BUTTONS,
  PERIOD_CONFIG,
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
  initialPeriod = "daily",
}: CandleStickChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick">>(null);

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

    const showTime = ["daily", "weekly", "monthly"].includes(period);

    const chart = createChart(container, {
      ...getChartConfig(height, showTime),
      width: container.clientWidth,
    });
    const series = chart.addSeries(CandlestickSeries, getCandlestickConfig());

    chartRef.current = chart;
    candleSeriesRef.current = series;

    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      chart.applyOptions({ width: entries[0].contentRect.width });
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
    candleSeriesRef.current.setData(convertOHLCData(ohlcData));
    chartRef.current?.timeScale().fitContent();
  }, [ohlcData, period]);

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
      </div>
      <div ref={chartContainerRef} className="chart" />
    </div>
  );
};

export default CandleStickChart;
