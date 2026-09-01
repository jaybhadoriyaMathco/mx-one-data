import { Box } from "@mui/material";
import { GlobeIcon, MoonIcon, SettingsIcon, SignOutIcon } from "./icons";

type ProfileMenuProps = {
  user: { name: string; role: string };
  isDark: boolean;
  toggleTheme: () => void;
};

export function ProfileMenu({ user, isDark, toggleTheme }: ProfileMenuProps) {
  return (
    <>
      <Box
        sx={{
          px: 1.5,
          py: 2.25,
          borderBottom: 1,
          borderColor: "divider",
          fontWeight: 700,
          color: "#8A8A8A",
          fontSize: 12,
        }}
      >
        {user.name} · {user.role}
      </Box>
      <ProfileRow icon={<GlobeIcon />} label="Language" disabled isDark={isDark}>
        <ProfileOption label="EN" active />
        <ProfileOption label="ES" />
      </ProfileRow>
      <ProfileRow icon={<MoonIcon />} label="Theme" isDark={isDark}>
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
      <ProfileRow icon={<SettingsIcon />} label="Settings" disabled isDark={isDark} />
      <ProfileRow icon={<SignOutIcon />} label="Sign out" disabled danger isDark={isDark} />
    </>
  );
}

function ProfileRow({
  icon,
  label,
  children,
  disabled = false,
  danger = false,
  isDark = false,
}: {
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  isDark?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: 54,
        px: 1.15,
        gap: 0.5,
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
      <Box sx={{ flex: 1, fontSize: 13, minWidth: 0, color: !isDark ? "#3C3C3C" : "#B4B4BE" }}>{label}</Box>
      <Box sx={{ display: "flex", gap: 0.5, ml: "auto" }}>{children}</Box>
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
        minWidth: 42,
        px: 0.5,
        py: 0.75,
        border: 0,
        borderRadius: 0.75,
        bgcolor: active ? "primary.main" : "action.hover",
        color: active ? "common.white" : "text.secondary",
        font: "inherit",
        fontSize: 11,
        fontWeight: 600,
        textAlign: "center",
        cursor: onClick ? "pointer" : "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {label}
    </Box>
  );
}
