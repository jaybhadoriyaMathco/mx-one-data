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

import type { BarChartSeries } from "../components/common/Charts/BarChart";

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

export const brandSomXAxisData = [
  "Jan24",
  "Apr24",
  "Jul24",
  "Oct24",
  "Jan25",
  "Apr25",
  "Jul25",
  "Oct25",
  "Jan26",
  "Apr26",
  "Jun26",
];

export const brandSomAllTechSeries = [
  {
    name: "Campeon",
    color: "#84D000",
    data: [
      7.6,
      7.5,
      7.4,
      7.5,
      7.6,
      7.5,
      7.6,
      7.7,
      7.6,
      7.5,
      7.6,
    ],
  },
  {
    name: "Beneful",
    color: "#FF7A00",
    data: [
      3.4,
      3.3,
      3.2,
      3.3,
      3.4,
      3.3,
      3.2,
      3.2,
      3.1,
      3.1,
      3.0,
    ],
  },
  {
    name: "G.Premium",
    color: "#FFC000",
    data: [
      5.0,
      5.1,
      5.2,
      5.2,
      5.3,
      5.4,
      5.3,
      5.4,
      5.4,
      5.3,
      5.4,
    ],
  },
];

export const brandSomDrySeries = [
  {
    name: "Campeon",
    color: "#84D000",
    data: [
      8.1,
      8.0,
      7.9,
      8.0,
      8.1,
      8.0,
      8.1,
      8.2,
      8.1,
      8.0,
      8.1,
    ],
  },
  {
    name: "Beneful",
    color: "#FF7A00",
    data: [
      3.8,
      3.7,
      3.6,
      3.7,
      3.8,
      3.7,
      3.6,
      3.6,
      3.5,
      3.5,
      3.4,
    ],
  },
  {
    name: "G.Premium",
    color: "#FFC000",
    data: [
      5.5,
      5.6,
      5.7,
      5.7,
      5.8,
      5.9,
      5.8,
      5.9,
      5.9,
      5.8,
      5.9,
    ],
  },
];

export const brandSomWetSeries = [
  {
    name: "Campeon",
    color: "#84D000",
    data: [
      7.6,
      7.5,
      7.4,
      7.5,
      7.6,
      7.5,
      7.6,
      7.7,
      7.6,
      7.5,
      7.6,
    ],
  },
  {
    name: "Beneful",
    color: "#FF7A00",
    data: [
      3.4,
      3.3,
      3.2,
      3.3,
      3.4,
      3.3,
      3.2,
      3.2,
      3.1,
      3.1,
      3.0,
    ],
  },
  {
    name: "G.Premium",
    color: "#FFC000",
    data: [
      5.0,
      5.1,
      5.2,
      5.2,
      5.3,
      5.4,
      5.3,
      5.4,
      5.4,
      5.3,
      5.4,
    ],
  },
];

export const breedSizeXAxisData = [
  "Med & Large",
  "Small",
];

export const marsBreedSizeMixSeries = [
  {
    name: "MARS Mix",
    color: "#1000B5",
    data: [81, 17],
  },
];

export const marketBreedSizeMixSeries = [
  {
    name: "Market Mix",
    color: "#BC2486",
    data: [77, 18],
  },
];

export const breedSizeIndexSeries = [
  {
    name: "Index",
    color: "#FF1717",
    data: [105, 100],
  },
];

// PRICING & PRICE INDEX

export const pricingWeeklyXAxisData = [
  "W1",
  "W2",
  "W3",
  "W4",
];


export const dogDryPriceSeries = [
  {
    name: "Pedigree AD Res",
    color: "#1000B5",
    data: [960, 980, 970, 974],
  },
  {
    name: "Pedigree SB Beef",
    color: "#C2268E",
    data: [825, 828, 830, 832],
  },
  {
    name: "Whiskas",
    color: "#84D000",
    data: [538, 535, 538, 543],
  },
  {
    name: "Minimo",
    color: "#00C7E5",
    data: [745, 638, 628, 738],
  },
];

export const dogWetPriceSeries = [
  {
    name: "Pedigree AD Res",
    color: "#1000B5",
    data: [785, 792, 788, 795],
  },
  {
    name: "Pedigree SB Beef",
    color: "#C2268E",
    data: [690, 700, 705, 710],
  },
  {
    name: "Whiskas",
    color: "#84D000",
    data: [510, 515, 512, 520],
  },
  {
    name: "Minimo",
    color: "#00C7E5",
    data: [625, 615, 620, 630],
  },
];



export const catDryPriceSeries = [
  {
    name: "Pedigree AD Res",
    color: "#1000B5",
    data: [610, 618, 620, 625],
  },
  {
    name: "Pedigree SB Beef",
    color: "#C2268E",
    data: [565, 570, 575, 580],
  },
  {
    name: "Whiskas",
    color: "#84D000",
    data: [545, 550, 548, 555],
  },
  {
    name: "Minimo",
    color: "#00C7E5",
    data: [515, 520, 518, 525],
  },
];


export const catWetPriceSeries = [
  {
    name: "Pedigree AD Res",
    color: "#1000B5",
    data: [720, 725, 730, 735],
  },
  {
    name: "Pedigree SB Beef",
    color: "#C2268E",
    data: [650, 648, 655, 660],
  },
  {
    name: "Whiskas",
    color: "#84D000",
    data: [580, 585, 590, 595],
  },
  {
    name: "Minimo",
    color: "#00C7E5",
    data: [540, 545, 550, 558],
  },
];


export const priceIndexManufacturerXAxisData = [
  "MARS",
  "Nestlé",
  "Malta",
];

export const priceIndexCompetitorSeries = [
  {
    name: "Price Index",
    color: "#1000B5",

    colors: [
      "#1000B5",
      "#FF7A00",
      "#00C7E5",
    ],

    data: [
      100,
      88,
      78,
    ],
  },
];


export const priceRangeSubChannelXAxisData = [
  "WHS",
  "C&C",
  "Other SS",
];

export const priceRangeSubChannelSeries = [
  {
    name: "MARS",
    color: "#1000B5",
    data: [
      825,
      805,
      845,
    ],
  },
  {
    name: "Market",
    color: "#BDBDBD",
    data: [
      730,
      715,
      755,
    ],
  },
];


export const priceTrendXAxisData = [
  "P01 2025",
  "P02 2025",
  "P03 2025",
  "P04 2025",
  "P05 2025",
  "P06 2025",
  "P07 2025",
  "P08 2025",
  "P09 2025",
  "P10 2025",
  "P11 2025",
  "P12 2025",
  "P13 2025",
];

export const priceTrendSeries = [
  {
    name: "Campeon Kilo",
    color: "#1010B5",

    data: [
      17,
      15,
      17,
      18,
      17.5,
      16,
      17.5,
      16.8,
      18,
      18.5,
      15.8,
      15.2,
      16.2,
    ],
  },

  {
    name: "Cat Chow Kilo",
    color: "#FF7A00",

    data: [
      35,
      34,
      35.5,
      37.5,
      34,
      35,
      38,
      34.5,
      35.5,
      35.5,
      34,
      35,
      37.5,
    ],
  },

  {
    name: "Cat Chow Pre Kilo",
    color: "#00C7E5",

    data: [
      43,
      43,
      46,
      42,
      43.5,
      43.5,
      42.8,
      43,
      45,
      45.2,
      42.5,
      44.5,
      45,
    ],
  },

  {
    name: "Champ Kilo",
    color: "#C2268E",

    data: [
      51,
      52.5,
      52.8,
      53,
      52,
      51.8,
      53.8,
      52,
      52.8,
      53,
      51.2,
      52,
      52.5,
    ],
  },

  {
    name: "Dog Chow Adult Kilo",
    color: "#93D500",

    data: [
      18,
      18.7,
      19.2,
      19.5,
      19,
      18.5,
      19.8,
      20,
      17.5,
      18.8,
      17.5,
      18,
      19.2,
    ],
  },

  {
    name: "Dog Chow Adult Pre Kilo",
    color: "#FF2121",

    data: [
      32.5,
      32.5,
      34.5,
      33.5,
      34,
      32.5,
      34,
      33,
      34,
      35,
      32.5,
      35.5,
      33.5,
    ],
  },
];


export const categoryOverviewXAxisData: string[] = [
  "MARS",
  "Nestlé",
  "Malta",
  "ADM",
];

export const categoryOverviewSeries: BarChartSeries[] = [
  {
    name: "Value",
    data: [5400, 4300, 1700, 1000], 
    color: "#0000A8",               
    colors: ["#0000A8", "#FF8000", "#1FC6DB", "#C2187B"], 
    barLabels: [
      { text: "▲ +7.2%", color: "#43A047" },
      { text: "▲ +6.1%", color: "#43A047" },
      { text: "▼ -1.1%", color: "#E53935" },
      { text: "▲ +3.2%", color: "#43A047" },
    ],
  },
];


export const MARS_DISTRIBUTION_TREND_CHART = {
  title: "ROS & Distribution Trend",

  subtitle: "P01–P13 2025",

  tabs: ["RSV", "Vol"],

  activeTab: "Vol",

  skuOptions: [
    "All SKUs",
    "Pedigree Pouch",
    "Whiskas",
  ],

  defaultSku: "Pedigree Pouch",

  xAxisData: [
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
  ],

  xAxisName: "Period",

  leftAxis: {
    min: 315,
    max: 365,
    interval: 10,
    formatter: (value: number) => `${value}`,
  },

  rightAxis: {
    min: 4700,
    max: 5000,
    interval: 100,
    formatter: (value: number) =>
      value.toLocaleString("en-US"),
  },

  series: [
    {
      name: "ROS",
      data: [
        320,
        324,
        327,
        333,
        322,
        360,
        344,
        335,
        328,
        323,
        331,
        354,
        358,
      ],
      color: "#0808A8",
      fill: true,
      yAxisIndex: 0,
    },

    {
      name: "Stores Selling",
      data: [
        4705,
        4710,
        4720,
        4740,
        4780,
        4820,
        4890,
        4930,
        4970,
        4975,
        4960,
        4980,
        5000,
      ],
      color: "#00CFEF",
      yAxisIndex: 1,
    },
  ],
};


/* ============================================================
   BEYOND CATMAN — SKU DEEP DIVE
   ============================================================ */

export type CatmanTab = "All" | "Dog" | "Cat";

export const CATMAN_NAVY = "#0D0DC2";
export const CATMAN_ORANGE = "#F57C00";
export const CATMAN_GREY = "#C9C9C9";

export interface CatmanKpis {
  activeSkus: string;
  productFamilies: string;
  avgAlcances: string;
}

export interface CatmanBarBlock {
  categories: string[];
  values: number[];
  colors: string[];
  max: number;
  interval: number;
}

export interface CatmanDataset {
  kpis: CatmanKpis;
  ventasByFamily: CatmanBarBlock;
  distributionBySize: CatmanBarBlock;
  alcancesBySku: CatmanBarBlock;
}

/** highlight the first `n` bars in navy, grey out the rest */
const highlight = (total: number, n: number) =>
  Array.from({ length: total }, (_, i) =>
    i < n ? CATMAN_NAVY : CATMAN_GREY,
  );

const orange = (total: number) =>
  Array.from({ length: total }, () => CATMAN_ORANGE);

export const CATMAN_DATA: Record<CatmanTab, CatmanDataset> = {
  All: {
    kpis: {
      activeSkus: "13",
      productFamilies: "6",
      avgAlcances: "58%",
    },
    ventasByFamily: {
      categories: [
        "Pedigree",
        "Whiskas",
        "Ganador",
        "Campeon",
        "Sheba",
        "Temptations",
      ],
      values: [9.6, 6.2, 0.9, 0.85, 0.35, 0.3],
      colors: highlight(6, 2),
      max: 10,
      interval: 2,
    },
    distributionBySize: {
      categories: ["<1.5kg", "1.5-3.5kg", "3.5-5.5kg", "8.5-11kg", "15-25kg"],
      values: [2100, 4950, 1200, 3000, 1850],
      colors: orange(5),
      max: 5000,
      interval: 1000,
    },
    alcancesBySku: {
      categories: [
        "Ped AD Res 24/100g",
        "Ped Pavo y Zanahoria",
        "Ped Pouch Beef",
        "Whiskas Pouch Atún",
        "MVP Bf+Ckn 24/85g",
        "Temptations Chicken",
        "Campeon Carne 20kg",
      ],
      values: [74, 71, 68, 63, 55, 50, 41],
      colors: highlight(7, 6),
      max: 100,
      interval: 20,
    },
  },

  Dog: {
    kpis: {
      activeSkus: "8",
      productFamilies: "3",
      avgAlcances: "62%",
    },
    ventasByFamily: {
      categories: ["Pedigree", "Ganador", "Campeon"],
      values: [9.6, 0.9, 0.85],
      colors: highlight(3, 1),
      max: 10,
      interval: 2,
    },
    distributionBySize: {
      categories: ["<1.5kg", "1.5-3.5kg", "3.5-5.5kg", "8.5-11kg", "15-25kg"],
      values: [1200, 2600, 900, 3000, 1850],
      colors: orange(5),
      max: 5000,
      interval: 1000,
    },
    alcancesBySku: {
      categories: [
        "Ped AD Res 24/100g",
        "Ped Pavo y Zanahoria",
        "Ped Pouch Beef",
        "Ganador Carne 8kg",
        "Campeon Carne 20kg",
      ],
      values: [74, 71, 68, 52, 41],
      colors: highlight(5, 4),
      max: 100,
      interval: 20,
    },
  },

  Cat: {
    kpis: {
      activeSkus: "5",
      productFamilies: "3",
      avgAlcances: "51%",
    },
    ventasByFamily: {
      categories: ["Whiskas", "Sheba", "Temptations"],
      values: [6.2, 0.35, 0.3],
      colors: highlight(3, 1),
      max: 10,
      interval: 2,
    },
    distributionBySize: {
      categories: ["<1.5kg", "1.5-3.5kg", "3.5-5.5kg"],
      values: [2100, 2350, 300],
      colors: orange(3),
      max: 5000,
      interval: 1000,
    },
    alcancesBySku: {
      categories: [
        "Whiskas Pouch Atún",
        "Whiskas Carne 1.5kg",
        "MVP Bf+Ckn 24/85g",
        "Temptations Chicken",
        "Sheba Pouch 85g",
      ],
      values: [63, 58, 55, 50, 38],
      colors: highlight(5, 4),
      max: 100,
      interval: 20,
    },
  },
};