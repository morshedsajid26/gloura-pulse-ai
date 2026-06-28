import MetricCard from "../components/MetricCard";
import { Clock, CreditCard, Download } from "lucide-react";

const COST_PER_MINUTE = 0.30;
const MINUTES_TODAY = 271;
const MINUTES_WEEK = 1147;
const MINUTES_MONTH = 4812;

export default function Billing() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="font-heading text-3xl font-semibold tracking-wide">Billing</h2>
        <p className="text-sm text-muted-foreground mt-1">Track usage, manage your plan, and download invoices.</p>
      </div>

      {/* Plan */}
      <div className="glow-border rounded-xl bg-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">Enterprise Plan</span>
            <p className="text-2xl font-bold mt-2">10,000 minutes / month</p>
            <p className="text-sm text-muted-foreground mt-1">Next invoice: June 1, 2026 · Payment: Active</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Download Invoice
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80 transition-colors">Upgrade Plan</button>
          </div>
        </div>
        {/* Usage bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-muted-foreground">Minutes used this month</span>
            <span className="font-medium">{MINUTES_MONTH.toLocaleString()} / 10,000</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all" style={{ width: `${(MINUTES_MONTH / 10000) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Cost per minute breakdown */}
      <div className="glow-border rounded-xl bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Cost Breakdown</h3>
          <span className="text-xs bg-secondary px-2.5 py-1 rounded-full text-muted-foreground">€{COST_PER_MINUTE.toFixed(2)} / minute</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Today", minutes: MINUTES_TODAY },
            { label: "This Week", minutes: MINUTES_WEEK },
            { label: "This Month", minutes: MINUTES_MONTH },
          ].map(({ label, minutes }) => (
            <div key={label} className="bg-secondary/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{label}</p>
              <p className="text-2xl font-heading font-semibold">€{(minutes * COST_PER_MINUTE).toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">{minutes.toLocaleString()} min × €{COST_PER_MINUTE.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Minutes Today" value="271" change={15.1} icon={Clock} />
        <MetricCard title="Minutes This Week" value="1,147" change={6.8} icon={Clock} />
        <MetricCard title="Minutes This Month" value="4,812" change={12.3} icon={Clock} />
        <MetricCard title="Avg Cost / Call" value="€0.42" change={-5.2} icon={CreditCard} />
      </div>

      {/* Invoice History */}
      <div className="glow-border rounded-xl bg-card">
        <h3 className="text-sm font-semibold px-5 pt-5 pb-3">Invoice History</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-border text-xs text-muted-foreground">
              <th className="text-left px-5 py-3 font-medium">Date</th>
              <th className="text-left px-5 py-3 font-medium">Minutes</th>
              <th className="text-left px-5 py-3 font-medium">Cost</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-right px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: "May 1, 2026", minutes: 9847 },
              { date: "Apr 1, 2026", minutes: 8932 },
              { date: "Mar 1, 2026", minutes: 10241 },
            ].map(inv => (
              <tr key={inv.date} className="border-t border-border hover:bg-secondary/30 transition-colors">
                <td className="px-5 py-3">{inv.date}</td>
                <td className="px-5 py-3 text-muted-foreground">{inv.minutes.toLocaleString()} min</td>
                <td className="px-5 py-3 font-medium">€{(inv.minutes * COST_PER_MINUTE).toFixed(2)}</td>
                <td className="px-5 py-3"><span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Paid</span></td>
                <td className="px-5 py-3 text-right"><button className="text-xs text-primary hover:underline">Download</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}