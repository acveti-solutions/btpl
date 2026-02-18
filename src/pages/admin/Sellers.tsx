import { sellers, formatCurrency } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminSellers() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold">Seller Attribution</h1>
        <p className="text-muted-foreground text-sm">Track which affiliate brought each seller.</p>
      </div>

      <div className="stat-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Seller</TableHead>
              <TableHead>Affiliate</TableHead>
              <TableHead className="text-right">Total Sales</TableHead>
              <TableHead>20K Status</TableHead>
              <TableHead>Bonus Paid</TableHead>
              <TableHead className="text-right">Monthly GMV</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sellers.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell className="text-muted-foreground">{s.affiliateName}</TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(s.totalSalesWithoutGst)}</TableCell>
                <TableCell>
                  <StatusBadge status={s.totalSalesWithoutGst >= 20000 ? "eligible" : "pending"} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={s.registrationBonusPaid ? "paid" : "pending"} />
                </TableCell>
                <TableCell className="text-right">{formatCurrency(s.monthlyGmv)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
