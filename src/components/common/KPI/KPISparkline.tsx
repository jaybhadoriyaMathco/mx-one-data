interface KPISparklineProps {
  data: number[];
  color: string;
  fill?: boolean;
}

function KPISparkline({
  data,
  color,
  fill = true,
}: KPISparklineProps) {
  if (!data.length) {
    return null;
  }

  const width = 420;
  const height = 62;

  const paddingX = 2;
  const paddingY = 4;

  const min = Math.min(...data);
  const max = Math.max(...data);

  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x =
      paddingX +
      (index / (data.length - 1 || 1)) *
        (width - paddingX * 2);

    const y =
      height -
      paddingY -
      ((value - min) / range) *
        (height - paddingY * 2);

    return {
      x,
      y,
    };
  });

  const linePath = points
    .map((point, index) =>
      `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
    )
    .join(" ");

  const fillPath = `${linePath} L ${width - paddingX} ${height} L ${paddingX} ${height} Z`;

  return (
    <div className="kpi-sparkline">
      <svg
        className="kpi-sparkline__svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {fill && (
          <path
            d={fillPath}
            fill={color}
            fillOpacity="0.12"
          />
        )}

        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default KPISparkline;