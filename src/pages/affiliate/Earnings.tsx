import { commissions, formatCurrency, monthlyEarnings } from "@/lib/mockData";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { IndianRupee, Gift, TrendingUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const affiliateCommissions = commissions.filter((c) => c.affiliateId === "AFF001");
const totalRegistration = affiliateCommissions.filter((c) => c.type === "registration").reduce((s, c) => s + c.amount, 0);
const totalPerformance = affiliateCommissions.filter((c) => c.type === "performance").reduce((s, c) => s + c.amount, 0);

export default function AffiliateEarnings() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold">Earnings</h1>
        <p className="text-muted-foreground text-sm">Breakdown of your registration bonuses and performance commissions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={<Gift className="w-5 h-5" />} label="Registration Bonus" value={formatCurrency(totalRegistration)} variant="warning" />
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Performance Commission" value={formatCurrency(totalPerformance)} variant="accent" />
        <StatCard icon={<IndianRupee className="w-5 h-5" />} label="Total Earnings" value={formatCurrency(totalRegistration + totalPerformance)} variant="default" />
      </div>

      <div className="stat-card">
        <h3 className="font-semibold mb-4">Monthly Earnings Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyEarnings}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar dataKey="registration" name="Bonus" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="performance" name="Commission" fill="hsl(160 84% 39%)" radius={[4, 4, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="stat-card">
        <h3 className="font-semibold mb-4">Commission History</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {affiliateCommissions.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="text-muted-foreground">{c.date}</TableCell>
                <TableCell className="font-medium">{c.sellerName}</TableCell>
                <TableCell>
                  <span className={c.type === "registration" ? "status-badge-warning" : "status-badge-success"}>
                    {c.type === "registration" ? "Bonus" : "Commission"}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(c.amount)}</TableCell>
                <TableCell><StatusBadge status={c.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
