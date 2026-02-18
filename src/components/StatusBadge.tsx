interface StatusBadgeProps {
  status: string;
}

const statusMap: Record<string, string> = {
  active: "status-badge-success",
  eligible: "status-badge-success",
  paid: "status-badge-success",
  approved: "status-badge-info",
  pending: "status-badge-warning",
  rejected: "status-badge-danger",
  suspended: "status-badge-warning",
  blocked: "status-badge-danger",
  inactive: "status-badge-danger",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={statusMap[status] || "status-badge-info"}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
