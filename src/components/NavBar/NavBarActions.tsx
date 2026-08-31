import { useState } from "react";
import { Box, IconButton, Popover, Tooltip } from "@mui/material";
import { BellIcon } from "./icons";
import { ProfileMenu } from "./ProfileMenu";

type NavBarActionsProps = {
  user: { name: string; role: string };
  isDark: boolean;
  toggleTheme: () => void;
};

export function NavBarActions({ user, isDark, toggleTheme }: NavBarActionsProps) {
  const [profileAnchor, setProfileAnchor] = useState<HTMLElement | null>(null);
  const profileOpen = Boolean(profileAnchor);

  return (
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
          px: { xs: 0.5, md: 0.75, lg: 1 },
          py: { xs: 0.5, md: 0.75, lg: 1 },
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
              width: { xs: "calc(100vw - 24px)", sm: 240 },
              maxWidth: 240,
              borderRadius: 2,
              bgcolor: "background.paper",
              color: "text.primary",
              boxShadow: "0 12px 28px rgba(0,0,0,.2)",
              overflow: "hidden",
            },
          },
        }}
      >
        <ProfileMenu user={user} isDark={isDark} toggleTheme={toggleTheme} />
      </Popover>
    </Box>
  );
}
