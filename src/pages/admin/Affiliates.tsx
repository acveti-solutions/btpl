import { affiliates, sellers, formatCurrency } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AdminAffiliates() {
  const { toast } = useToast();

  const handleAction = (name: string, action: string) => {
    toast({ title: `${action} – ${name}`, description: `Affiliate has been ${action.toLowerCase()}.` });
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold">Affiliate Management</h1>
        <p className="text-muted-foreground text-sm">Approve, suspend, or manage affiliates.</p>
      </div>

      <div className="stat-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Sellers</TableHead>
              <TableHead className="text-right">Earnings</TableHead>
              <TableHead className="text-right">Wallet</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {affiliates.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.name}</TableCell>
                <TableCell className="text-muted-foreground">{a.email}</TableCell>
                <TableCell><code className="text-xs bg-muted px-1.5 py-0.5 rounded">{a.referralCode}</code></TableCell>
                <TableCell>{a.totalSellers}</TableCell>
                <TableCell className="text-right">{formatCurrency(a.totalEarnings)}</TableCell>
                <TableCell className="text-right">{formatCurrency(a.walletBalance)}</TableCell>
                <TableCell><StatusBadge status={a.status} /></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {a.status === "pending" && (
                      <Button size="sm" variant="outline" onClick={() => handleAction(a.name, "Approved")}>Approve</Button>
                    )}
                    {a.status === "active" && (
                      <Button size="sm" variant="outline" onClick={() => handleAction(a.name, "Suspended")}>Suspend</Button>
                    )}
                    {a.status === "suspended" && (
                      <Button size="sm" variant="outline" onClick={() => handleAction(a.name, "Reactivated")}>Reactivate</Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
