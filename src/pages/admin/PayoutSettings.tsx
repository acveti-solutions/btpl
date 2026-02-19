import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Lock, Unlock, CalendarDays, IndianRupee } from "lucide-react";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface MonthConfig {
  month: string;
  year: number;
  salesLocked: boolean;
  payoutLocked: boolean;
  payoutDate: string;
}

const currentYear = 2026;

const initialMonths: MonthConfig[] = MONTHS.map((m, i) => ({
  month: m,
  year: currentYear,
  salesLocked: i < 1, // Jan locked
  payoutLocked: i < 1,
  payoutDate: `${currentYear}-${String(i + 2 > 12 ? 1 : i + 2).padStart(2, "0")}-15`,
}));

export default function AdminPayoutSettings() {
  const { toast } = useToast();
  const [months, setMonths] = useState<MonthConfig[]>(initialMonths);
  const [selectedYear, setSelectedYear] = useState(String(currentYear));
  const [minimumWithdrawal, setMinimumWithdrawal] = useState(5000);
  const [salesIncentiveMonth, setSalesIncentiveMonth] = useState("February");
  const [payoutMonth, setPayoutMonth] = useState("March");

  const toggleLock = (index: number, field: "salesLocked" | "payoutLocked") => {
    setMonths(prev => prev.map((m, i) => i === index ? { ...m, [field]: !m[field] } : m));
  };

  const updatePayoutDate = (index: number, date: string) => {
    setMonths(prev => prev.map((m, i) => i === index ? { ...m, payoutDate: date } : m));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold">Payout & Month Settings</h1>
        <p className="text-muted-foreground text-sm">Configure sales incentive months, payout schedules, and lock periods.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="w-4 h-4" />
            <Label className="font-semibold">Current Sales Incentive Month</Label>
          </div>
          <Select value={salesIncentiveMonth} onValueChange={setSalesIncentiveMonth}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{MONTHS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Sales in this month are used for commission calculation.</p>
        </div>

        <div className="stat-card space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <IndianRupee className="w-4 h-4" />
            <Label className="font-semibold">Payout Month</Label>
          </div>
          <Select value={payoutMonth} onValueChange={setPayoutMonth}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{MONTHS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Month when commissions are paid out to affiliates.</p>
        </div>

        <div className="stat-card space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <IndianRupee className="w-4 h-4" />
            <Label className="font-semibold">Minimum Withdrawal (₹)</Label>
          </div>
          <Input type="number" value={minimumWithdrawal} onChange={(e) => setMinimumWithdrawal(Number(e.target.value))} />
          <p className="text-xs text-muted-foreground">Affiliates cannot withdraw below this amount.</p>
        </div>
      </div>

      <div className="stat-card space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Monthly Lock & Payout Schedule — {selectedYear}</h3>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Sales Lock</TableHead>
              <TableHead>Payout Lock</TableHead>
              <TableHead>Payout Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {months.map((m, i) => (
              <TableRow key={m.month}>
                <TableCell className="font-medium">{m.month}</TableCell>
                <TableCell>
                  <Button size="sm" variant={m.salesLocked ? "destructive" : "outline"} onClick={() => toggleLock(i, "salesLocked")} className="gap-1">
                    {m.salesLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                    {m.salesLocked ? "Locked" : "Open"}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant={m.payoutLocked ? "destructive" : "outline"} onClick={() => toggleLock(i, "payoutLocked")} className="gap-1">
                    {m.payoutLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                    {m.payoutLocked ? "Locked" : "Open"}
                  </Button>
                </TableCell>
                <TableCell>
                  <Input type="date" value={m.payoutDate} onChange={(e) => updatePayoutDate(i, e.target.value)} className="w-40" />
                </TableCell>
                <TableCell>
                  {m.salesLocked && m.payoutLocked ? (
                    <Badge variant="secondary">Finalized</Badge>
                  ) : m.salesLocked ? (
                    <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">Sales Closed</Badge>
                  ) : (
                    <Badge variant="outline">Active</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button onClick={() => toast({ title: "Settings saved", description: "Payout & month settings updated." })}>
        Save All Settings
      </Button>
    </div>
  );
}
