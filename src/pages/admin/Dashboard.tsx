import { Users, UserCheck, IndianRupee, TrendingUp, Wallet, Clock } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { affiliates, formatCurrency } from "@/lib/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const topAffiliates = [...affiliates].sort((a, b) => b.totalEarnings - a.totalEarnings).slice(0, 5);
const chartData = topAffiliates.map((a) => ({ name: a.name.split(" ")[0], earnings: a.totalEarnings }));

const totalAffiliateSellers = affiliates.reduce((s, a) => s + a.totalSellers, 0);
const totalPayout = affiliates.reduce((s, a) => s + a.totalEarnings, 0);
const pendingWithdrawals = 18000;

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm">Overview of your affiliate program performance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={<Users className="w-5 h-5" />} label="Total Affiliates" value={String(affiliates.length)} variant="default" />
        <StatCard icon={<UserCheck className="w-5 h-5" />} label="Active Affiliates" value={String(affiliates.filter((a) => a.status === "active").length)} variant="accent" />
        <StatCard icon={<Users className="w-5 h-5" />} label="Total Sellers (via Affiliates)" value={String(totalAffiliateSellers)} variant="info" />
        <StatCard icon={<IndianRupee className="w-5 h-5" />} label="Total Payout" value={formatCurrency(totalPayout)} variant="accent" />
        <StatCard icon={<Wallet className="w-5 h-5" />} label="Pending Withdrawals" value={formatCurrency(pendingWithdrawals)} variant="warning" />
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Total Affiliate GMV" value={formatCurrency(5145000)} variant="info" />
      </div>

      <div className="stat-card">
        <h3 className="font-semibold mb-4">Top 5 Affiliates by Earnings</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
              <XAxis type="number" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={60} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar dataKey="earnings" fill="hsl(160 84% 39%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="stat-card">
        <h3 className="font-semibold mb-4">All Affiliates</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Sellers</TableHead>
                <TableHead className="text-right">Total Earnings</TableHead>
                <TableHead className="text-right">Wallet</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {affiliates.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell>{a.totalSellers} ({a.eligibleSellers} eligible)</TableCell>
                  <TableCell className="text-right">{formatCurrency(a.totalEarnings)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(a.walletBalance)}</TableCell>
                  <TableCell><StatusBadge status={a.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
