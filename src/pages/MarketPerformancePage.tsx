import { useSelector } from "react-redux";

import type { RootState } from "../store";
import MarketPerformanceFilters from "../features/marketPerformance/filters/MarketPerformanceFilters";
import KPI from "../components/common/KPI/KPI";

import "./MarketPerformance.css";

export function MarketPerformancePage() {
  const { compareYears, comparePeriods } = useSelector(
    (state: RootState) => state.marketFilters
  );

  const comparingItems = [...compareYears, ...comparePeriods];

  return (
    <div className="market-performance">
      <MarketPerformanceFilters />

      <main className="market-performance__content">
        <div className="market-performance__breadcrumb">
          <span>Market Performance</span>
          <span className="market-performance__breadcrumb-separator">›</span>
          <strong>Executive View</strong>
        </div>

        <div className="market-performance__header">
          <div className="market-performance__header-left">
            <h1 className="market-performance__title">Executive View</h1>

            <p className="market-performance__subtitle">
              Strategic market health summary · All categories · Traditional
              channel · P08 2026 · RSV ($)
            </p>
          </div>

          {comparingItems.length > 0 && (
            <div className="market-performance__comparing">
              {comparingItems.map((item) => (
                <span key={item} className="market-performance__comparing-chip">
                  Comparing: {item}
                </span>
              ))}
            </div>
          )}
        </div>

        <section className="market-performance__kpis">
          <KPI
            label="MARS SOM — TRADITIONAL"
            value="23.1%"
            accentColor="#0000A0"
            comparison={{
              status: "positive",
              value: "+0.3pp",
              text: "vs FY25 · Traditional channel · total category",
            }}
          />

          <KPI
            label="CATEGORY VALUE GROWTH"
            value="+4.1%"
            accentColor="#BC2486"
            comparison={{
              status: "positive",
              value: "YTD vs FY25",
            }}
            sparkline={{
              color: "#BC2486",
              fill: true,
              data: [3.6, 3.8, 3.9, 3.7, 3.4, 3.8, 4.2, 4.5, 4.4, 4.1],
            }}
          />

          <KPI
            label="AVG STORES SELLING"
            value="5,329"
            accentColor="#FF8200"
            comparison={{
              status: "positive",
              value: "+99 vs P12 2025",
            }}
            sparkline={{
              color: "#00DCFA",
              fill: true,
              data: [
                4800, 4920, 5000, 5050, 5100, 5180, 5220, 5260, 5280, 5329,
              ],
            }}
          />
        </section>
      </main>
    </div>
  );
}