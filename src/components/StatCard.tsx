import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  variant?: "default" | "accent" | "warning" | "info";
}

const variantClasses = {
  default: "border-l-primary",
  accent: "border-l-accent",
  warning: "border-l-warning",
  info: "border-l-info",
};

export function StatCard({ icon, label, value, subtitle, variant = "default" }: StatCardProps) {
  return (
    <div className={`stat-card border-l-4 ${variantClasses[variant]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="stat-label">{label}</p>
          <p className="stat-value mt-1">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className="text-muted-foreground">{icon}</div>
      </div>
    </div>
  );
}
