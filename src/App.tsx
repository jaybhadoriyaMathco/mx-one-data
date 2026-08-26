import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { BuildingBlocksPage } from "./pages/BuildingBlocksPage";
import { CommandCentrePage } from "./pages/CommandCentrePage";
import { Inventory360Page } from "./pages/Inventory360Page";
import { MarketPerformancePage } from "./pages/MarketPerformancePage";
import { SalesConsolePage } from "./pages/SalesConsolePage";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route
                index
                element={<Navigate to="/command-center" replace />}
              />
              <Route path="command-center" element={<CommandCentrePage />} />
              <Route path="sales-console" element={<SalesConsolePage />} />
              <Route
                path="market-performance"
                element={<MarketPerformancePage />}
              />
              <Route path="building-blocks" element={<BuildingBlocksPage />} />
              <Route path="inventory-360" element={<Inventory360Page />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
