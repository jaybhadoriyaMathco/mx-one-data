import { useState } from "react";
import { Box, IconButton, Popover, Tooltip, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

type NavBarProps = {
  user: { name: string; role: string };
  isDark: boolean;
  toggleTheme: () => void;
};

const navigation = [
  ["COMMAND CENTRE", "/command-center"],
  ["SALES CONSOLE", "/sales-console"],
  ["MARKET PERFORMANCE", "/market-performance"],
  ["BUILDING BLOCKS", "/building-blocks"],
  ["INVENTORY 360", "/inventory-360"],
] as const;

function BellIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 13h4" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.4 2.5 3.5 5.5 3.5 9S14.4 18.5 12 21c-2.4-2.5-3.5-5.5-3.5-9S9.6 5.5 12 3Z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 5H5v14h5m5-4 4-3-4-3m4 3H9" />
    </svg>
  );
}

export function NavBar({ user, isDark, toggleTheme }: NavBarProps) {
  const [profileAnchor, setProfileAnchor] = useState<HTMLElement | null>(null);
  const profileOpen = Boolean(profileAnchor);

  return (
    <Box
      component="header"
      sx={{
        minHeight: { xs: 104, sm: 60 },
        display: "flex",
        alignItems: "stretch",
        flexWrap: { xs: "wrap", sm: "nowrap" },
        bgcolor: "#FF1414",
        color: "common.white",
      }}
    >
      <Box
        sx={{
          width: { xs: 180, sm: 176, xl: 205 },
          flex: { xs: "0 0 180px", sm: "0 0 176px", xl: "0 0 205px" },
          display: "flex",
          alignItems: "center",
          gap: { xs: 0.75, sm: 0.75, xl: 1 },
          px: { xs: 1.25, sm: 1.25, xl: 2 },
          borderRight: 1,
          borderColor: "rgba(255,255,255,.18)",
        }}
      >
        <Box
          sx={{
            fontSize: { xs: 15, sm: 15, xl: 18 },
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: "-.03em",
          }}
        >
          MARS
          <Typography
            sx={{
              mt: 0.5,
              color: "inherit",
              fontSize: { xs: 8, sm: 8, xl: 9 },
              lineHeight: 1,
            }}
          >
            Pet Nutrition
          </Typography>
        </Box>
        <Box
          sx={{
            height: 30,
            borderLeft: 1,
            borderColor: "rgba(255,255,255,.65)",
          }}
        />
        <Box
          sx={{
            fontSize: { xs: 8, sm: 8, xl: 10 },
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          A Better
          <br />
          <Box
            component="i"
            sx={{ fontFamily: "cursive", fontSize: { xs: 10, sm: 10, xl: 12 } }}
          >
            World For Pets
          </Box>
        </Box>
      </Box>
      <Box
        component="nav"
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", sm: "center" },
          flex: "1 1 auto",
          minWidth: 0,
          order: { xs: 3, sm: 0 },
          flexBasis: { xs: "100%", sm: "auto" },
          height: { xs: 40, sm: "auto" },
          overflowX: { xs: "auto", sm: "visible" },
        }}
      >
        {navigation.map(([label, path]) => (
          <Box
            component={NavLink}
            key={path}
            to={path}
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "rgba(255,255,255,.78)",
              background: isActive ? "rgba(190,0,10,.28)" : "transparent",
              boxShadow: isActive ? "inset 0 -4px #fff" : "none",
            })}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "0 0 auto",
              px: { xs: 1.25, sm: 1.75, xl: 2 },
              fontSize: { xs: 10, sm: 11, xl: 14 },
              fontWeight: 700,
              textDecoration: "none",
              whiteSpace: "nowrap",
              "&:hover": {
                color: "common.white",
                bgcolor: "rgba(190,0,10,.28)",
              },
            }}
          >
            {label}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 0.25, xl: 1.25 },
          px: { xs: 1, sm: 1.25, xl: 2.5 },
          ml: { xs: "auto", sm: 0 },
        }}
      >
        <Tooltip title="Notifications">
          <Box sx={{ position: "relative" }}>
            <IconButton
              aria-label="Notifications"
              sx={{
                color: "common.white",
                width: { xs: 32, xl: 38 },
                height: { xs: 32, xl: 38 },
                borderRadius: 3,
                "& svg": { width: 17, height: 17 },
              }}
            >
              <BellIcon />
            </IconButton>
            <Box
              component="span"
              sx={{
                position: "absolute",
                top: 2,
                right: 1,
                minWidth: 18,
                height: 18,
                px: 0.5,
                borderRadius: 5,
                bgcolor: "#FF8200",
                color: "#171717",
                fontSize: 11,
                fontWeight: 800,
                textAlign: "center",
                lineHeight: "18px",
              }}
            >
              3
            </Box>
          </Box>
        </Tooltip>
        <Box
          component="button"
          type="button"
          onClick={(event) => setProfileAnchor(event.currentTarget)}
          aria-label="Open user profile menu"
          aria-haspopup="true"
          aria-expanded={profileOpen ? "true" : undefined}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            minWidth: { xs: "auto", sm: 116, xl: 136 },
            px: {xs: 0.5, md: 0.75, lg: 1},
            py: {xs: 0.5, md: 0.75, lg: 1},
            ml: { xs: 0.5, sm: 1, md: 1, xl: 2 },
            border: 0,
            borderRadius: 0.5,
            bgcolor: "rgba(190,0,10,.3)",
            color: "inherit",
            textAlign: "left",
            cursor: "pointer",
            font: "inherit",
            "&:hover": { bgcolor: "rgba(190,0,10,.45)" },
          }}
        >
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              width: 30,
              height: 30,
              borderRadius: "50%",
              bgcolor: "common.white",
              color: "#FF1414",
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            RG
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Box
              component="strong"
              sx={{ display: "block", fontSize: { sm: 11, xl: 12 } }}
            >
              {user.name}
            </Box>
            <Box
              component="small"
              sx={{ display: "block", mt: 0.25, fontSize: { sm: 8, xl: 9 } }}
            >
              {user.role}
            </Box>
          </Box>
        </Box>
        <Popover
          open={profileOpen}
          anchorEl={profileAnchor}
          onClose={() => setProfileAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                width: { xs: "calc(100vw - 24px)", sm: 320 },
                maxWidth: 320,
                borderRadius: 2,
                bgcolor: "background.paper",
                color: "text.primary",
                boxShadow: "0 12px 28px rgba(0,0,0,.2)",
                overflow: "hidden",
              },
            },
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderBottom: 1,
              borderColor: "divider",
              fontWeight: 800,
              fontSize: 15,
            }}
          >
            {user.name} · {user.role}
          </Box>
          <ProfileRow icon={<GlobeIcon />} label="Language" disabled>
            <ProfileOption label="EN" active />
            <ProfileOption label="ES" />
          </ProfileRow>
          <ProfileRow icon={<MoonIcon />} label="Theme">
            <ProfileOption
              label="Light"
              active={!isDark}
              onClick={() => {
                if (isDark) toggleTheme();
              }}
            />
            <ProfileOption
              label="Dark"
              active={isDark}
              onClick={() => {
                if (!isDark) toggleTheme();
              }}
            />
          </ProfileRow>
          <ProfileRow icon={<SettingsIcon />} label="Settings" disabled />
          <ProfileRow icon={<SignOutIcon />} label="Sign out" disabled danger />
        </Popover>
      </Box>
    </Box>
  );
}

function ProfileRow({
  icon,
  label,
  children,
  disabled = false,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: 52,
        px: 2,
        gap: 1.25,
        borderBottom: 1,
        borderColor: "divider",
        color: danger
          ? "error.main"
          : disabled
            ? "text.secondary"
            : "text.primary",
        opacity: disabled && !danger ? 0.82 : 1,
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          width: 22,
          "& svg": { width: 19, height: 19 },
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, fontSize: 16 }}>{label}</Box>
      {children}
    </Box>
  );
}

function ProfileOption({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      disabled={!onClick}
      sx={{
        minWidth: 48,
        px: 1,
        py: 0.35,
        border: 0,
        borderRadius: 1.5,
        bgcolor: active ? "primary.main" : "action.hover",
        color: active ? "common.white" : "text.secondary",
        font: "inherit",
        fontSize: 14,
        fontWeight: 800,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {label}
    </Box>
  );
}
