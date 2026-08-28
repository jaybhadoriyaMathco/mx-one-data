export type KPIStatus =
  | "positive"
  | "negative"
  | "neutral";

export interface KPIComparison {
  status: KPIStatus;
  value: string;
  text?: string;
}

export interface KPISparkline {
  data: number[];

  color: string;

  fill?: boolean;
}

export interface KPIProps {
  label: string;

  value: string;

  comparison?: KPIComparison;

  accentColor?: string;

  sparkline?: KPISparkline;

  className?: string;
}