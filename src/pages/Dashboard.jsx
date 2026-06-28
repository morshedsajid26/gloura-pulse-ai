import { Phone, Clock, Calendar, Target, CheckCircle } from "lucide-react";
import MetricCard from "../components/MetricCard";
import { recordings, dailyCallData, outcomeData } from "../lib/demoData";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import StatusBadge from "../components/StatusBadge";
import { Link } from "react-router-dom";

const CustomTooltip = ({ active = false, payload = [], label = "" }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg px-3 py-2 border border-border text-xs">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map((p, i) => <p key={i} className="text-foreground font-medium">{p.name}: {p.value}</p>)}
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h2 className="font-heading text-3xl font-semibold tracking-wide">Dashboard Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">Monitor every AI conversation in one place.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <MetricCard title="Calls Today" value="73" change={12.5} icon={Phone} />
        <MetricCard title="Calls This Week" value="311" change={8.2} icon={Phone} />
        <MetricCard title="Minutes Today" value="271" change={15.1} icon={Clock} />
        <MetricCard title="Minutes This Week" value="1,147" change={6.8} icon={Clock} />
        <MetricCard title="Avg Duration" value="3m 42s" change={-2.1} icon={Clock} />
        <MetricCard title="Booked Appointments" value="34" change={22.4} icon={Calendar} />
        <MetricCard title="Conversion Rate" value="28.4%" change={4.7} icon={Target} />
        <MetricCard title="Success Rate" value="78%" change={3.2} icon={CheckCircle} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glow-border rounded-xl bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Call Activity — This Week</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={dailyCallData}>
              <defs>
                <linearGradient id="callGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(0,0%,70%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(0,0%,70%)" stopOpacity={0} />
                  </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(0,0%,40%)", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(0,0%,40%)", fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="calls" stroke="hsl(0,0%,75%)" fill="url(#callGrad)" strokeWidth={1.5} name="Calls" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glow-border rounded-xl bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Call Outcomes</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={outcomeData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {outcomeData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
            {outcomeData.map(o => (
              <div key={o.name} className="flex items-center gap-1.5 text-[11px]">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: o.fill }} />
                <span className="text-muted-foreground truncate">{o.name}</span>
                <span className="font-medium ml-auto">{o.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Calls */}
      <div className="glow-border rounded-xl bg-card">
        <div className="flex items-center justify-between p-5 pb-3">
          <h3 className="text-sm font-semibold">Recent Calls</h3>
          <Link to="/recordings" className="text-xs text-primary hover:underline">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-border text-xs text-muted-foreground">
                <th className="text-left px-5 py-3 font-medium">Contact</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Agent</th>
                <th className="text-left px-5 py-3 font-medium">Duration</th>
                <th className="text-left px-5 py-3 font-medium">Outcome</th>
                <th className="text-left px-5 py-3 font-medium hidden lg:table-cell">Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {recordings.slice(0, 5).map(r => (
                <tr key={r.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-3">
                    <p className="font-medium">{r.contact}</p>
                    <p className="text-xs text-muted-foreground">{r.company}</p>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground hidden md:table-cell">{r.agent}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.duration}</td>
                  <td className="px-5 py-3"><StatusBadge status={r.sentiment === "Positive" ? "Active" : r.sentiment === "Neutral" ? "Pending" : "Error"} /><span className="ml-2 text-xs">{r.outcome}</span></td>
                  <td className="px-5 py-3 hidden lg:table-cell"><StatusBadge status={r.sentiment} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}