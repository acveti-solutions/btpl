import { AlertTriangle, ShieldAlert, UserX, TrendingDown } from "lucide-react";

const alerts = [
  { icon: UserX, title: "Duplicate PAN Detected", desc: "Seller 'Mehta Imports' and 'Mehta Trading' share PAN ABCDE5678F.", severity: "danger" },
  { icon: ShieldAlert, title: "Self-Referral Attempt", desc: "Affiliate 'Vikram Singh' tried registering as seller with same email.", severity: "danger" },
  { icon: TrendingDown, title: "High Refund Rate", desc: "Seller 'Desai Exports' has 45% return rate this month.", severity: "warning" },
  { icon: AlertTriangle, title: "Sudden GMV Spike", desc: "Seller 'Agarwal Supplies' GMV jumped 300% in 2 days.", severity: "warning" },
];

const severityClasses: Record<string, string> = {
  danger: "border-l-destructive bg-destructive/5",
  warning: "border-l-warning bg-warning/5",
};

export default function AdminFraud() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Fraud & Monitoring</h1>
        <p className="text-muted-foreground text-sm">Red flag alerts and suspicious activity tracker.</p>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <div key={i} className={`stat-card border-l-4 ${severityClasses[alert.severity]} flex items-start gap-4`}>
            <alert.icon className={`w-5 h-5 mt-0.5 shrink-0 ${alert.severity === "danger" ? "text-destructive" : "text-warning"}`} />
            <div>
              <h4 className="font-semibold text-sm">{alert.title}</h4>
              <p className="text-sm text-muted-foreground">{alert.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
