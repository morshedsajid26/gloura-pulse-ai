import { agents } from "../lib/demoData";
import StatusBadge from "../components/StatusBadge";
import { Phone, Clock, Target, Pause, Play, Settings, Zap } from "lucide-react";

export default function Agents() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">AI Agents</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage and monitor your voice AI workforce.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {agents.map(a => (
          <div key={a.id} className="glow-border rounded-xl bg-card p-5 hover:bg-secondary/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold">{a.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{a.useCase}</p>
              </div>
              <StatusBadge status={a.status} />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-bold">{a.calls.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">Calls</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-bold">{a.avgDuration}</p>
                  <p className="text-[10px] text-muted-foreground">Avg Duration</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-bold">{a.successRate}%</p>
                  <p className="text-[10px] text-muted-foreground">Success</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground">
                <span>{a.number}</span> · <span>Active {a.lastActive}</span>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"><Settings className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
                  {a.status === "Active" ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors"><Zap className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}