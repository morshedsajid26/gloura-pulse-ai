import { useState } from "react";
import { dailyCallData, outcomeData, hourlyData } from "../lib/demoData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const filters = ["Today", "Yesterday", "Last 7 days", "Last 30 days", "This month"];

const Tip = ({ active = false, payload = [], label = "" }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg px-3 py-2 border border-border text-xs">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map((p, i) => <p key={i} className="text-foreground font-medium">{p.name}: {p.value}</p>)}
    </div>
  );
};

const ax = { axisLine: false, tickLine: false, tick: { fill: "hsl(220,10%,50%)", fontSize: 11 } };

export default function CallAnalytics() {
  const [active, setActive] = useState("Last 7 days");
  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Call Analytics</h2>
          <p className="text-sm text-muted-foreground mt-1">Turn calls into insights, summaries, and action.</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${active === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glow-border rounded-xl bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Calls Per Day</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={dailyCallData}>
              <XAxis dataKey="day" {...ax} /><YAxis {...ax} />
              <Tooltip content={<Tip />} />
              <Line type="monotone" dataKey="calls" stroke="hsl(230,80%,62%)" strokeWidth={2} dot={{ fill: "hsl(230,80%,62%)", r: 3 }} name="Calls" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="glow-border rounded-xl bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Minutes Per Day</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dailyCallData}>
              <XAxis dataKey="day" {...ax} /><YAxis {...ax} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="minutes" fill="hsl(190,90%,50%)" radius={[4, 4, 0, 0]} name="Minutes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glow-border rounded-xl bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Outcomes Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={outcomeData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {outcomeData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip content={<Tip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {outcomeData.map(o => (
              <div key={o.name} className="flex items-center gap-1.5 text-[11px]">
                <span className="w-2 h-2 rounded-full" style={{ background: o.fill }} />{o.name}
              </div>
            ))}
          </div>
        </div>
        <div className="glow-border rounded-xl bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Peak Call Hours</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hourlyData}>
              <XAxis dataKey="hour" {...ax} interval={3} /><YAxis {...ax} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="calls" fill="hsl(270,70%,60%)" radius={[3, 3, 0, 0]} name="Calls" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}