import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { BuildingBlocksPage } from "./pages/building-blocks/BuildingBlocksPage";
import { CommandCentrePage } from "./pages/CommandCentrePage";
import { Inventory360Page } from "./pages/Inventory360Page";
import { MarketPerformancePage } from "./pages/market-performance/MarketPerformancePage";
import { ExecutiveViewPage } from "./pages/market-performance/ExecutiveViewPage";
import { ShareVolumePage } from "./pages/market-performance/market-overview/ShareVolumePage";
import { PricingPriceIndexPage } from "./pages/market-performance/market-overview/PricingPriceIndexPage";
import { MarsDistributionPage } from "./pages/market-performance/market-overview/MarsDistributionPage";
import { MarketOverviewPage } from "./pages/market-performance/market-overview/MarketOverviewPage";
import { CategorySkuPage } from "./pages/market-performance/mars-vs-market/CategorySkuPage";
import { BrandChannelMixPage } from "./pages/market-performance/mars-vs-market/BrandChannelMixPage";
import { MarketVsMarketPage } from "./pages/market-performance/mars-vs-market/MarketVsMarketPage";
import { FactVsFcstPage } from "./pages/building-blocks/FactvsFcstPage";
import { ExecutivePage } from "./pages/building-blocks/ExecutivePage";
import { PerformancePage } from "./pages/building-blocks/PerformancePage";

import { SalesConsolePage } from "./pages/SalesConsolePage";

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
                <Route
                  path="executive-view"
                  element={<ExecutiveViewPage />}
                />
                <Route path="market-overview" element={<MarketOverviewPage />}>
                  <Route index element={<Navigate to="share-volume" replace />} />
                  <Route
                    path="share-volume"
                    element={<ShareVolumePage />}
                  />
                  <Route path="pricing-price-index" element={<PricingPriceIndexPage />} />
                  <Route path="mars-distribution" element={<MarsDistributionPage />} />
                </Route>
                <Route path="mars-vs-market" element={<MarketVsMarketPage />}>
                  <Route index element={<Navigate to="category-sku" replace />} />
                  <Route path="category-sku" element={<CategorySkuPage />} />
                  <Route path="brand-channel-mix" element={<BrandChannelMixPage />} />
                </Route>
              </Route>

              <Route
                path="building-blocks"
                element={<BuildingBlocksPage />}
              >
                <Route index element={<Navigate to="executive" replace />} />
                <Route path="executive" element={<ExecutivePage />} />
                <Route path="performance" element={<PerformancePage />} />
                <Route path="fact-vs-fcst" element={<FactVsFcstPage />} />
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
