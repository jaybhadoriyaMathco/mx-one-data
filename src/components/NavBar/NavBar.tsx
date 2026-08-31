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
        minHeight: 50,
        display: "flex",
        alignItems: "stretch",
        flexWrap: { xs: "wrap", sm: "nowrap" },
        bgcolor: "#FF1414",
        color: "common.white",
      }}
    >
      <NavBarLogo />
      <NavBarMenu />
      <NavBarActions user={user} isDark={isDark} toggleTheme={toggleTheme} />
    </Box>
  );
}
