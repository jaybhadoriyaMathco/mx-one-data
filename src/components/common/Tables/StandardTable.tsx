import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import type { ReactNode } from "react";

export type TableCellStatus = "positive" | "negative" | "warning" | "neutral";

export type StandardTableCell = {
  value: string | number | null;
  status?: TableCellStatus;
  emphasis?: boolean;
  display?: "text" | "tag" | "sparkline";
  dotColor?: string;
  sparkline?: {
    data: number[];
    color: string;
    width?: number;
    height?: number;
  };
  bar?: {
    value: number;
    max?: number;
  };
};

export type StandardTableRow = {
  id: string;
  cells: Record<string, StandardTableCell>;
  emphasis?: boolean;
};

export type StandardTableColumn = {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: number | string;
  sticky?: boolean;
  labelDotColor?: string;
};

export type StandardTableColumnGroup = {
  label: string;
  span: number;
};

type StandardTableProps = {
  title?: string;
  subtitle?: string;
  columns: StandardTableColumn[];
  rows: StandardTableRow[];
  columnGroups?: StandardTableColumnGroup[];
  footerRows?: StandardTableRow[];
  headerActions?: ReactNode;
  maxHeight?: number | string;
  compact?: boolean;
};


function Sparkline({
  data,
  color,
  width = 110,
  height = 28,
}: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  if (!data || data.length < 2) {
    return null;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const padY = 3;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y =
        height - padY - ((value - min) / span) * (height - padY * 2);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <Box
      component="svg"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      preserveAspectRatio="none"
      sx={{ display: "block", overflow: "visible" }}
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </Box>
  );
}

function renderCellValue(cell: StandardTableCell) {
  if (cell.value === null || cell.value === undefined) {
    return "-";
  }

  return cell.value;
}

function TableDataCell({
  cell,
  align = "left",
}: {
  cell: StandardTableCell;
  align?: "left" | "center" | "right";
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const barMax = cell.bar?.max ?? 100;
  const barWidth = Math.min(50, Math.max(0, (cell.bar?.value ?? 0) / barMax * 50));
  const statusColors: Record<TableCellStatus, string> = {
    positive: theme.palette.success.main,
    negative: theme.palette.error.main,
    warning: theme.palette.warning.main,
    neutral: isDark ? "#B7C0D9" : "#8A8A8A",
  };
  const tagStyles: Record<TableCellStatus, { bgcolor: string; borderColor: string }> = {
    positive: {
      bgcolor: isDark ? "rgba(64, 232, 200, 0.12)" : "#F6FFED",
      borderColor: isDark ? "rgba(64, 232, 200, 0.45)" : "#B7EB8F",
    },
    negative: {
      bgcolor: isDark ? "rgba(255, 77, 77, 0.12)" : "#FFF1F0",
      borderColor: isDark ? "rgba(255, 77, 77, 0.4)" : "#FFA39E",
    },
    warning: {
      bgcolor: isDark ? "rgba(255, 160, 64, 0.12)" : "#FFF7E6",
      borderColor: isDark ? "rgba(255, 160, 64, 0.38)" : "#FFD591",
    },
    neutral: {
      bgcolor: isDark ? "rgba(255,255,255,0.04)" : "#FAFAFA",
      borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,.16)",
    },
  };
  const tagStyle = cell.status ? tagStyles[cell.status] : tagStyles.neutral;

  if (cell.display === "sparkline" && cell.sparkline) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            align === "right" ? "flex-end" : align === "center" ? "center" : "flex-start",
          width: "100%",
          minHeight: 28,
        }}
      >
        <Sparkline
          data={cell.sparkline.data}
          color={cell.sparkline.color}
          width={cell.sparkline.width}
          height={cell.sparkline.height}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent:
          align === "right" ? "flex-end" : align === "center" ? "center" : "flex-start",
        width: "100%",
        minHeight: cell.display === "tag" ? 24 : 20,
        color: cell.status ? statusColors[cell.status] : isDark ? theme.palette.text.primary : "#0A0A0A",
        fontWeight: cell.emphasis ? 700 : 400,
      }}
    >
      {cell.bar && (
        <Box
          sx={{
            position: "absolute",
            left: cell.status === "negative" ? "auto" : "50%",
            right: cell.status === "negative" ? "50%" : "auto",
            top: "50%",
            width: `${barWidth}%`,
            height: 6,
            transform: "translateY(-50%)",
            bgcolor: cell.status === "negative" ? theme.palette.error.main : theme.palette.success.main,
            borderRadius: "1px",
          }}
        />
      )}
      <Box
        component="span"
        sx={{
          position: "relative",
          zIndex: 1,
          width: cell.display === "tag" ? "auto" : "100%",
          display: cell.display === "tag" ? "inline-flex" : "block",
          alignItems: "center",
          justifyContent:
            align === "right" ? "flex-end" : align === "center" ? "center" : "flex-start",
          textAlign: align,
          px: cell.display === "tag" ? 1 : 0,
          py: cell.display === "tag" ? 0.25 : 0,
          border: cell.display === "tag" ? "1px solid" : 0,
          borderColor: cell.display === "tag" ? tagStyle.borderColor : "transparent",
          borderRadius: cell.display === "tag" ? "4px" : 0,
          bgcolor: cell.display === "tag" ? tagStyle.bgcolor : "transparent",
          color: cell.status ? statusColors[cell.status] : isDark ? theme.palette.text.primary : "#0A0A0A",
          fontSize: cell.display === "tag" ? 11 : "inherit",
          fontWeight: cell.display === "tag" || cell.emphasis ? 600 : "inherit",
        }}
      >
        {cell.dotColor && (
          <Box
            component="span"
            sx={{
              display: "inline-block",
              width: 9,
              height: 9,
              minWidth: 9,
              borderRadius: "50%",
              bgcolor: cell.dotColor,
              mr: 1,
              verticalAlign: "middle",
            }}
          />
        )}
        {renderCellValue(cell)}
      </Box>
    </Box>
  );
}

export function StandardTable({
  title,
  subtitle,
  columns,
  rows,
  columnGroups,
  footerRows = [],
  headerActions,
  maxHeight,
  compact = false,
}: StandardTableProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const hasHeaderGroups = Boolean(columnGroups?.length);
  const cellPadding = compact ? "7px 10px" : "9px 12px";
  const panelBg = isDark ? theme.palette.background.paper : "#FFFFFF";
  const headerBg = isDark ? "#1A1F2B" : "#FAFAFA";
  const headerText = isDark ? "#C8D1E6" : "#5C6677";
  const bodyText = isDark ? "#E8EDF9" : "#3A3F47";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,.08)";
  const dividerColor = isDark ? "rgba(255,255,255,0.06)" : "#F0F0F0";
  const hoverBg = isDark ? "rgba(96,96,255,0.12)" : "#F5F5FF";
  const emphasisBg = isDark ? "#171D2A" : "#F7F9FF";
  const groupBg = isDark ? "rgba(96,96,255,0.12)" : "#F0F5FF";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        border: "1px solid",
        borderColor,
        borderRadius: "8px",
        bgcolor: panelBg,
        p: 2,
        mb: 1.5,
      }}
    >
      {(title || subtitle || headerActions) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
            flexWrap: "wrap",
            p: 0,
            pb: title || subtitle ? 1.5 : 0,
          }}
        >
          <Box>
            {title && (
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: bodyText }}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography sx={{ mt: 0.25, color: isDark ? "#B5BCD1" : "#8A8A8A", fontSize: 11 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {headerActions}
        </Box>
      )}

      <TableContainer
        sx={{
          maxHeight,
          overflow: "auto",
          border: "1px solid",
          borderColor,
          borderRadius: "8px",
          bgcolor: panelBg,
          "&::-webkit-scrollbar": { width: 6, height: 6 },
          "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
          "&::-webkit-scrollbar-thumb": { bgcolor: isDark ? "rgba(255,255,255,.24)" : "rgba(120,120,120,.45)", borderRadius: "3px" },
        }}
      >
        <Table
          stickyHeader={Boolean(maxHeight)}
          size={compact ? "small" : "medium"}
          sx={{
            minWidth: columns.length > 7 ? 980 : 720,
            borderCollapse: "collapse",
            fontSize: 12,
            "& th": {
              bgcolor: headerBg,
              color: headerText,
              fontSize: 11.5,
              fontWeight: 600,
              padding: "8px 12px",
              whiteSpace: "nowrap",
              userSelect: "none",
              borderBottom: `1px solid ${borderColor}`,
            },
            "& th:hover": { bgcolor: isDark ? "#202838" : "#F0F0F0" },
            "& td": {
              padding: compact ? "7px 10px" : "8px 12px",
              borderBottom: `1px solid ${dividerColor}`,
              color: bodyText,
              verticalAlign: "middle",
            },
            "& tbody tr": { transition: "background .12s ease" },
            "& tbody tr:hover td": { bgcolor: hoverBg },
            "& tbody tr:last-child td": { borderBottom: 0 },
          }}
        >
          <TableHead>
            {hasHeaderGroups && (
              <TableRow>
                {columnGroups?.map((group) => (
                  <TableCell
                    key={group.label}
                    colSpan={group.span}
                    align="center"
                    sx={{
                      py: 0.8,
                      px: 1.25,
                      bgcolor: groupBg,
                      color: isDark ? "#DDE7FF" : "#0000A0",
                      fontSize: 10.5,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      borderBottom: "1px solid",
                      borderColor,
                      whiteSpace: "nowrap",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {group.label}
                  </TableCell>
                ))}
              </TableRow>
            )}
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align={column.align ?? "left"}
                  sx={{
                    width: column.width,
                    minWidth: column.width,
                    py: 1,
                    px: 1.25,
                    bgcolor: headerBg,
                    color: headerText,
                    fontSize: 11.5,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    borderBottom: `1px solid ${borderColor}`,
                    ...(column.sticky && {
                      position: "sticky",
                      left: 0,
                      zIndex: 3,
                      bgcolor: isDark ? "#1A1F2B" : "background.paper",
                      boxShadow: isDark
                        ? "1px 0 0 rgba(255,255,255,0.08)"
                        : "1px 0 0 rgba(0,0,0,0.08)",
                    }),
                  }}
                >
                  {column.labelDotColor ? (
                    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          minWidth: 8,
                          borderRadius: "50%",
                          bgcolor: column.labelDotColor,
                          boxShadow: `0 0 0 1px ${isDark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.08)"}`,
                        }}
                      />
                      <Box component="span">{column.label}</Box>
                    </Box>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  bgcolor: row.emphasis ? emphasisBg : "transparent",
                  ...(row.emphasis && { "& td": { borderTop: `2px solid ${borderColor}` } }),
                  "&:last-child td": { borderBottom: 0 },
                }}
              >
                {columns.map((column) => {
                  const cell = row.cells[column.key] ?? { value: null };
                  return (
                    <TableCell
                      key={column.key}
                      align={column.align ?? "left"}
                      sx={{
                        py: cellPadding.split(" ")[0],
                        px: cellPadding.split(" ")[1],
                        fontSize: compact ? 12 : 13,
                        whiteSpace: "nowrap",
                        borderColor: dividerColor,
                        ...(column.sticky && {
                          position: "sticky",
                          left: 0,
                          zIndex: 1,
                          bgcolor: row.emphasis ? emphasisBg : panelBg,
                          boxShadow: isDark
                            ? "1px 0 0 rgba(255,255,255,0.06)"
                            : "1px 0 0 rgba(0,0,0,0.06)",
                        }),
                      }}
                    >
                      <TableDataCell cell={cell} align={column.align ?? "left"} />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
            {footerRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  bgcolor: emphasisBg,
                  "& td": { fontWeight: 700, borderTop: `2px solid ${borderColor}` },
                  "&:last-child td": { borderBottom: 0 },
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    align={column.align ?? "left"}
                    sx={{
                      py: cellPadding.split(" ")[0],
                      px: cellPadding.split(" ")[1],
                      fontSize: compact ? 12 : 13,
                      whiteSpace: "nowrap",
                      borderColor: dividerColor,
                      ...(column.sticky && {
                        position: "sticky",
                        left: 0,
                        zIndex: 1,
                        bgcolor: emphasisBg,
                        boxShadow: isDark
                          ? "1px 0 0 rgba(255,255,255,0.06)"
                          : "1px 0 0 rgba(0,0,0,0.06)",
                      }),
                    }}
                  >
                    <TableDataCell cell={row.cells[column.key] ?? { value: null }} align={column.align ?? "left"} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
