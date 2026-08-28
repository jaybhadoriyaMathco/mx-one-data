import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const routeLabels: Record<string, string> = {
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

export function ModuleBreadcrumbs() {
  const location = useLocation();

  const segments = location.pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return null;
  }

  const moduleRoot = segments[0] === "market-performance" ? "market-performance" : segments[0] === "building-blocks" ? "building-blocks" : null;
  if (!moduleRoot) {
    return null;
  }

  const crumbs: { label: string; path: string }[] = [];
  let currentPath = "";

  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = routeLabels[segment] ?? segment.replace(/-/g, " ");
    crumbs.push({ label, path: currentPath });
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 0.75,
        mb: 2,
        minHeight: 28,
      }}
    >
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;

        return (
          <Box key={`${crumb.path}-${index}`} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            {index > 0 && (
              <Typography sx={{ color: "text.secondary", fontSize: 15, lineHeight: 1 }}>
                ›
              </Typography>
            )}

            {isLast ? (
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "text.primary",
                  lineHeight: 1.3,
                }}
              >
                {crumb.label}
              </Typography>
            ) : (
              <Link
                component={RouterLink}
                to={crumb.path}
                underline="hover"
                sx={{
                  fontSize: 13,
                  color: "text.secondary",
                  lineHeight: 1.3,
                  "&:hover": { color: "primary.main" },
                }}
              >
                {crumb.label}
              </Link>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
