import {
  CandlestickSeriesPartialOptions,
  ChartOptions,
  ColorType,
  DeepPartial,
} from "lightweight-charts";

export const PERIOD_BUTTONS: { value: Period; label: string }[] = [
  { value: "daily", label: "1D" },
  { value: "weekly", label: "1W" },
  { value: "monthly", label: "1M" },
  { value: "3months", label: "3M" },
  { value: "6months", label: "6M" },
  { value: "yearly", label: "1Y" },
  { value: "max", label: "Max" },
];

export const PERIOD_CONFIG: Record<
  Period,
  { days: number | string; interval?: "hourly" | "daily" }
> = {
  daily: { days: 1, interval: "hourly" },
  weekly: { days: 7, interval: "hourly" },
  monthly: { days: 30, interval: "hourly" },
  "3months": { days: 90, interval: "daily" },
  "6months": { days: 180, interval: "daily" },
  yearly: { days: 365 },
  max: { days: "max" },
};

export const CHART_COLORS = {
  background: "#0b1116",
  text: "#8f9fb1",
  grid: "#1a2332",
  border: "#1a2332",
  crosshairVertical: "#ffffff40",
  crosshairHorizontal: "#ffffff20",
  candleUp: "#158A6E",
  candleDown: "#EB1C36",
} as const;


export const getChartConfig = (
  height: number,
  timeVisible: boolean = true,
): DeepPartial<ChartOptions> => ({
  width: 0,
  height,
  layout: {
    background: { type: ColorType.Solid, color: CHART_COLORS.background },
    textColor: CHART_COLORS.text,
    fontSize: 12,
    fontFamily: 'Inter, Roboto, "Helvetica Neue", Arial, sans-serif',
    attributionLogo: false,
  },
  grid: {
    vertLines: { visible: false },
    horzLines: {
      visible: true,
      color: CHART_COLORS.grid,
      style: 2,
    },
  },
  rightPriceScale: {
    borderColor: CHART_COLORS.border,
    scaleMargins: {
      top: 0.1,
      bottom: 0.1,
    },
  },
  leftPriceScale: {
    visible: false,
  },
  timeScale: {
    borderColor: CHART_COLORS.border,
    timeVisible,
    secondsVisible: false,
    tickMarkFormatter: (time: number) => {
      const date = new Date(time * 1000);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    },
  },
  handleScroll: {
    mouseWheel: true,
    pressedMouseMove: true,
    horzTouchDrag: true,
    vertTouchDrag: true,
  },
  handleScale: {
    axisPressedMouseMove: {
      time: true,
      price: true,
    },
    mouseWheel: true,
    pinch: true,
  },
  crosshair: {
    mode: 1,
    vertLine: {
      visible: true,
      labelVisible: true,
      color: CHART_COLORS.crosshairVertical,
      width: 1,
      style: 0,
      labelBackgroundColor: CHART_COLORS.background,
    },
    horzLine: {
      visible: true,
      labelVisible: true,
      color: CHART_COLORS.crosshairHorizontal,
      width: 1,
      style: 0,
      labelBackgroundColor: CHART_COLORS.background,
    },
  },
  localization: {
    priceFormatter: (price: number) =>
      "$" + price.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    timeFormatter: (time: number) => {
      const date = new Date(time * 1000);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
});

export const getCandlestickConfig = (): CandlestickSeriesPartialOptions => ({
  upColor: CHART_COLORS.candleUp,
  downColor: CHART_COLORS.candleDown,
  wickUpColor: CHART_COLORS.candleUp,
  wickDownColor: CHART_COLORS.candleDown,
  borderVisible: true,
  wickVisible: true,
});
