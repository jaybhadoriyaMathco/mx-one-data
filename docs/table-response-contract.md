# Table Response Contract

This document defines the standard API response for tables used across Market Performance
and Building Blocks. The response is designed to be consumed by the reusable
`StandardTable` component while keeping presentation styling in the frontend.

## Design Principles

- Columns are defined once and rows reference cells by column key.
- The backend sends raw values and semantic status; the frontend owns spacing, typography,
  colors, borders, sticky behavior, and responsive layout.
- Numeric values must be JSON numbers, not formatted strings.
- Use `null` for missing values. Do not use `0` unless the value is actually zero.
- Header grouping is optional and supports matrices with multiple header levels.
- Pagination, sorting, and filtering metadata may be added when the endpoint requires them.

## Response Shape

```json
{
  "table": {
    "id": "string",
    "title": "string",
    "subtitle": "string",
    "density": "compact | comfortable",
    "defaultSort": {
      "column": "string",
      "direction": "asc | desc"
    }
  },
  "columnGroups": [
    {
      "id": "string",
      "label": "string",
      "span": "number"
    }
  ],
  "columns": [
    {
      "key": "string",
      "label": "string",
      "dataType": "string | number | currency | percent | date",
      "align": "left | center | right",
      "width": "number | null",
      "sticky": "boolean"
    }
  ],
  "rows": [
    {
      "id": "string",
      "cells": {
        "column_key": {
          "value": "string | number | null",
          "status": "positive | negative | warning | neutral",
          "emphasis": "boolean",
          "bar": {
            "value": "number",
            "max": "number | null"
          }
        }
      }
    }
  ],
  "footerRows": [],
  "meta": {
    "lastUpdated": "ISO-8601 datetime | null",
    "source": "string | null",
    "totalRows": "number | null"
  }
}
```

## Required Fields

- `table` (object)
  - `id` (string): Stable table identifier.
  - `title` (string): Table title.
  - `subtitle` (string, optional): Context or filter description.
  - `density` (enum, optional): `compact` or `comfortable`.
- `columns` (array)
  - `key` (string): Unique key referenced by row cells.
  - `label` (string): Display label.
  - `dataType` (enum): `string`, `number`, `currency`, `percent`, or `date`.
  - `align` (enum, optional): `left`, `center`, or `right`.
  - `width` (number, optional): Preferred width in pixels.
  - `sticky` (boolean, optional): Whether the frontend should keep the column visible during horizontal scrolling.
- `rows` (array)
  - `id` (string): Stable row identifier.
  - `cells` (object): Keyed by the matching `columns[].key`.
  - `cells[].value` (string, number, or null): Raw value.
- `footerRows` (array, optional): Total or summary rows rendered below the body.
- `meta` (object, optional): Source and row-count metadata.

## Cell Metadata

Use cell metadata only for meaning, not visual implementation:

- `status: "positive"`: Favorable result, such as positive growth.
- `status: "negative"`: Unfavorable result, such as negative variance.
- `status: "warning"`: Needs attention but is not strictly positive or negative.
- `status: "neutral"`: Informational or unchanged value.
- `emphasis: true`: Primary value, leader, subtotal, or other intentional emphasis.
- `bar`: Inline magnitude indicator. The frontend decides bar color and appearance.

The backend must not send CSS, hex colors, HTML, or React-specific values.

## Example: Sales & SOM by Cut

```json
{
  "table": {
    "id": "sales-som-by-cut",
    "title": "Sales & SOM by Cut — Full Matrix",
    "subtitle": "Share of Market (%) by category, channel and sub-channel",
    "density": "comfortable"
  },
  "columns": [
    { "key": "cut", "label": "Cut", "dataType": "string", "align": "left", "sticky": true },
    { "key": "segment", "label": "Segment", "dataType": "string", "align": "left" },
    { "key": "mars", "label": "MARS", "dataType": "percent", "align": "right" },
    { "key": "nestle", "label": "Nestlé", "dataType": "percent", "align": "right" },
    { "key": "malta", "label": "Malta", "dataType": "percent", "align": "right" },
    { "key": "adm", "label": "ADM", "dataType": "percent", "align": "right" },
    { "key": "totalMarket", "label": "Total Market", "dataType": "currency", "align": "right" }
  ],
  "rows": [
    {
      "id": "category-dog",
      "cells": {
        "cut": { "value": "Category" },
        "segment": { "value": "Dog", "emphasis": true },
        "mars": { "value": 43.1, "emphasis": true },
        "nestle": { "value": 34.9 },
        "malta": { "value": 10.0 },
        "adm": { "value": 5.4 },
        "totalMarket": { "value": 22.8 }
      }
    }
  ],
  "meta": { "lastUpdated": "2026-09-07T10:30:00Z", "source": "market_share", "totalRows": 1 }
}
```

## Example: Delta Matrix With Grouped Headers

```json
{
  "table": {
    "id": "delta-matrix",
    "title": "Delta Matrix",
    "subtitle": "Period-over-period change (Tons) by channel",
    "density": "compact"
  },
  "columnGroups": [
    { "id": "channel", "label": "Channel", "span": 1 },
    { "id": "p12", "label": "P12", "span": 2 },
    { "id": "p13", "label": "P13", "span": 2 },
    { "id": "total", "label": "Total", "span": 2 }
  ],
  "columns": [
    { "key": "channel", "label": "Channel", "dataType": "string", "sticky": true },
    { "key": "p12Delta", "label": "Delta", "dataType": "number", "align": "right" },
    { "key": "p12Bar", "label": "Bar", "dataType": "number", "align": "right" },
    { "key": "p13Delta", "label": "Delta", "dataType": "number", "align": "right" },
    { "key": "p13Bar", "label": "Bar", "dataType": "number", "align": "right" },
    { "key": "totalDelta", "label": "Delta", "dataType": "number", "align": "right" },
    { "key": "totalBar", "label": "Bar", "dataType": "number", "align": "right" }
  ],
  "rows": [
    {
      "id": "clubs",
      "cells": {
        "channel": { "value": "CLUBES", "emphasis": true },
        "p12Delta": { "value": 157.79, "status": "positive" },
        "p12Bar": { "value": 157.79, "status": "positive", "bar": { "value": 157.79, "max": 200 } },
        "p13Delta": { "value": 30.68, "status": "positive" },
        "p13Bar": { "value": 30.68, "status": "positive", "bar": { "value": 30.68, "max": 200 } },
        "totalDelta": { "value": 188.47, "status": "positive", "emphasis": true },
        "totalBar": { "value": 188.47, "status": "positive", "bar": { "value": 188.47, "max": 200 } }
      }
    }
  ]
}
```

## Frontend Mapping

The frontend adapter maps the response as follows:

- `columns` -> reusable table column definitions.
- `rows[].cells[column.key].value` -> displayed cell value after frontend formatting.
- `dataType` -> number, percent, currency, or date formatter.
- `status` -> semantic text or badge color selected by the frontend.
- `emphasis` -> bold or highlighted cell treatment.
- `bar` -> inline data bar rendered by the reusable component.
- `columnGroups` -> grouped header rows with `colSpan`.
- `sticky` -> sticky first-column behavior for wide matrices.
- `footerRows` -> totals and summary rows.

## Validation Rules

1. Every `columns[].key` must be unique.
2. Every `rows[].id` must be unique.
3. Every cell key must exist in `columns`.
4. Numeric cells must contain JSON numbers or `null`, never formatted strings.
5. `bar.value` must be numeric and `bar.max` must be greater than zero when supplied.
6. `columnGroups[].span` must match the number of columns covered by that group.
7. `sticky` should normally be used only for the first identifying column.
8. Totals and subtotals should be sent through `footerRows` or explicit rows with `emphasis`, not inferred from labels.
9. The backend should send raw data; currency symbols, percent signs, commas, and compact notation belong to the frontend.
10. Use stable `id` values so rows and columns remain reliable when data updates.
