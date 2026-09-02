import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Sidebar,
  type SidebarEntry,
} from "../../components/common/Sidebar/Sidebar";

export function BuildingBlocksPage() {
  const [collapsed, setCollapsed] = useState(false);

  const items: SidebarEntry[] = [
    {
      label: "Executive",
      path: "/building-blocks/executive",
      color: "#8C7CF6",
    },
    {
      label: "Performance",
      path: "/building-blocks/performance",
      color: "#00C2FF",
    },
    {
      label: "FACT vs FCST",
      path: "/building-blocks/fact-vs-fcst",
      color: "#FF4DB8",
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
        title="Building Blocks"
        items={items}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((value) => !value)}
      />

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}