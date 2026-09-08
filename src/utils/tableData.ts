import type {
  StandardTableColumn,
  StandardTableColumnGroup,
  StandardTableRow,
} from "../components/common/Tables/StandardTable";

const cell = (
  value: string | number | null,
  options: Omit<NonNullable<StandardTableRow["cells"][string]>, "value"> = {},
) => ({ value, ...options });

export const salesSomColumns: StandardTableColumn[] = [
  { key: "cut", label: "Cut", width: 110, sticky: true },
  { key: "segment", label: "Segment", width: 150 },
  { key: "mars", label: "MARS", align: "right", labelDotColor: "#E3191B" },
  { key: "nestle", label: "Nestle", align: "right", labelDotColor: "#8A5BFF" },
  { key: "malta", label: "Malta", align: "right", labelDotColor: "#19A7B6" },
  { key: "adm", label: "ADM", align: "right", labelDotColor: "#A5D100" },
  { key: "totalMarket", label: "Total Market", align: "right" },
];

export const salesSomRows: StandardTableRow[] = [
  ["Category", "Dog", "43.1%", "34.9%", "10.0%", "5.4%", "$22.8M"],
  ["", "Cat", "41.0%", "36.2%", "9.8%", "5.2%", "$15.9M"],
  ["", "Care & Treats", "38.6%", "33.5%", "12.4%", "6.1%", "$5.7M"],
  ["", "Total", "42.4%", "37.1%", "9.6%", "5.0%", "$43.7M"],
  ["Channel", "Modern", "36.9%", "37.1%", "9.7%", "4.9%", "$29.3M"],
  ["", "Traditional", "35.0%", "33.2%", "16.4%", "8.7%", "$15.8M"],
  ["Sub-channel", "SS", "52.0%", "37.3%", "11.8%", "6.3%", "$7.9M"],
  ["", "Proximity", "54.6%", "29.1%", "4.0%", "2.0%", "$5.8M"],
  ["", "WHS", "33.9%", "35.8%", "15.5%", "8.3%", "$6.7M"],
  ["", "C&C", "31.3%", "38.4%", "18.7%", "10.0%", "$5.0M"],
  ["", "Other SS", "46.1%", "41.3%", "13.7%", "7.3%", "$11.3M"],
].map(([cut, segment, mars, nestle, malta, adm, totalMarket], index) => ({
  id: `sales-som-${index}`,
  cells: {
    cut: cell(cut, { emphasis: Boolean(cut) }),
    segment: cell(segment, { emphasis: true }),
    mars: cell(mars, { emphasis: true }),
    nestle: cell(nestle),
    malta: cell(malta),
    adm: cell(adm),
    totalMarket: cell(totalMarket),
  },
}));

export const salesRsvRows: StandardTableRow[] = [
  ["Category", "Dog", "$9.8M", "$8.0M", "$2.3M", "$1.2M", "$22.8M"],
  ["", "Cat", "$6.5M", "$4.2M", "$1.6M", "$0.8M", "$15.9M"],
  ["", "Care & Treats", "$2.2M", "$1.9M", "$0.7M", "$0.3M", "$5.7M"],
  ["", "Total", "$18.5M", "$14.1M", "$4.6M", "$2.4M", "$43.7M"],
  ["Channel", "Modern", "$10.8M", "$7.9M", "$2.1M", "$1.1M", "$29.3M"],
  ["", "Traditional", "$5.5M", "$4.2M", "$1.8M", "$1.0M", "$15.8M"],
  ["Sub-channel", "SS", "$4.1M", "$3.0M", "$0.9M", "$0.5M", "$7.9M"],
  ["", "Proximity", "$3.2M", "$1.7M", "$0.2M", "$0.1M", "$5.8M"],
  ["", "WHS", "$2.3M", "$2.4M", "$1.0M", "$0.6M", "$6.7M"],
  ["", "C&C", "$1.6M", "$1.9M", "$0.9M", "$0.5M", "$5.0M"],
  ["", "Other SS", "$5.2M", "$3.2M", "$0.7M", "$0.4M", "$11.3M"],
].map(([cut, segment, mars, nestle, malta, adm, totalMarket], index) => ({
  id: `sales-rsv-${index}`,
  cells: {
    cut: cell(cut, { emphasis: Boolean(cut) }),
    segment: cell(segment),
    mars: cell(mars),
    nestle: cell(nestle), malta: cell(malta), adm: cell(adm),
    totalMarket: cell(totalMarket),
  },
}));

export const skuMasterColumns: StandardTableColumn[] = [
  { key: "sku", label: "SKU", width: 210, sticky: true },
  { key: "family", label: "Family" },
  { key: "category", label: "Category" },
  { key: "tech", label: "Tech" },
  { key: "size", label: "Size" },
  { key: "ventas", label: "Ventas", align: "right" },
  { key: "volume", label: "Volume", align: "right" },
  { key: "distribution", label: "Distribution", align: "right" },
  { key: "alcances", label: "Alcances", align: "right" },
  { key: "alcancesPercent", label: "% Alcances", align: "right" },
];

export const skuMasterRows: StandardTableRow[] = [
  ["Ped AD Res 24/100g", "Pedigree", "Dog", "Dry", "2kg", "$2.48M", "46t", "4,986", "73", "74%"],
  ["Ped PPY Beef 12", "Pedigree", "Dog", "Dry", "1.5kg", "$1.18M", "22t", "3,980", "71", "73%"],
  ["Ped Pavo y Zanahoria", "Pedigree", "Dog", "Wet", "100g", "$0.61M", "9t", "3,210", "70", "72%"],
  ["Ped SB Lamb 12", "Pedigree", "Dog", "Dry", "1.5kg", "$0.94M", "18t", "3,720", "66", "68%"],
  ["Ped Pouch Beef", "Pedigree", "Dog", "Wet", "100g", "$0.54M", "8t", "2,980", "64", "66%"],
  ["Whiskas Seco Carne", "Whiskas", "Cat", "Dry", "1.5kg", "$1.72M", "24t", "4,120", "61", "63%"],
  ["Whiskas Pouch Atún", "Whiskas", "Cat", "Wet", "85g", "$1.49M", "19t", "3,860", "58", "60%"],
  ["Whiskas Junior", "Whiskas", "Cat", "Dry", "1kg", "$0.88M", "12t", "3,240", "52", "54%"],
  ["MVP Bf+Ckn 24/85g", "Sheba", "Cat", "Wet", "85g", "$0.42M", "6t", "2,210", "50", "50%"],
  ["Ped SB Beef 24/100g", "Pedigree", "Dog", "Dry", "2kg", "$2.21M", "42t", "4,610", "49", "49%"],
].map(([sku, family, category, tech, size, ventas, volume, distribution, alcances, alcancesPercent], index) => ({
  id: `sku-${index}`,
  cells: {
    sku: cell(sku, { emphasis: true }), family: cell(family), category: cell(category), tech: cell(tech), size: cell(size),
    ventas: cell(ventas), volume: cell(volume), distribution: cell(distribution), alcances: cell(alcances),
    alcancesPercent: cell(alcancesPercent, {
      display: "tag",
      status: index < 5 ? "positive" : index < 9 ? "warning" : "negative",
    }),
  },
}));

export const deltaColumns: StandardTableColumn[] = [
  { key: "channel", label: "Channel", width: 150, sticky: true },
  { key: "p12Delta", label: "P12 Delta", align: "right" },
  { key: "p12Bar", label: "", width: 55, align: "right" },
  { key: "p13Delta", label: "P13 Delta", align: "right" },
  { key: "p13Bar", label: "", width: 55, align: "right" },
  { key: "totalDelta", label: "Total Delta", align: "right" },
  { key: "totalBar", label: "", width: 55, align: "right" },
  { key: "p01", label: "P01", align: "right" },
  { key: "p02", label: "P02", align: "right" },
  { key: "p03", label: "P03", align: "right" },
  { key: "p04", label: "P04", align: "right" },
  { key: "p05", label: "P05", align: "right" },
  { key: "p06", label: "P06", align: "right" },
  { key: "p07", label: "P07", align: "right" },
];

export const deltaColumnGroups: StandardTableColumnGroup[] = [
  { label: "Channel", span: 1 },
  { label: "2025 · P12", span: 2 },
  { label: "2025 · P13", span: 2 },
  { label: "Total", span: 2 },
  { label: "2026 · Quarterly Detail", span: 7 },
];

const deltaSource = [
  ["AFILIADAS", -274.63, -397.69, -672.32, [-151.02, -92.19, 70.78, -2.23, 34.24, -0.24, -12.11]],
  ["AUTOSERVICIOS", 104.59, -103.53, 1.06, [-98.63, -150.98, 61.53, 107.45, 170.96, 149.63, 29.32]],
  ["CLUBES", 157.79, 30.68, 188.47, [24.06, 77.08, -36.76, 24.33, 28.44, 32.00, 38.99]],
  ["CONVENIENCIAS", 78.15, -0.13, 78.02, [25.00, 36.93, 35.41, 39.70, 52.82, 64.58, 50.98]],
  ["DTS", -67.95, 74.99, 7.04, [29.89, 39.99, 46.30, 63.17, 55.66, 58.17, 47.52]],
  ["E-COMMERCE", 104.38, 33.63, 138.01, [105.50, -124.24, 34.98, 47.42, 61.86, 19.46, 40.85]],
  ["MARCAS PRIVADAS", -120.34, -889.85, -1010.19, [0, 0, 0, 0, 0, 0, 0]],
  ["MAYOREO", -6.10, 52.01, 45.91, [-9.07, -26.19, -26.37, -7.90, -7.28, -8.79, -15.98]],
  ["SPECIALTY", -5.14, 25.52, 20.38, [16.40, 0, 11.23, 0, 16.95, 16.15, 8.01]],
] as const;

const deltaCell = (value: number) => cell(value.toFixed(2), { status: value >= 0 ? "positive" : "negative" });
const deltaBarCell = (value: number) => cell("", { status: value >= 0 ? "positive" : "negative", bar: { value: Math.abs(value), max: 900 } });

export const deltaRows: StandardTableRow[] = deltaSource.map(([channel, p12, p13, total, periods]) => ({
  id: channel,
  cells: {
    channel: cell(channel, { emphasis: true }),
    p12Delta: deltaCell(p12), p12Bar: deltaBarCell(p12),
    p13Delta: deltaCell(p13), p13Bar: deltaBarCell(p13),
    totalDelta: deltaCell(total), totalBar: deltaBarCell(total),
    ...Object.fromEntries(periods.map((value, index) => [`p0${index + 1}`, deltaCell(value)])),
  },
})) as StandardTableRow[];

export const skuPerformanceColumns: StandardTableColumn[] = [
  { key: "chain", label: "Chain", width: 130, sticky: true },
  { key: "universe", label: "Universe", align: "right" },
  { key: "catalogTotal", label: "Catalogued", align: "right" },
  { key: "catalogTarget", label: "Target", align: "right" },
  { key: "catalogStores", label: "Stores", align: "right" },
  { key: "catalogPercent", label: "%", align: "right" },
  { key: "sellInEr", label: "ER", align: "right" },
  { key: "sellInFact", label: "FACT", align: "right" },
  { key: "sellInOa", label: "O.A.", align: "right" },
  { key: "factPercent", label: "%FACT", align: "right" },
  { key: "factOaPercent", label: "%FACT+OA", align: "right" },
  { key: "posExhib", label: "Add'l Exhib", align: "right" },
  { key: "posMaterials", label: "Materials", align: "right" },
  { key: "reachTarget", label: "Target", align: "right" },
  { key: "reachDistrib", label: "Distrib.", align: "right" },
  { key: "sosBefore", label: "Before", align: "right" },
  { key: "sosAfter", label: "After", align: "right" },
  { key: "sosTarget", label: "Target", align: "right" },
];

export const skuPerformanceGroups: StandardTableColumnGroup[] = [
  { label: "Chain", span: 1 },
  { label: "Store Universe", span: 1 },
  { label: "Catalogued", span: 4 },
  { label: "Sell-in Acumulado", span: 5 },
  { label: "POS", span: 2 },
  { label: "Alcances (Reach)", span: 2 },
  { label: "SOS", span: 3 },
];

const performanceSource = [
  ["Walmart", "1,369", "633", "617", "612", "99%", "1,215", "1,463", "386", "120%", "152%", "479", "513", "717", "671", "38%", "37%", "9.3"],
  ["Chedraui", "1,960", "1,083", "1,037", "847", "82%", "3,668", "1,603", "277", "44%", "51%", "294", "89", "259", "253", "40%", "38%", "7.4"],
  ["HEB", "510", "280", "277", "236", "85%", "2,860", "1,667", "693", "58%", "83%", "288", "547", "392", "396", "41%", "37%", "6.3"],
  ["Soriana", "2,083", "1,646", "914", "1,358", "149%", "2,451", "2,723", "1,206", "111%", "160%", "773", "522", "140", "136", "26%", "30%", "8.3"],
  ["City Fresko", "1,481", "1,299", "957", "1,177", "123%", "2,451", "1,132", "274", "46%", "57%", "491", "377", "668", "663", "33%", "36%", "6.5"],
  ["Casa Ley", "1,357", "349", "569", "250", "44%", "1,870", "812", "361", "43%", "63%", "363", "469", "66", "56", "44%", "47%", "6.4"],
  ["Calimax", "821", "632", "738", "559", "76%", "1,813", "831", "339", "46%", "65%", "644", "528", "430", "437", "31%", "35%", "7.3"],
  ["Regionales", "2,653", "1,151", "1,471", "1,055", "72%", "3,249", "2,392", "309", "74%", "83%", "817", "300", "382", "307", "42%", "50%", "5.3"],
] as const;

export const skuPerformanceRows: StandardTableRow[] = performanceSource.map((values, rowIndex) => ({
  id: `chain-${rowIndex}`,
  cells: Object.fromEntries(
    skuPerformanceColumns.map((column, index) => [
      column.key,
      cell(values[index] ?? null, {
        emphasis: column.key === "chain" || rowIndex === 0,
        status: ["catalogPercent", "factPercent", "factOaPercent", "sosAfter"].includes(column.key)
          ? String(values[index]).startsWith("1") || String(values[index]).startsWith("9")
            ? "positive"
            : "negative"
          : undefined,
      }),
    ]),
  ),
}));

export const factVsFcstPeriodColumns: StandardTableColumn[] = [
  { key: "channel", label: "Channel", width: 150, sticky: true },
  ...Array.from({ length: 13 }, (_, index) => ({ key: `p${String(index + 1).padStart(2, "0")}`, label: `P${String(index + 1).padStart(2, "0")}`, align: "right" as const })),
  { key: "grandTotal", label: "Grand Total", align: "right" },
];

const periodSource = [
  ["Self-Service", [316569, 353436, 360520, 367224, 341916, 335877, 378800, 336056, 356338, 365530, 323143, 337320, 352856], 4525585],
  ["Clubs", [51541, 53176, 57165, 54840, 57313, 52166, 56842, 53917, 57033, 60067, 53052, 62060, 54780], 723340],
  ["Convenience", [116613, 126810, 119023, 143831, 143414, 126775, 135191, 130545, 148453, 149017, 129481, 117987, 120776], 1707820],
  ["DTS", [197740, 223549, 234948, 245856, 201504, 221736, 231182, 243454, 248274, 247450, 248108, 205307, 236732], 2985840],
  ["E-Commerce", [22873, 20994, 19851, 24246, 21723, 22121, 21746, 22968, 21505, 23989, 19430, 22157, 23917], 287520],
  ["Private Label", [94598, 83337, 88524, 86214, 75109, 82871, 85468, 87259, 89627, 89539, 81987, 86441, 82538], 1113512],
  ["Wholesale", [319973, 252533, 290130, 307894, 258532, 283063, 310377, 261888, 277018, 275239, 296170, 313110, 281267], 3727194],
  ["Specialty", [2602, 2329, 2899, 2577, 2834, 2338, 2543, 2961, 2689, 2579, 2583, 2900, 2537], 34371],
] as const;

export const factVsFcstPeriodRows: StandardTableRow[] = periodSource.map(([channel, periods, total], index) => ({
  id: `fact-period-${index}`,
  cells: {
    channel: cell(channel),
    ...Object.fromEntries(periods.map((value, periodIndex) => [`p${String(periodIndex + 1).padStart(2, "0")}`, cell(value.toLocaleString())])),
    grandTotal: cell(total.toLocaleString(), { emphasis: true }),
  },
}));

export const factVsFcstChannelColumns: StandardTableColumn[] = [
  { key: "channel", label: "Channel", sticky: true },
  { key: "fact", label: "FACT", align: "right" },
  { key: "fcst", label: "FCST", align: "right" },
  { key: "oa", label: "O.A.", align: "right" },
  { key: "factOa", label: "FACT + OA", align: "right" },
  { key: "variance", label: "Variance", align: "right" },
  { key: "variancePercent", label: "% Var", align: "right" },
];

const factVsFcstChannelSource = [
  ["Modern", "$1,685", "$1,573", "$239", "$1,924", "+$112", "+7%"],
  ["Traditional", "$977", "$1,007", "$194", "$1,171", "-$30", "-3%"],
  ["Wholesale", "$1,429", "$1,461", "$154", "$1,583", "-$32", "-2%"],
  ["DTS", "$1,198", "$1,095", "$253", "$1,451", "+$103", "+9%"],
  ["eCommerce", "$1,021", "$1,123", "$74", "$1,095", "-$102", "-9%"],
  ["Total", "$6,310", "$6,259", "$914", "$7,224", "+$51", "+1%"],
];

export const factVsFcstChannelRows: StandardTableRow[] = factVsFcstChannelSource.map(([channel, fact, fcst, oa, factOa, variance, variancePercent], index) => ({
  id: `fact-channel-${index}`,
  emphasis: channel === "Total",
  cells: {
    channel: cell(channel, { emphasis: channel === "Total" }), fact: cell(fact), fcst: cell(fcst), oa: cell(oa), factOa: cell(factOa),
    variance: cell(variance, { status: variance.startsWith("+") ? "positive" : "negative", emphasis: true }),
    variancePercent: cell(variancePercent, { status: variancePercent.startsWith("+") ? "positive" : "negative", emphasis: true }),
  },
}));

export const averagePriceColumns: StandardTableColumn[] = [
  { key: "product", label: "Product", width: 280, sticky: true },
  { key: "avgPrice", label: "Avg Price", align: "right" },
  { key: "vsLp", label: "vs LP", align: "right" },
  { key: "vsLy", label: "vs LY", align: "right" },
];

const averagePriceSource = [
  ["Campeon Kilo", "$19.48", "-1.84", "-0.49"], ["Cat Chow Kilo", "$48.91", "-0.64", "-2.51"], ["Cat Chow Pre Kilo", "$25.13", "-1.55", "-2.02"],
  ["Champ Kilo", "$53.68", "+1.36", "-1.35"], ["Dog Chow Adult Kilo", "$30.07", "+1.31", "-0.68"], ["Dog Chow Adult Pre Kilo", "$47.15", "-0.64", "+1.10"],
  ["Dog Chow Pouch", "$48.70", "+0.35", "-2.47"], ["Dog Chow Puppy Kilo", "$10.32", "-0.26", "-2.73"], ["Dog Chow RP Kilo", "$28.55", "+1.90", "-2.23"],
];

export const averagePriceRows: StandardTableRow[] = averagePriceSource.map(([product, avgPrice, vsLp, vsLy], index) => ({
  id: `average-price-${index}`,
  cells: {
    product: cell(product), avgPrice: cell(avgPrice),
    vsLp: cell(vsLp, { status: vsLp.startsWith("+") ? "positive" : "negative" }),
    vsLy: cell(vsLy, { status: vsLy.startsWith("+") ? "positive" : "negative" }),
  },
}));

const averagePriceCutValues: Record<string, string[]> = {
  Manufacturer: ["Mars Petcare", "Nestle Purina", "Grupo Nutec", "Affinity", "Others"],
  Product: averagePriceSource.map(([product]) => product),
  Warehouse: ["CEDIS Toluca", "CEDIS Guadalajara", "CEDIS Monterrey", "CEDIS Puebla", "CEDIS Merida"],
  Customer: ["Walmart", "Chedraui", "HEB", "Soriana", "City Fresko", "Casa Ley", "Calimax", "Regionales"],
  Brand: ["Pedigree", "Dog Chow", "Ganador", "Campeon", "Beneful", "G. Premium"],
  Area: ["North", "Pacific", "Bajio", "Centre", "Valle de Mexico", "Southeast"],
  Route: ["Route 1", "Route 2", "Route 3", "Route 4", "Route 5", "Route 6"],
};

export const averagePriceRowsByCut: Record<string, StandardTableRow[]> = Object.fromEntries(
  Object.entries(averagePriceCutValues).map(([cut, labels]) => [
    cut,
    labels.map((label, index) => {
      const base = 19.48 + index * 3.67;
      const vsLp = index % 3 === 0 ? 1.36 : -(0.26 + index * 0.19);
      const vsLy = index % 4 === 0 ? 1.10 : -(0.49 + index * 0.21);
      return {
        id: `${cut.toLowerCase()}-${index}`,
        cells: {
          product: cell(label, { emphasis: true }),
          avgPrice: cell(`$${base.toFixed(2)}`),
          vsLp: cell(`${vsLp >= 0 ? "+" : ""}${vsLp.toFixed(2)}`, { status: vsLp >= 0 ? "positive" : "negative" }),
          vsLy: cell(`${vsLy >= 0 ? "+" : ""}${vsLy.toFixed(2)}`, { status: vsLy >= 0 ? "positive" : "negative" }),
        },
      };
    }),
  ]),
);
