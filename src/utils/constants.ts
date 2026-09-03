export const ROUTE_LABELS: Record<string, string> = {
  "market-performance": "Market Performance",
  "market-overview": "Market Overview",
  "share-volume": "Share & Volume",
  "pricing-price-index": "Pricing & Price Index",
  "mars-distribution": "Mars Distribution",
  "mars-vs-market": "MARS vs Market",
  "category-sku": "Category & SKU",
  "brand-channel-mix": "Brand & Channel Mix",
  "executive-view": "Executive View",
  "building-blocks": "Building Blocks",
  "executive": "Executive",
  performance: "Performance",
  "fact-vs-fcst": "FACT vs FCST",
};
import type { MultiLineSeries } from "../components/common/Charts/MultiLineChart";

/* SOM MONTHLY DATA */

export const monthlyXAxisData = [
  "Jul25",
  "Aug25",
  "Sep25",
  "Oct25",
  "Nov25",
  "Dec25",
  "Jan26",
  "Feb26",
  "Mar26",
  "Apr26",
  "May26",
  "Jun26",
];

export const monthlySomSeries: MultiLineSeries[] = [
  {
    name: "MARS",
    color: "#182B83",
    fill: true,
    data: [
      40,
      39,
      40,
      40,
      40,
      40,
      40,
      40,
      40,
      40,
      40,
      40,
    ],
  },

  {
    name: "Nestlé",
    color: "#F57C00",
    fill: true,
    data: [
      35,
      36,
      35,
      35,
      36,
      36,
      35,
      35,
      36,
      36,
      36,
      35,
    ],
  },

  {
    name: "Malta",
    color: "#00A9C6",
    data: [
      10,
      10,
      10,
      9.5,
      9.2,
      9.1,
      10,
      9.6,
      10,
      9.7,
      9.1,
      9.2,
    ],
  },

  {
    name: "ADM",
    color: "#BC2486",
    data: [
      5,
      5,
      5,
      4.8,
      4.7,
      4.6,
      5,
      4.8,
      4.9,
      4.8,
      4.7,
      4.6,
    ],
  },

  {
    name: "Total Category growth %",
    color: "#59606D",
    fill: true,
    yAxisIndex: 1,
    data: [
      5.5,
      5.8,
      6,
      6,
      5.6,
      5.9,
      5.2,
      5.5,
      5.9,
      5.5,
      5.1,
      4.9,
    ],
  },
];


/* SOM QUARTERLY DATA */

export const quarterlyXAxisData = [
  "Q1-24",
  "Q2-24",
  "Q3-24",
  "Q4-24",
  "Q1-25",
  "Q2-25",
  "Q3-25",
  "Q4-25",
  "Q1-26",
  "Q2-26",
];

export const quarterlySomSeries: MultiLineSeries[] = [
  {
    name: "MARS",
    color: "#182B83",
    fill: true,
    data: [
      40,
      39.5,
      39.2,
      39.5,
      39.4,
      38,
      38.5,
      39,
      39.2,
      39.5,
    ],
  },

  {
    name: "Nestlé",
    color: "#F57C00",
    fill: true,
    data: [
      34,
      34.5,
      34,
      35,
      36,
      35.5,
      36,
      36,
      36.2,
      36.5,
    ],
  },

  {
    name: "Malta",
    color: "#00A9C6",
    data: [
      9,
      9,
      9,
      8.8,
      9,
      8.8,
      8.6,
      8.7,
      9,
      8.5,
    ],
  },

  {
    name: "ADM",
    color: "#BC2486",
    data: [
      4.5,
      4.5,
      4.4,
      4.3,
      4.3,
      4.2,
      4.2,
      4.4,
      4.3,
      4.1,
    ],
  },

  {
    name: "Total Category growth %",
    color: "#59606D",
    fill: true,
    yAxisIndex: 1,
    data: [
      4.7,
      5.2,
      5.2,
      5.5,
      5.9,
      5.7,
      5.8,
      5.9,
      5.4,
      5,
    ],
  },
];

/* CATEGORY GROWTH DATA */

export const categoryGrowthXAxisData = [
  "P01",
  "P02",
  "P03",
  "P04",
  "P05",
  "P06",
  "P07",
  "P08",
  "P09",
  "P10",
  "P11",
  "P12",
  "P13",
];

export const categoryGrowthSeries: MultiLineSeries[] = [
  {
    name: "Value — RSV",
    color: "#182B83",
    yAxisIndex: 0,
    fill: true,
    data: [
      2.35,
      2.4,
      2.48,
      2.42,
      2.5,
      2.6,
      2.55,
      2.62,
      2.58,
      2.55,
      2.7,
      2.85,
      2.88,
    ],
  },

  {
    name: "Volume (Tons)",
    color: "#00A9C6",
    yAxisIndex: 1,
    data: [
      45.5,
      45.8,
      46.5,
      46.2,
      45.6,
      47.5,
      46.9,
      47.3,
      46.4,
      46,
      46.6,
      47.7,
      46.8,
    ],
  },
];

/* STORES SELLING DATA */

export const storesSellingXAxis = [
  "P01",
  "P02",
  "P03",
  "P04",
  "P05",
  "P06",
  "P07",
  "P08",
  "P09",
  "P10",
  "P11",
  "P12",
  "P13",
];

export const storesSellingSeries: MultiLineSeries[] = [
  {
    name: "Stores Selling",
    color: "#1FA9C3",
    fill: true,
    data: [
      4700,
      4700,
      4705,
      4725,
      4760,
      4790,
      4975,
      5010,
      5060,
      5060,
      5050,
      5070,
      5185,
    ],
  },
];

export const BUILDING_BLOCKS_CHARTS = {
  osaShelfTrend: {
    title: "OSA & Shelf (SOS) Trend",
    xAxisName: "Period",

    xAxisData: [
      "P1",
      "P2",
      "P3",
      "P4",
      "P5",
      "P6",
      "P7",
      "P8",
    ],

    series: [
      {
        name: "OSA",
        data: [74.5, 76.2, 76.8, 78.5, 79.4, 80.5, 80.3, 81.5],
        color: "#1E2A78",
        fill: true,
      },
      {
        name: "Shelf (SOS)",
        data: [50.2, 52.1, 52.8, 52.5, 54.8, 54.7, 53.2, 55.5],
        color: "#1C8A8A",
      },
    ],

    leftAxis: {
      min: 50,
      max: 85,
      interval: 5,
      formatter: (value: number) => `${value}`,
    },
  },

  forecastAccuracyBias: {
    title: "Forecast Accuracy vs Bias (by cycle)",
    xAxisName: "Cycle",

    xAxisData: ["C1", "C2", "C3", "C4", "C5", "C6"],

    series: [
      {
        name: "SFA",
        data: [55, 60, 59, 62, 58, 62],
        color: "#1E2A78",
        fill:true,
      },
      {
        name: "BIAS",
        data: [5, 3, 3, 5, 2, 4],
        color: "#E67E22",
      },
    ],

    leftAxis: {
      min: 0,
      max: 70,
      interval: 10,
      formatter: (value: number) => `${value}`,
    },
  },
};

export const PERFECT_STORE_CHANNEL_DATA = {
  title: "Perfect Store Compliance by Channel",

  xAxisData: ["SSS", "C&C", "MC", "DTS"],

  series: [
    {
      name: "PS %",
      data: [71, 74, 62, 40],
      color: "#1E2A78",
    },
    {
      name: "Target",
      data: [76, 76, 71, 46],
      color: "#B6B8D6",
    },
  ],
};


export const FACT_VS_FCST_DATA = {
  title: "FACT vs FCST (units, P01–P08)",

  xAxisData: [
    "P1",
    "P2",
    "P3",
    "P4",
    "P5",
    "P6",
    "P7",
    "P8",
  ],

  series: [
    {
      name: "FACT",
      data: [40, 48, 43, 50, 48, 51, 50, 52],
      color: "#1E2A78",
    },
    {
      name: "FCST",
      data: [43, 49, 45, 51, 49, 53, 54, 51],
      color: "#D6D7DC",
    },
  ],
};