import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { BuildingBlocksPage } from "./pages/BuildingBlocksPage";
import { CommandCentrePage } from "./pages/CommandCentrePage";
import { Inventory360Page } from "./pages/Inventory360Page";
import { MarketPerformancePage } from "./pages/MarketPerformancePage";
import { SalesConsolePage } from "./pages/SalesConsolePage";
import {
  BuildingBlocksExecutivePage,
  BuildingBlocksFactVsFcstPage,
  BuildingBlocksPerformancePage,
  MarketBrandChannelMixPage,
  MarketCategorySkuPage,
  MarketDistributionPage,
  MarketExecutiveViewPage,
  MarketOverviewPage,
  MarketPricingPage,
  MarketShareVolumePage,
  MarketVsMarketPage,
} from "./pages/ModuleSubpages";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route index element={<Navigate to="/command-center" replace />} />
              <Route path="command-center" element={<CommandCentrePage />} />
              <Route path="sales-console" element={<SalesConsolePage />} />

              <Route
                path="market-performance"
                element={<MarketPerformancePage />}
              >
                <Route index element={<Navigate to="executive-view" replace />} />
                <Route path="executive-view" element={<MarketExecutiveViewPage />} />
                <Route path="market-overview" element={<MarketOverviewPage />}>
                  <Route index element={<Navigate to="share-volume" replace />} />
                  <Route path="share-volume" element={<MarketShareVolumePage />} />
                  <Route path="pricing-price-index" element={<MarketPricingPage />} />
                  <Route path="mars-distribution" element={<MarketDistributionPage />} />
                </Route>
                <Route path="mars-vs-market" element={<MarketVsMarketPage />}>
                  <Route index element={<Navigate to="category-sku" replace />} />
                  <Route path="category-sku" element={<MarketCategorySkuPage />} />
                  <Route path="brand-channel-mix" element={<MarketBrandChannelMixPage />} />
                </Route>
              </Route>

              <Route
                path="building-blocks"
                element={<BuildingBlocksPage />}
              >
                <Route index element={<Navigate to="executive" replace />} />
                <Route path="executive" element={<BuildingBlocksExecutivePage />} />
                <Route path="performance" element={<BuildingBlocksPerformancePage />} />
                <Route path="fact-vs-fcst" element={<BuildingBlocksFactVsFcstPage />} />
              </Route>

              <Route path="inventory-360" element={<Inventory360Page />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
