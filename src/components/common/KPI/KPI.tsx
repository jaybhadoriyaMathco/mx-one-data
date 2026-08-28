import type { CSSProperties } from "react";

import type { KPIProps } from "./types";

import KPISparkline from "./KPISparkline";

import "./KPI.css";

function KPI({
  label,
  value,
  comparison,
  accentColor = "#0000A0",
  sparkline,
  className = "",
}: KPIProps) {
  const cardStyle = {
    "--kpi-accent": accentColor,
  } as CSSProperties;

  return (
    <div className={`kpi-card ${className}`} style={cardStyle}>
      <div className="kpi-card__accent" />

      <div className="kpi-card__content">
        <div className="kpi-card__label">{label}</div>

        <div className="kpi-card__value">{value}</div>

        {comparison && (
          <div
            className={`kpi-card__comparison kpi-card__comparison--${comparison.status}`}
          >
            <span className="kpi-card__comparison-value">
              {comparison.value}
            </span>

            {comparison.text && (
              <span className="kpi-card__comparison-text">
                {comparison.text}
              </span>
            )}
          </div>
        )}

        {sparkline && (
          <KPISparkline
            data={sparkline.data}
            color={sparkline.color}
            fill={sparkline.fill}
          />
        )}
      </div>
    </div>
  );
}

export default KPI;