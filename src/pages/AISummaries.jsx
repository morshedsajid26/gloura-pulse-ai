import { Brain, AlertTriangle, Target, Trophy, Zap, Info } from "lucide-react";

const insights = [
  { icon: Target, title: "Top Opportunities", accent: "text-accent", items: ["Lukas Wagner — Strong buying intent, requested demo", "Laura Pichler — Interested in AI for patient intake, wants proposal", "Markus Huber — Booked consultation, follow up on pricing"] },
  { icon: AlertTriangle, title: "Calls Needing Attention", accent: "text-yellow-400", items: ["Elena Fischer — Escalated, compliance questions unresolved", "Anna Schmidt — Requested human callback, pending", "Sophie Berger — No answer, needs retry"] },
  { icon: Brain, title: "Common Objections", accent: "text-purple-400", items: ["I need to talk to a real person first", "Can you send me more details via email?", "The pricing seems high compared to alternatives", "We already have a solution in place"] },
  { icon: Trophy, title: "Best Performing Agent", accent: "text-green-400", items: ["Appointment Booking Agent — 84% success rate", "2,103 calls handled this month", "Average duration: 4m 05s", "Top outcome: Booked appointment (42%)"] },
  { icon: Zap, title: "Recommended Optimizations", accent: "text-primary", items: ["Add pricing FAQ to Inbound Sales Agent knowledge base", "Reduce average hold time for Customer Support Agent", "Enable German language for Outbound Lead Qualifier", "Create escalation path for compliance questions"] },
];

const summaryCards = [
  { period: "Today", calls: 73, booked: 12, escalated: 3, highlight: "Strong morning performance. 12 appointments booked before noon." },
  { period: "This Week", calls: 311, booked: 34, escalated: 8, highlight: "Conversion rate up 4.7% vs last week. Outbound leads improving." },
  { period: "This Month", calls: 1247, booked: 142, escalated: 31, highlight: "Best month yet. AI agents handling 89% of calls without escalation." },
];

export default function AISummaries() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">AI Summaries</h2>
        <p className="text-sm text-muted-foreground mt-1">Executive-level intelligence from your AI conversations.</p>
        <div className="flex items-start gap-2 mt-3 px-3 py-2.5 rounded-lg bg-yellow-500/8 border border-yellow-500/20 max-w-2xl">
          <Info className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-300/80 leading-relaxed">These summaries and recommendations are AI-generated and should be treated as guidance only. AI can make mistakes — always apply human judgment before acting on any insight.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {summaryCards.map(s => (
          <div key={s.period} className="glow-border rounded-xl bg-card p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{s.period} Summary</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div><p className="text-2xl font-bold">{s.calls}</p><p className="text-[10px] text-muted-foreground">Calls</p></div>
              <div><p className="text-2xl font-bold text-green-400">{s.booked}</p><p className="text-[10px] text-muted-foreground">Booked</p></div>
              <div><p className="text-2xl font-bold text-yellow-400">{s.escalated}</p><p className="text-[10px] text-muted-foreground">Escalated</p></div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{s.highlight}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {insights.map(ins => (
          <div key={ins.title} className="glow-border rounded-xl bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <ins.icon className={`w-4 h-4 ${ins.accent}`} />
              <h3 className="text-sm font-semibold">{ins.title}</h3>
            </div>
            <ul className="space-y-2">
              {ins.items.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}