import { withdrawals, formatCurrency } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AdminWithdrawals() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold">Withdrawal Approvals</h1>
        <p className="text-muted-foreground text-sm">Review and approve affiliate withdrawal requests.</p>
      </div>

      <div className="stat-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Affiliate</TableHead>
              <TableHead className="text-right">Requested</TableHead>
              <TableHead className="text-right">Wallet</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawals.map((w) => (
              <TableRow key={w.id}>
                <TableCell className="font-medium">{w.affiliateName}</TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(w.amount)}</TableCell>
                <TableCell className="text-right text-muted-foreground">{formatCurrency(w.walletBalance)}</TableCell>
                <TableCell className="text-muted-foreground">{w.requestDate}</TableCell>
                <TableCell><StatusBadge status={w.status} /></TableCell>
                <TableCell>
                  {w.status === "pending" && (
                    <div className="flex gap-1">
                      <Button size="sm" onClick={() => toast({ title: "Approved", description: `${w.affiliateName}'s withdrawal approved.` })}>
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => toast({ title: "Rejected", description: `${w.affiliateName}'s withdrawal rejected.` })}>
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
