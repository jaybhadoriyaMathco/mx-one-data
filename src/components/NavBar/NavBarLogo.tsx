import { Box } from "@mui/material";
import marsLogo from "../../assets/logo/mars-pet-nutrition-logo-white.svg";

export function NavBarLogo() {
  return (
    <Box
      sx={{
        width: { xs: 180, sm: 260, xl: 320 },
        flex: { xs: "0 0 40px", sm: "0 0 40px", xl: "0 0 60px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 3, xl: 3 },
        borderRight: 1,
        borderColor: "rgba(255,255,255,.18)",
      }}
    >
      <Box
        component="img"
        src={marsLogo}
        alt="MARS Pet Nutrition"
        sx={{
          height: { xs: 25, sm: 25, xl: 30 },
          width: "auto",
        }}
      />
    </Box>
  );
}
