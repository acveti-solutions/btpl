import { withdrawals, formatCurrency } from "@/lib/mockData";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Wallet, ArrowDownToLine } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const affiliateWithdrawals = withdrawals.filter((w) => w.affiliateId === "AFF001");

export default function AffiliateWithdrawals() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold">Withdraw</h1>
        <p className="text-muted-foreground text-sm">Request payout from your wallet balance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard icon={<Wallet className="w-5 h-5" />} label="Wallet Balance" value={formatCurrency(34500)} variant="accent" />
        <StatCard icon={<ArrowDownToLine className="w-5 h-5" />} label="Min Withdrawal" value={formatCurrency(5000)} variant="default" />
      </div>

      <div className="stat-card">
        <h3 className="font-semibold mb-4">Request Withdrawal</h3>
        <div className="grid gap-4 max-w-md">
          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input id="amount" type="number" placeholder="Enter amount" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="bank">Bank Account</Label>
            <Input id="bank" value="HDFC Bank ****4521" readOnly className="mt-1 bg-muted" />
          </div>
          <Button
            className="w-fit"
            onClick={() => toast({ title: "Request submitted", description: "Your withdrawal request is pending admin approval." })}
          >
            Submit Withdrawal Request
          </Button>
        </div>
      </div>

      <div className="stat-card">
        <h3 className="font-semibold mb-4">Withdrawal History</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {affiliateWithdrawals.map((w) => (
              <TableRow key={w.id}>
                <TableCell className="text-muted-foreground">{w.requestDate}</TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(w.amount)}</TableCell>
                <TableCell><StatusBadge status={w.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
