import { Box } from "@mui/material";
import { NavBarLogo } from "./NavBarLogo";
import { NavBarMenu } from "./NavBarMenu";
import { NavBarActions } from "./NavBarActions";

type NavBarProps = {
  user: { name: string; role: string };
  isDark: boolean;
  toggleTheme: () => void;
};

export function NavBar({ user, isDark, toggleTheme }: NavBarProps) {
  return (
    <Box
      component="header"
      sx={{
        minHeight: 54,
        display: "flex",
        alignItems: "stretch",
        flexWrap: { xs: "wrap", sm: "nowrap" },
        bgcolor: "#E3191B",
        color: "common.white",
        boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.14)",
      }}
    >
      <NavBarLogo />
      <NavBarMenu />
      <NavBarActions user={user} isDark={isDark} toggleTheme={toggleTheme} />
    </Box>
  );
}
