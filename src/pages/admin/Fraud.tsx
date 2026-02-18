import { AlertTriangle, ShieldAlert, UserX, TrendingDown, ShieldCheck, Eye, Ban, Activity } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";

const alerts = [
  { icon: UserX, title: "Duplicate PAN Detected", desc: "Seller 'Mehta Imports' and 'Mehta Trading' share PAN ABCDE5678F.", severity: "danger", time: "2 hours ago", action: "Investigate" },
  { icon: ShieldAlert, title: "Self-Referral Attempt", desc: "Affiliate 'Vikram Singh' tried registering as seller with same email.", severity: "danger", time: "5 hours ago", action: "Block" },
  { icon: TrendingDown, title: "High Refund Rate", desc: "Seller 'Desai Exports' has 45% return rate this month.", severity: "warning", time: "1 day ago", action: "Review" },
  { icon: AlertTriangle, title: "Sudden GMV Spike", desc: "Seller 'Agarwal Supplies' GMV jumped 300% in 2 days.", severity: "warning", time: "1 day ago", action: "Monitor" },
  { icon: UserX, title: "Duplicate GST Detected", desc: "Seller 'Kumar Electronics' and 'Kumar Traders' share GSTIN 27AABCU9603R1ZM.", severity: "danger", time: "3 days ago", action: "Investigate" },
];

const suspiciousSellers = [
  { name: "Mehta Trading", affiliate: "Rajesh Mehta", issue: "Duplicate PAN", gmv: "₹3,45,000", status: "blocked" },
  { name: "Desai Exports", affiliate: "Sunil Desai", issue: "High Refund Rate (45%)", gmv: "₹1,20,000", status: "suspended" },
  { name: "Agarwal Supplies", affiliate: "Priya Agarwal", issue: "GMV Spike (300%)", gmv: "₹8,50,000", status: "pending" },
  { name: "Kumar Electronics", affiliate: "Amit Kumar", issue: "Duplicate GST", gmv: "₹2,10,000", status: "blocked" },
];

const severityStyles: Record<string, { border: string; bg: string; icon: string }> = {
  danger: { border: "border-l-destructive", bg: "bg-destructive/5", icon: "text-destructive" },
  warning: { border: "border-l-warning", bg: "bg-warning/5", icon: "text-warning" },
};

export default function AdminFraud() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold">Fraud & Monitoring</h1>
        <p className="text-muted-foreground text-sm">Red flag alerts, suspicious activity tracker, and fraud prevention controls.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<AlertTriangle className="w-5 h-5" />} label="Active Alerts" value="5" variant="warning" />
        <StatCard icon={<Ban className="w-5 h-5" />} label="Blocked Sellers" value="2" variant="default" />
        <StatCard icon={<ShieldCheck className="w-5 h-5" />} label="Self-Referrals Blocked" value="3" variant="accent" />
        <StatCard icon={<Activity className="w-5 h-5" />} label="High Risk Affiliates" value="1" variant="info" />
      </div>

      {/* Fraud Rules Summary */}
      <div className="stat-card">
        <h3 className="font-semibold mb-3">Active Fraud Rules</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Duplicate PAN/GST Check", status: "Active", color: "text-accent" },
            { label: "Self-Referral Detection", status: "Active", color: "text-accent" },
            { label: "GMV Spike Alert (>200%)", status: "Active", color: "text-accent" },
            { label: "Refund Rate Alert (>30%)", status: "Active", color: "text-accent" },
          ].map((rule) => (
            <div key={rule.label} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border">
              <ShieldCheck className={`w-4 h-4 ${rule.color} shrink-0`} />
              <div className="min-w-0">
                <p className="text-xs font-medium truncate">{rule.label}</p>
                <p className={`text-[10px] ${rule.color} font-semibold uppercase`}>{rule.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Feed */}
      <div className="stat-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Recent Alerts</h3>
          <span className="text-xs text-muted-foreground">{alerts.length} alerts</span>
        </div>
        <div className="space-y-3">
          {alerts.map((alert, i) => {
            const style = severityStyles[alert.severity];
            return (
              <div key={i} className={`border-l-4 ${style.border} ${style.bg} rounded-lg p-4 flex items-start gap-4`}>
                <alert.icon className={`w-5 h-5 mt-0.5 shrink-0 ${style.icon}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-sm">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">{alert.desc}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{alert.time}</span>
                  </div>
                  <div className="mt-2">
                    <Button size="sm" variant={alert.severity === "danger" ? "destructive" : "outline"} className="h-7 text-xs">
                      <Eye className="w-3 h-3 mr-1" /> {alert.action}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Suspicious Sellers Table */}
      <div className="stat-card">
        <h3 className="font-semibold mb-4">Flagged Sellers</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Seller</TableHead>
                <TableHead>Referred By</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead className="text-right">GMV</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suspiciousSellers.map((seller) => (
                <TableRow key={seller.name}>
                  <TableCell className="font-medium">{seller.name}</TableCell>
                  <TableCell className="text-muted-foreground">{seller.affiliate}</TableCell>
                  <TableCell className="text-sm">{seller.issue}</TableCell>
                  <TableCell className="text-right">{seller.gmv}</TableCell>
                  <TableCell><StatusBadge status={seller.status} /></TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      <Eye className="w-3 h-3 mr-1" /> Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
