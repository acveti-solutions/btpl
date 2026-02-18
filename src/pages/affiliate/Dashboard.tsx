import { IndianRupee, Wallet, Users, UserCheck, TrendingUp, Clock, Copy, Share2 } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { affiliates, sellers, formatCurrency, monthlyEarnings } from "@/lib/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useToast } from "@/hooks/use-toast";

const currentAffiliate = affiliates[0];
const affiliateSellers = sellers.filter((s) => s.affiliateId === currentAffiliate.id);

export default function AffiliateDashboard() {
  const { toast } = useToast();
  const referralLink = `https://importerr.com/register?ref=${currentAffiliate.referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({ title: "Link copied!", description: "Referral link copied to clipboard." });
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {currentAffiliate.name}</h1>
        <p className="text-muted-foreground text-sm">Here's your affiliate performance overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard icon={<IndianRupee className="w-5 h-5" />} label="Total Earnings" value={formatCurrency(currentAffiliate.totalEarnings)} variant="accent" />
        <StatCard icon={<Wallet className="w-5 h-5" />} label="Wallet Balance" value={formatCurrency(currentAffiliate.walletBalance)} variant="default" />
        <StatCard icon={<Users className="w-5 h-5" />} label="Total Sellers" value={String(currentAffiliate.totalSellers)} variant="info" />
        <StatCard icon={<UserCheck className="w-5 h-5" />} label="Eligible Sellers" value={String(currentAffiliate.eligibleSellers)} subtitle="Crossed ₹20K threshold" variant="accent" />
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label="This Month GMV" value={formatCurrency(affiliateSellers.reduce((s, a) => s + a.monthlyGmv, 0))} variant="info" />
        <StatCard icon={<Clock className="w-5 h-5" />} label="Pending Commission" value={formatCurrency(12500)} variant="warning" />
      </div>

      {/* Referral Link */}
      <div className="stat-card">
        <h3 className="font-semibold mb-3">Your Referral Link</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <code className="flex-1 text-sm bg-muted px-4 py-2.5 rounded-lg break-all">{referralLink}</code>
          <div className="flex gap-2">
            <Button size="sm" onClick={copyLink}>
              <Copy className="w-4 h-4 mr-1" /> Copy
            </Button>
            <Button size="sm" variant="outline">
              <Share2 className="w-4 h-4 mr-1" /> Share
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Referral Code: <strong>{currentAffiliate.referralCode}</strong></p>
      </div>

      {/* Earnings Chart */}
      <div className="stat-card">
        <h3 className="font-semibold mb-4">Monthly Earnings</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyEarnings}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="registration" name="Registration Bonus" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="performance" name="Performance Commission" fill="hsl(160 84% 39%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Seller Progress */}
      <div className="stat-card">
        <h3 className="font-semibold mb-4">Seller Progress</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Seller Name</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Total Sales</TableHead>
                <TableHead>20K Status</TableHead>
                <TableHead className="text-right">Monthly GMV</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {affiliateSellers.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell className="font-medium">{seller.name}</TableCell>
                  <TableCell className="text-muted-foreground">{seller.joinDate}</TableCell>
                  <TableCell className="text-right">{formatCurrency(seller.totalSalesWithoutGst)}</TableCell>
                  <TableCell>
                    <StatusBadge status={seller.totalSalesWithoutGst >= 20000 ? "eligible" : "pending"} />
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(seller.monthlyGmv)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
