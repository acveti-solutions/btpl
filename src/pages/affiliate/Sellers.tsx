import { sellers, formatCurrency } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function AffiliateSellers() {
  const [filter, setFilter] = useState("all");
  const affiliateSellers = sellers.filter((s) => s.affiliateId === "AFF001");
  
  const filtered = affiliateSellers.filter((s) => {
    if (filter === "eligible") return s.totalSalesWithoutGst >= 20000;
    if (filter === "not-eligible") return s.totalSalesWithoutGst < 20000;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Sellers</h1>
          <p className="text-muted-foreground text-sm">Track your referred sellers and their performance.</p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sellers</SelectItem>
            <SelectItem value="eligible">Eligible (20K+)</SelectItem>
            <SelectItem value="not-eligible">Not Eligible</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="stat-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Seller Name</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Total Sales</TableHead>
              <TableHead>20K Status</TableHead>
              <TableHead>Bonus Paid</TableHead>
              <TableHead className="text-right">Monthly GMV</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((seller) => (
              <TableRow key={seller.id}>
                <TableCell className="font-medium">{seller.name}</TableCell>
                <TableCell className="text-muted-foreground">{seller.joinDate}</TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(seller.totalSalesWithoutGst)}</TableCell>
                <TableCell>
                  <StatusBadge status={seller.totalSalesWithoutGst >= 20000 ? "eligible" : "pending"} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={seller.registrationBonusPaid ? "paid" : "pending"} />
                </TableCell>
                <TableCell className="text-right">{formatCurrency(seller.monthlyGmv)}</TableCell>
                <TableCell><StatusBadge status={seller.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
