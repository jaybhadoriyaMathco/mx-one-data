# Chart Response Contract

This document defines the standard API response for all charts in the application.
The contract is designed to map directly to Apache ECharts while keeping presentation
styling in the frontend.

## Design Principles

- One response shape for line and bar charts.
- Categories are sent once in `categories`.
- Each series contains values aligned to `categories` by index.
- The backend sends data and chart intent; the frontend owns colors, fonts, spacing,
  tooltip markup, responsive behavior, and other visual defaults.
- Use `null` for a missing value. Do not use `0` unless the value is actually zero.
- Values must be JSON numbers, not formatted strings.

## Response Shape

```json
{
  "chart": {
    "id": "string",
    "title": "string",
    "subtitle": "string",
    "type": "line | bar",
    "orientation": "vertical | horizontal",
    "stacking": "none | normal | percent",
    "categoryAxis": {
      "name": "string",
      "type": "category"
    },
    "valueAxis": {
      "name": "string",
      "unit": "string",
      "min": "number | null",
      "max": "number | null",
      "interval": "number | null"
    },
    "secondaryValueAxis": {
      "name": "string",
      "unit": "string",
      "min": "number | null",
      "max": "number | null",
      "interval": "number | null"
    }
  },
  "categories": ["string"],
  "series": [
    {
      "id": "string",
      "name": "string",
      "values": ["number | null"],
      "valueAxis": "primary | secondary",
      "display": "solid | dashed | area"
    }
  ],
  "meta": {
    "currency": "string | null",
    "lastUpdated": "ISO-8601 datetime | null",
    "source": "string | null"
  }
}
```

## Required Fields

- `chart` (object)
  - `id` (string): Stable identifier for the chart.
  - `title` (string): Display title.
  - `type` (enum): `line` or `bar`.
  - `orientation` (enum): `vertical` or `horizontal`. Use `vertical` for line charts.
  - `stacking` (enum): `none`, `normal`, or `percent`. Use `none` unless bars are stacked.
  - `categoryAxis` (object, optional)
    - `name` (string): Category axis label.
    - `type` (string): Must be `category`.
  - `valueAxis` (object, optional)
    - `name` (string): Primary value axis label.
    - `unit` (string): Unit shown by the frontend.
    - `min`, `max`, `interval` (number or null): Optional axis bounds and tick interval.
  - `secondaryValueAxis` (object, optional): Configuration for a second value axis.
- `categories` (string array): Category labels in display order.
- `series` (array): One or more data series.
  - `id` (string): Unique series identifier.
  - `name` (string): Legend and tooltip label.
  - `values` (number or null array): Values aligned by index with `categories`.
  - `valueAxis` (enum): `primary` or `secondary`.
  - `display` (enum): `solid`, `dashed`, or `area`.
- `meta` (object, optional)
  - `currency` (string or null): Currency code when applicable.
  - `lastUpdated` (ISO-8601 datetime or null): Timestamp of the source data.
  - `source` (string or null): Backend data source identifier.

## Chart Rules

### Line charts

- Set `chart.type` to `line`.
- Set `chart.orientation` to `vertical`.
- Set `chart.stacking` to `none`.
- Use `display: "solid"` for a normal line.
- Use `display: "dashed"` when the frontend should render a dashed line.
- Use `display: "area"` when the frontend should render an area fill.
- Set `valueAxis: "secondary"` for a series that uses the right-side value axis.

### Bar charts

- Set `chart.type` to `bar`.
- Set `orientation` to `vertical` for columns.
- Set `orientation` to `horizontal` for horizontal bars.
- Set `stacking` to `none` for grouped bars.
- Set `stacking` to `normal` for stacked bars using absolute values.
- Set `stacking` to `percent` for 100% stacked bars. Values should be the underlying values;
  the frontend calculates the percentage display.
- The frontend maps horizontal bars by swapping the category and value axes.

## Example: Single Line

```json
{
  "chart": {
    "id": "som-monthly",
    "title": "Share of Market",
    "subtitle": "Monthly trend",
    "type": "line",
    "orientation": "vertical",
    "stacking": "none",
    "categoryAxis": { "name": "Month", "type": "category" },
    "valueAxis": { "name": "Share", "unit": "%", "min": 0, "max": 100, "interval": 20 }
  },
  "categories": ["Jul25", "Aug25", "Sep25", "Oct25"],
  "series": [
    {
      "id": "mars",
      "name": "MARS",
      "values": [40, 41, 42, 43],
      "valueAxis": "primary",
      "display": "area"
    }
  ],
  "meta": { "currency": null, "lastUpdated": "2026-09-03T10:30:00Z", "source": "market_data" }
}
```

## Example: Multi-Line With Secondary Axis

```json
{
  "chart": {
    "id": "sales-and-growth",
    "title": "Sales and Growth",
    "subtitle": "Monthly comparison",
    "type": "line",
    "orientation": "vertical",
    "stacking": "none",
    "categoryAxis": { "name": "Month", "type": "category" },
    "valueAxis": { "name": "Sales", "unit": "USD", "min": null, "max": null, "interval": null },
    "secondaryValueAxis": { "name": "Growth", "unit": "%", "min": -20, "max": 20, "interval": 10 }
  },
  "categories": ["Jul25", "Aug25", "Sep25", "Oct25"],
  "series": [
    {
      "id": "sales",
      "name": "Sales",
      "values": [120, 128, 134, 141],
      "valueAxis": "primary",
      "display": "solid"
    },
    {
      "id": "growth",
      "name": "Growth",
      "values": [null, 6.7, 4.7, 5.2],
      "valueAxis": "secondary",
      "display": "dashed"
    }
  ],
  "meta": { "currency": "USD", "lastUpdated": null, "source": "sales_data" }
}
```

## Example: Vertical Grouped Bar

```json
{
  "chart": {
    "id": "perfect-store-channel",
    "title": "Perfect Store Compliance by Channel",
    "subtitle": "Actual versus target",
    "type": "bar",
    "orientation": "vertical",
    "stacking": "none",
    "categoryAxis": { "name": "Channel", "type": "category" },
    "valueAxis": { "name": "Compliance", "unit": "%", "min": 0, "max": 100, "interval": 20 }
  },
  "categories": ["Modern", "Traditional", "E-commerce"],
  "series": [
    { "id": "actual", "name": "Actual", "values": [82, 74, 91], "valueAxis": "primary", "display": "solid" },
    { "id": "target", "name": "Target", "values": [85, 80, 90], "valueAxis": "primary", "display": "solid" }
  ],
  "meta": { "currency": null, "lastUpdated": null, "source": "compliance_data" }
}
```

## Example: Horizontal Bar

```json
{
  "chart": {
    "id": "sales-by-category",
    "title": "Sales by Category",
    "subtitle": null,
    "type": "bar",
    "orientation": "horizontal",
    "stacking": "none",
    "categoryAxis": { "name": "Category", "type": "category" },
    "valueAxis": { "name": "Sales", "unit": "USD", "min": 0, "max": null, "interval": null }
  },
  "categories": ["Chocolate", "Gum", "Petcare"],
  "series": [
    { "id": "sales", "name": "Sales", "values": [420000, 315000, 275000], "valueAxis": "primary", "display": "solid" }
  ],
  "meta": { "currency": "USD", "lastUpdated": null, "source": "sales_data" }
}
```

## Example: Vertical Stacked Bar

```json
{
  "chart": {
    "id": "volume-by-channel",
    "title": "Volume by Channel",
    "subtitle": "Channel contribution by period",
    "type": "bar",
    "orientation": "vertical",
    "stacking": "normal",
    "categoryAxis": { "name": "Period", "type": "category" },
    "valueAxis": { "name": "Volume", "unit": "Units (k)", "min": 0, "max": null, "interval": null }
  },
  "categories": ["P06", "P07", "P08"],
  "series": [
    { "id": "modern", "name": "Modern", "values": [42, 45, 48], "valueAxis": "primary", "display": "solid" },
    { "id": "traditional", "name": "Traditional", "values": [31, 29, 28], "valueAxis": "primary", "display": "solid" },
    { "id": "ecommerce", "name": "E-commerce", "values": [12, 15, 17], "valueAxis": "primary", "display": "solid" }
  ],
  "meta": { "currency": null, "lastUpdated": null, "source": "volume_data" }
}
```

## Example: Horizontal 100% Stacked Bar

```json
{
  "chart": {
    "id": "mix-by-category",
    "title": "Portfolio Mix",
    "subtitle": "Relative contribution by category",
    "type": "bar",
    "orientation": "horizontal",
    "stacking": "percent",
    "categoryAxis": { "name": "Category", "type": "category" },
    "valueAxis": { "name": "Contribution", "unit": "%", "min": 0, "max": 100, "interval": 20 }
  },
  "categories": ["Chocolate", "Gum", "Petcare"],
  "series": [
    { "id": "mars", "name": "MARS", "values": [60, 35, 45], "valueAxis": "primary", "display": "solid" },
    { "id": "competitors", "name": "Competitors", "values": [40, 65, 55], "valueAxis": "primary", "display": "solid" }
  ],
  "meta": { "currency": null, "lastUpdated": null, "source": "portfolio_data" }
}
```

## Validation Rules

1. `categories` must contain at least one item.
2. `series` must contain at least one item.
3. Every `series[].values.length` must equal `categories.length`.
4. `series[].id` must be unique within the response.
5. `series[].name` must be unique within the response.
6. `series[].valueAxis` may be `secondary` only when `chart.secondaryValueAxis` is present.
7. Line charts must use `orientation: "vertical"` and `stacking: "none"`.
8. `chart.stacking: "percent"` is valid only for bar charts with at least two series.
9. Use `null` for unavailable observations, including a missing first-period growth value.
10. Dates and timestamps must use ISO-8601 format. Category labels may remain display-ready strings.
11. Do not include hex colors, pixel dimensions, font settings, grid settings, or tooltip HTML in the API response.

## Frontend Mapping

The frontend adapter should map the response as follows:

- Category data
  - `categories` -> category axis `data`.
- Series data
  - `series[].name` -> series `name`.
  - `series[].values` -> series `data`.
  - `chart.type` -> series `type`.
- Axis configuration
  - `chart.*Axis.name` -> axis `name`.
  - `chart.*Axis.min/max/interval` -> axis `min`, `max`, and `interval`.
  - `series[].valueAxis: secondary` -> series `yAxisIndex: 1` on vertical charts.
- Bar configuration
  - `chart.orientation` -> swap category/value axis placement for horizontal bars.
  - `chart.stacking: normal` -> give all bar series the same `stack` key.
  - `chart.stacking: percent` -> use the same stack key, set the value axis maximum to `100`, and apply percent formatting.
- Line configuration
  - `series[].display` -> frontend line style and area style.

The API response should remain independent of the current React component prop names.
The frontend can adapt this contract into the existing `MultiLineChart` and `BarChart`
props now, and later pass the normalized values directly to a shared ECharts adapter.
