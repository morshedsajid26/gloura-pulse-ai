const styles = {
  Active: "bg-green-500/10 text-green-400 border-green-500/20",
  Paused: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Training: "bg-primary/10 text-primary border-primary/20",
  Error: "bg-red-500/10 text-red-400 border-red-500/20",
  Connected: "bg-green-500/10 text-green-400 border-green-500/20",
  "Not connected": "bg-muted text-muted-foreground border-border",
  "Coming soon": "bg-primary/10 text-primary border-primary/20",
  Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Positive: "bg-green-500/10 text-green-400 border-green-500/20",
  Neutral: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Negative: "bg-red-500/10 text-red-400 border-red-500/20",
  Requested: "bg-muted text-muted-foreground border-border",
  Planned: "bg-primary/10 text-primary border-primary/20",
  "In Progress": "bg-accent/10 text-accent border-accent/20",
  Released: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${styles[status] || "bg-muted text-muted-foreground border-border"}`}>
      {status}
    </span>
  );
}