import type { ReactNode } from "react";

export type KPIStatus = "positive" | "negative" | "neutral";

export interface KPIComparison {
  status: KPIStatus;
  value: string;
  text?: string;
}

export interface KPITrendDataPoint {
  value: number;
}

export interface KPITrendChartConfig {
  data: KPITrendDataPoint[];
  color: string;
  fill?: boolean;
}

export interface KPIBreakdownItem {
  label: string;
  value: string;
  comparison?: string;
  status?: KPIStatus;
}

export interface KPIBreakdown {
  items: KPIBreakdownItem[];
}

export interface KPICardProps {
  label: string;
  value: string;
  comparison?: KPIComparison;
  accentColor?: string;
  chart?: KPITrendChartConfig;
  breakdown?: KPIBreakdown;
  showChart?: boolean;
  showComparison?: boolean;
  footerContent?: ReactNode;
  className?: string;
  minHeight?: number;

}