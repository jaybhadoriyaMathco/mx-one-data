import { Box, IconButton } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

export type SidebarEntry = {
  label: string;
  path?: string;
  color?: string;
  children?: SidebarEntry[];
};

type SidebarProps = {
  title: string;
  items: SidebarEntry[];
  collapsed: boolean;
  onToggleCollapse: () => void;
};

function ArrowIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{
        width: 14,
        height: 14,
        transform: collapsed ? "rotate(180deg)" : "none",
      }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 3 5 8l5 5" />
    </svg>
  );
}

export function Sidebar({
  title,
  items,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const location = useLocation();

  const sidebarWidth = collapsed ? 46 : 220;
  const lightBg = "#FFFFFF";
  const darkBg = "linear-gradient(180deg, #101018 0%, #0D0D14 100%)";
  const activeBg = "rgba(76, 109, 232, 0.16)";
  const activeBorder = "#4C6DE8";
  const activeText = "#1F2A44";

  return (
    <Box
      sx={{
        position: "relative",
        width: sidebarWidth,
        minWidth: sidebarWidth,
        flexShrink: 0,
        height: "100%",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? darkBg : lightBg,
        color: (theme) =>
          theme.palette.mode === "dark" ? "common.white" : "text.primary",
        borderRight: "1px solid",
        borderRightColor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.09)"
            : "rgba(0,0,0,0.08)",
        boxSizing: "border-box",
        padding: "12px 0",
        margin: 0,
        transition: "width 0.25s ease",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: collapsed ? 0.75 : 1.25,
          py: 0.8,
          minHeight: 40,
          borderBottom: 1,
          borderColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.08)",
          fontWeight: 800,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          fontSize: collapsed ? 7 : 12,
          lineHeight: 1.3,
          whiteSpace: collapsed ? "nowrap" : "normal",
        }}
      >
        {!collapsed && title}
        <IconButton
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          sx={{
            width: 24,
            height: 24,
            minWidth: 24,
            borderRadius: 1,
            ml: collapsed ? 0 : 1,
            border: 1,
            borderColor: "rgba(255,255,255,0.2)",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#171D2A" : "#E7E7E8",
            color: "text.primary",
            padding: 0,
            "&:hover": {
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#202C39" : "#DFDFE1",
            },
          }}
        >
          <ArrowIcon collapsed={collapsed} />
        </IconButton>
      </Box>

      <Box sx={{ py: 0.3, flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "auto" }}>
        {items.map((item, itemIndex) => {
          const itemPath = item.path ?? "";
          const itemHasChildren = (item.children?.length ?? 0) > 0;
          const itemChildSelected =
            itemHasChildren &&
            (item.children ?? []).some(
              (child) =>
                !!child.path &&
                (location.pathname === child.path ||
                  location.pathname.startsWith(`${child.path}/`)),
            );
          const isSelected =
            itemPath !== ""
              ? location.pathname === itemPath ||
                location.pathname.startsWith(`${itemPath}/`) ||
                itemChildSelected
              : itemChildSelected;
          const hasChildren = itemHasChildren;

          return (
            <Box key={`${item.label}-${itemIndex}`}>
              <Box
                component={itemPath ? NavLink : "div"}
                to={itemPath || undefined}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: collapsed ? 0.7 : 1.25,
                  py: collapsed ? 0.6 : 0.7,
                  minHeight: 34,
                  textDecoration: "none",
                  color: isSelected
                    ? (theme) =>
                        theme.palette.mode === "dark" ? "#F5F7FF" : activeText
                    : (theme) =>
                        theme.palette.mode === "dark" ? "#BFC7D9" : "#4C4D55",
                  bgcolor: isSelected ? activeBg : "transparent",
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: collapsed ? 9 : 13,
                  borderLeft: isSelected ? 3 : 0,
                  borderColor: isSelected ? activeBorder : "transparent",
                  opacity: collapsed ? 0.9 : 1,
                  borderRadius: 1,
                  "&:hover": {
                    bgcolor: isSelected ? activeBg : "rgba(124, 137, 255, 0.12)",
                    color: isSelected
                      ? (theme) =>
                          theme.palette.mode === "dark" ? "#F5F7FF" : activeText
                      : (theme) =>
                          theme.palette.mode === "dark" ? "#F5F7FF" : "#171717",
                  },
                }}
              >
                {!collapsed && (
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      minWidth: 10,
                      borderRadius: "50%",
                      bgcolor: item.color ?? "#8C7CF6",
                      boxShadow: isSelected ? "0 0 0 2px rgba(255,255,255,0.18)" : "none",
                    }}
                  />
                )}
                {!collapsed && item.label}
              </Box>

              {hasChildren && !collapsed && (
                <Box sx={{ pl: 2.2, pr: 0.5, pb: 0.3 }}>
                  {item.children?.map((child, childIndex) => {
                    const childPath = child.path ?? "";
                    const childSelected =
                      childPath !== "" &&
                      (location.pathname === childPath ||
                        location.pathname.startsWith(`${childPath}/`));

                    return (
                      <Box
                        key={`${child.label}-${childIndex}`}
                        component={childPath ? NavLink : "div"}
                        to={childPath || undefined}
                        sx={{
                          display: "block",
                          textDecoration: "none",
                          px: 1.2,
                          py: 0.8,
                          fontSize: 12,
                          color: childSelected
                            ? (theme) =>
                                theme.palette.mode === "dark" ? "#F5F7FF" : activeText
                            : (theme) =>
                                theme.palette.mode === "dark" ? "#BFC7D9" : "#4C4D55",
                          bgcolor: childSelected ? activeBg : "transparent",
                          borderLeft: childSelected ? 3 : 0,
                          borderColor: childSelected ? activeBorder : "transparent",
                          fontWeight: childSelected ? 700 : 500,
                          borderRadius: 1,
                          my: 0.2,
                          "&:hover": {
                            bgcolor: childSelected ? activeBg : "rgba(124, 137, 255, 0.12)",
                            color: childSelected
                              ? (theme) =>
                                  theme.palette.mode === "dark" ? "#F5F7FF" : activeText
                              : (theme) =>
                                  theme.palette.mode === "dark" ? "#F5F7FF" : "#171717",
                          },
                        }}
                      >
                        {child.label}
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
