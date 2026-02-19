import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Affiliate pages
import AffiliateDashboard from "./pages/affiliate/Dashboard";
import AffiliateSellers from "./pages/affiliate/Sellers";
import AffiliateEarnings from "./pages/affiliate/Earnings";
import AffiliateWithdrawals from "./pages/affiliate/Withdrawals";
import AffiliateProfile from "./pages/affiliate/Profile";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAffiliates from "./pages/admin/Affiliates";
import AdminSellers from "./pages/admin/Sellers";
import AdminCommissionSettings from "./pages/admin/CommissionSettings";
import AdminCommissionPlans from "./pages/admin/CommissionPlans";
import AdminPayoutSettings from "./pages/admin/PayoutSettings";
import AdminWithdrawals from "./pages/admin/Withdrawals";
import AdminFraud from "./pages/admin/Fraud";

const queryClient = new QueryClient();

const App = () => {
  const [role, setRole] = useState<"affiliate" | "admin">("affiliate");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Affiliate Routes */}
            <Route path="/affiliate/*" element={
              <AppLayout role="affiliate" onRoleSwitch={setRole}>
                <Routes>
                  <Route path="dashboard" element={<AffiliateDashboard />} />
                  <Route path="sellers" element={<AffiliateSellers />} />
                  <Route path="earnings" element={<AffiliateEarnings />} />
                  <Route path="withdrawals" element={<AffiliateWithdrawals />} />
                  <Route path="profile" element={<AffiliateProfile />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </AppLayout>
            } />

            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <AppLayout role="admin" onRoleSwitch={setRole}>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="affiliates" element={<AdminAffiliates />} />
                  <Route path="sellers" element={<AdminSellers />} />
                  <Route path="commission-settings" element={<AdminCommissionSettings />} />
                  <Route path="commission-plans" element={<AdminCommissionPlans />} />
                  <Route path="payout-settings" element={<AdminPayoutSettings />} />
                  <Route path="withdrawals" element={<AdminWithdrawals />} />
                  <Route path="fraud" element={<AdminFraud />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </AppLayout>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
