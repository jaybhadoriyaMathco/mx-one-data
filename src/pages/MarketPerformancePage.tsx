import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, type SidebarEntry } from "../components/common/Sidebar/Sidebar";

export function MarketPerformancePage() {
  const [collapsed, setCollapsed] = useState(false);

  const items: SidebarEntry[] = [
    {
      label: "Executive View",
      path: "/market-performance/executive-view",
      color: "#9B5DE5",
    },
    {
      label: "Market Overview",
      path: "/market-performance/market-overview/share-volume",
      color: "#9B5DE5",
      children: [
        { label: "Share & Volume", path: "/market-performance/market-overview/share-volume", color: "#9B5DE5" },
        { label: "Pricing & Price Index", path: "/market-performance/market-overview/pricing-price-index", color: "#9B5DE5" },
        { label: "Mars Distribution", path: "/market-performance/market-overview/mars-distribution", color: "#9B5DE5" },
      ],
    },
    {
      label: "MARS vs Market",
      path: "/market-performance/mars-vs-market/category-sku",
      color: "#00C2FF",
      children: [
        { label: "Category & SKU", path: "/market-performance/mars-vs-market/category-sku", color: "#00C2FF" },
        { label: "Brand & Channel Mix", path: "/market-performance/mars-vs-market/brand-channel-mix", color: "#00C2FF" },
      ],
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
        gap: 2,
        width: "100%",
        height: "100%",
        minHeight: 0,
        pt: 0.25,
      }}
    >
      <Sidebar
        title="Market Performance"
        items={items}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((value) => !value)}
      />
      <Box sx={{ flex: 1, minWidth: 0, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
