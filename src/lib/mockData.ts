export interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  walletBalance: number;
  totalEarnings: number;
  status: "active" | "pending" | "suspended" | "blocked";
  joinDate: string;
  totalSellers: number;
  eligibleSellers: number;
}

export interface Seller {
  id: string;
  name: string;
  affiliateId: string;
  affiliateName: string;
  totalSalesWithoutGst: number;
  registrationBonusPaid: boolean;
  joinDate: string;
  monthlyGmv: number;
  status: "active" | "inactive";
}

export interface Commission {
  id: string;
  affiliateId: string;
  affiliateName: string;
  sellerId: string;
  sellerName: string;
  type: "registration" | "performance";
  amount: number;
  status: "pending" | "approved" | "paid";
  month: string;
  date: string;
}

export interface Withdrawal {
  id: string;
  affiliateId: string;
  affiliateName: string;
  amount: number;
  status: "pending" | "approved" | "paid" | "rejected";
  requestDate: string;
  walletBalance: number;
}

export interface CommissionSlab {
  id: string;
  targetSales: number;
  commissionPercent: number;
}

export interface CommissionPlan {
  id: string;
  name: string;
  isDefault: boolean;
  registrationBonusThreshold: number;
  registrationBonusAmount: number;
  commissionSlabs: CommissionSlab[];
}

export interface SystemSettings {
  registrationBonusThreshold: number;
  registrationBonusAmount: number;
  minimumWithdrawal: number;
  commissionSlabs: CommissionSlab[];
}

export const commissionPlans: CommissionPlan[] = [
  {
    id: "plan-1",
    name: "Standard Plan",
    isDefault: true,
    registrationBonusThreshold: 20000,
    registrationBonusAmount: 500,
    commissionSlabs: [
      { id: "1", targetSales: 200000, commissionPercent: 2 },
      { id: "2", targetSales: 500000, commissionPercent: 2.5 },
      { id: "3", targetSales: 1000000, commissionPercent: 3 },
      { id: "4", targetSales: 1500000, commissionPercent: 3.25 },
      { id: "5", targetSales: 2000000, commissionPercent: 3.25 },
    ],
  },
  {
    id: "plan-2",
    name: "Premium Plan",
    isDefault: false,
    registrationBonusThreshold: 15000,
    registrationBonusAmount: 750,
    commissionSlabs: [
      { id: "6", targetSales: 150000, commissionPercent: 2.5 },
      { id: "7", targetSales: 400000, commissionPercent: 3 },
      { id: "8", targetSales: 800000, commissionPercent: 3.5 },
      { id: "9", targetSales: 1500000, commissionPercent: 4 },
    ],
  },
  {
    id: "plan-3",
    name: "Enterprise Plan",
    isDefault: false,
    registrationBonusThreshold: 10000,
    registrationBonusAmount: 1000,
    commissionSlabs: [
      { id: "10", targetSales: 100000, commissionPercent: 3 },
      { id: "11", targetSales: 300000, commissionPercent: 3.5 },
      { id: "12", targetSales: 700000, commissionPercent: 4 },
      { id: "13", targetSales: 1200000, commissionPercent: 4.5 },
    ],
  },
];

export const systemSettings: SystemSettings = {
  registrationBonusThreshold: 20000,
  registrationBonusAmount: 500,
  minimumWithdrawal: 5000,
  commissionSlabs: commissionPlans[0].commissionSlabs,
};

export const affiliates: Affiliate[] = [
  { id: "AFF001", name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210", referralCode: "RAHUL01", walletBalance: 34500, totalEarnings: 150000, status: "active", joinDate: "2025-01-15", totalSellers: 12, eligibleSellers: 8 },
  { id: "AFF002", name: "Priya Verma", email: "priya@gmail.com", phone: "9876543211", referralCode: "PRIYA02", walletBalance: 12000, totalEarnings: 87500, status: "active", joinDate: "2025-02-10", totalSellers: 8, eligibleSellers: 5 },
  { id: "AFF003", name: "Amit Patel", email: "amit@gmail.com", phone: "9876543212", referralCode: "AMIT03", walletBalance: 0, totalEarnings: 25000, status: "pending", joinDate: "2025-03-05", totalSellers: 3, eligibleSellers: 2 },
  { id: "AFF004", name: "Sneha Gupta", email: "sneha@gmail.com", phone: "9876543213", referralCode: "SNEHA04", walletBalance: 65000, totalEarnings: 250000, status: "active", joinDate: "2024-11-20", totalSellers: 22, eligibleSellers: 18 },
  { id: "AFF005", name: "Vikram Singh", email: "vikram@gmail.com", phone: "9876543214", referralCode: "VIKRAM05", walletBalance: 8000, totalEarnings: 45000, status: "suspended", joinDate: "2025-01-30", totalSellers: 6, eligibleSellers: 3 },
];

export const sellers: Seller[] = [
  { id: "SEL001", name: "Kumar Electronics", affiliateId: "AFF001", affiliateName: "Rahul Sharma", totalSalesWithoutGst: 520000, registrationBonusPaid: true, joinDate: "2025-02-01", monthlyGmv: 85000, status: "active" },
  { id: "SEL002", name: "Rathi Traders", affiliateId: "AFF001", affiliateName: "Rahul Sharma", totalSalesWithoutGst: 180000, registrationBonusPaid: true, joinDate: "2025-02-15", monthlyGmv: 42000, status: "active" },
  { id: "SEL003", name: "Mehta Imports", affiliateId: "AFF001", affiliateName: "Rahul Sharma", totalSalesWithoutGst: 15000, registrationBonusPaid: false, joinDate: "2025-03-10", monthlyGmv: 15000, status: "active" },
  { id: "SEL004", name: "Singh Hardware", affiliateId: "AFF002", affiliateName: "Priya Verma", totalSalesWithoutGst: 340000, registrationBonusPaid: true, joinDate: "2025-02-20", monthlyGmv: 68000, status: "active" },
  { id: "SEL005", name: "Patel Wholesalers", affiliateId: "AFF002", affiliateName: "Priya Verma", totalSalesWithoutGst: 1200000, registrationBonusPaid: true, joinDate: "2025-01-25", monthlyGmv: 200000, status: "active" },
  { id: "SEL006", name: "Agarwal Supplies", affiliateId: "AFF004", affiliateName: "Sneha Gupta", totalSalesWithoutGst: 2100000, registrationBonusPaid: true, joinDate: "2024-12-01", monthlyGmv: 350000, status: "active" },
  { id: "SEL007", name: "Joshi Textiles", affiliateId: "AFF004", affiliateName: "Sneha Gupta", totalSalesWithoutGst: 780000, registrationBonusPaid: true, joinDate: "2025-01-05", monthlyGmv: 130000, status: "active" },
  { id: "SEL008", name: "Desai Exports", affiliateId: "AFF004", affiliateName: "Sneha Gupta", totalSalesWithoutGst: 9500, registrationBonusPaid: false, joinDate: "2026-01-20", monthlyGmv: 9500, status: "active" },
];

export const commissions: Commission[] = [
  { id: "COM001", affiliateId: "AFF001", affiliateName: "Rahul Sharma", sellerId: "SEL001", sellerName: "Kumar Electronics", type: "registration", amount: 500, status: "paid", month: "2025-02", date: "2025-02-28" },
  { id: "COM002", affiliateId: "AFF001", affiliateName: "Rahul Sharma", sellerId: "SEL001", sellerName: "Kumar Electronics", type: "performance", amount: 13000, status: "paid", month: "2025-03", date: "2025-03-31" },
  { id: "COM003", affiliateId: "AFF001", affiliateName: "Rahul Sharma", sellerId: "SEL002", sellerName: "Rathi Traders", type: "registration", amount: 500, status: "approved", month: "2025-03", date: "2025-03-15" },
  { id: "COM004", affiliateId: "AFF002", affiliateName: "Priya Verma", sellerId: "SEL005", sellerName: "Patel Wholesalers", type: "performance", amount: 36000, status: "pending", month: "2026-01", date: "2026-01-31" },
  { id: "COM005", affiliateId: "AFF004", affiliateName: "Sneha Gupta", sellerId: "SEL006", sellerName: "Agarwal Supplies", type: "performance", amount: 68250, status: "paid", month: "2026-01", date: "2026-01-31" },
  { id: "COM006", affiliateId: "AFF004", affiliateName: "Sneha Gupta", sellerId: "SEL007", sellerName: "Joshi Textiles", type: "performance", amount: 19500, status: "approved", month: "2026-01", date: "2026-01-31" },
];

export const withdrawals: Withdrawal[] = [
  { id: "WD001", affiliateId: "AFF001", affiliateName: "Rahul Sharma", amount: 25000, status: "paid", requestDate: "2025-12-20", walletBalance: 34500 },
  { id: "WD002", affiliateId: "AFF004", affiliateName: "Sneha Gupta", amount: 50000, status: "approved", requestDate: "2026-01-15", walletBalance: 65000 },
  { id: "WD003", affiliateId: "AFF002", affiliateName: "Priya Verma", amount: 10000, status: "pending", requestDate: "2026-02-10", walletBalance: 12000 },
  { id: "WD004", affiliateId: "AFF005", affiliateName: "Vikram Singh", amount: 8000, status: "rejected", requestDate: "2026-02-05", walletBalance: 8000 },
];

export const monthlyEarnings = [
  { month: "Sep", registration: 2500, performance: 18000 },
  { month: "Oct", registration: 3000, performance: 24000 },
  { month: "Nov", registration: 1500, performance: 32000 },
  { month: "Dec", registration: 2000, performance: 28000 },
  { month: "Jan", registration: 4000, performance: 45000 },
  { month: "Feb", registration: 3500, performance: 52000 },
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getSlabForSales = (sales: number, slabs: CommissionSlab[]): CommissionSlab | null => {
  const sorted = [...slabs].sort((a, b) => b.targetSales - a.targetSales);
  for (const slab of sorted) {
    if (sales >= slab.targetSales) return slab;
  }
  return null;
};
