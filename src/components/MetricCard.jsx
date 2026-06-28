import { TrendingUp, TrendingDown } from "lucide-react";

export default function MetricCard({ title, value, change = undefined, changeLabel = "vs last period", icon: Icon = null, accent = "bg-primary/10" }) {
  const positive = change >= 0;
  return (
    <div className="glow-border rounded-xl bg-card p-5 hover:bg-secondary/50 transition-all group">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{title}</p>
        {Icon && <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent || "bg-primary/10"}`}><Icon className="w-4 h-4 text-primary" /></div>}
      </div>
      <p className="text-3xl font-bold tracking-tight">{value}</p>
      {change !== undefined && (
        <div className="flex items-center gap-1.5 mt-2">
          {positive ? <TrendingUp className="w-3 h-3 text-green-400" /> : <TrendingDown className="w-3 h-3 text-red-400" />}
          <span className={`text-xs font-medium ${positive ? "text-green-400" : "text-red-400"}`}>{positive ? "+" : ""}{change}%</span>
          <span className="text-xs text-muted-foreground">{changeLabel || "vs last period"}</span>
        </div>
      )}
    </div>
  );
}