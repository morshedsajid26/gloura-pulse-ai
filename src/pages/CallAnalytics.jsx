import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import { Loader2 } from "lucide-react";

const filters = ["Today", "Yesterday", "Last 7 days", "Last 30 days", "This month"];
const filterMap = {
  "Today": "today",
  "Yesterday": "yesterday",
  "Last 7 days": "last_7_days",
  "Last 30 days": "last_30_days",
  "This month": "this_month"
};

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
const COLORS = ['#4ade80', '#60a5fa', '#f472b6', '#a78bfa', '#fbbf24', '#f87171'];

export default function CallAnalytics() {
  const [active, setActive] = useState("Last 7 days");
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['callAnalytics', active],
    queryFn: async () => {
      const res = await api.get(`/api/v1/stats/analytics/?filter=${filterMap[active]}`);
      return res.data?.data || res.data;
    }
  });

  const callsPerDay = data?.calls_per_day || [];
  const minutesPerDay = data?.minutes_per_day || [];
  const peakHours = data?.peak_call_hours || [];
  const outcomes = (data?.outcome_breakdown || []).map((o, i) => ({
    ...o,
    fill: COLORS[i % COLORS.length]
  }));
  const summary = data?.summary || {};

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Call Analytics</h2>
          <p className="text-sm text-muted-foreground mt-1">Turn calls into insights, summaries, and action.</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filters.map(f => (
            <button 
              key={f} 
              onClick={() => setActive(f)} 
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${active === f ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(var(--primary),0.3)]" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-destructive gap-2">
          <p>Failed to load analytics data.</p>
          <p className="text-sm opacity-80">{error?.response?.data?.message || error?.message || "Unknown error"}</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glow-border rounded-xl bg-card p-4 flex flex-col justify-center items-center text-center">
              <p className="text-xs text-muted-foreground mb-1">Total Calls</p>
              <p className="text-2xl font-semibold">{summary.total_calls || 0}</p>
            </div>
            <div className="glow-border rounded-xl bg-card p-4 flex flex-col justify-center items-center text-center">
              <p className="text-xs text-muted-foreground mb-1">Total Minutes</p>
              <p className="text-2xl font-semibold">{summary.total_minutes || 0}</p>
            </div>
            <div className="glow-border rounded-xl bg-card p-4 flex flex-col justify-center items-center text-center">
              <p className="text-xs text-muted-foreground mb-1">Avg Duration</p>
              <p className="text-2xl font-semibold">{summary.average_duration || "0s"}</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="glow-border rounded-xl bg-card p-5">
              <h3 className="text-sm font-semibold mb-4">Calls Per Day</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={callsPerDay}>
                  <XAxis dataKey="label" {...ax} />
                  <YAxis {...ax} />
                  <Tooltip content={<Tip />} />
                  <Line type="monotone" dataKey="count" stroke="hsl(230,80%,62%)" strokeWidth={2} dot={{ fill: "hsl(230,80%,62%)", r: 3 }} name="Calls" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="glow-border rounded-xl bg-card p-5">
              <h3 className="text-sm font-semibold mb-4">Minutes Per Day</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={minutesPerDay}>
                  <XAxis dataKey="label" {...ax} />
                  <YAxis {...ax} />
                  <Tooltip content={<Tip />} />
                  <Bar dataKey="minutes" fill="hsl(190,90%,50%)" radius={[4, 4, 0, 0]} name="Minutes" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="glow-border rounded-xl bg-card p-5">
              <h3 className="text-sm font-semibold mb-4">Outcomes Breakdown</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={outcomes} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="count" nameKey="name">
                    {outcomes.map((e, i) => <Cell key={i} fill={e.fill} />)}
                  </Pie>
                  <Tooltip content={<Tip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 mt-2 justify-center">
                {outcomes.map(o => (
                  <div key={o.name} className="flex items-center gap-1.5 text-[11px]">
                    <span className="w-2 h-2 rounded-full" style={{ background: o.fill }} />
                    <span className="text-muted-foreground">{o.name}</span>
                    <span className="font-medium">({o.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glow-border rounded-xl bg-card p-5">
              <h3 className="text-sm font-semibold mb-4">Peak Call Hours</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={peakHours}>
                  <XAxis dataKey="label" {...ax} />
                  <YAxis {...ax} />
                  <Tooltip content={<Tip />} />
                  <Bar dataKey="count" fill="hsl(270,70%,60%)" radius={[3, 3, 0, 0]} name="Calls" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}