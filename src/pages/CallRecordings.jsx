import { useState } from "react";
import { Play, Download, Search, Pause, Volume2 } from "lucide-react";
import { recordings } from "../lib/demoData";
import StatusBadge from "../components/StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CallRecordings() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [playing, setPlaying] = useState(false);

  const filtered = recordings.filter(r =>
    r.contact.toLowerCase().includes(search.toLowerCase()) ||
    r.company.toLowerCase().includes(search.toLowerCase()) ||
    r.outcome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Call Recordings</h2>
          <p className="text-sm text-muted-foreground mt-1">Review recordings, measure performance, and improve outcomes.</p>
        </div>
        <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search calls…" className="bg-transparent text-sm outline-none w-48" />
        </div>
      </div>

      <div className="glow-border rounded-xl bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="text-left px-5 py-3 font-medium">Contact</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Agent</th>
                <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Date</th>
                <th className="text-left px-5 py-3 font-medium">Duration</th>
                <th className="text-left px-5 py-3 font-medium">Outcome</th>
                <th className="text-left px-5 py-3 font-medium hidden lg:table-cell">Sentiment</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer" onClick={() => setSelected(r)}>
                  <td className="px-5 py-3">
                    <p className="font-medium">{r.contact}</p>
                    <p className="text-xs text-muted-foreground">{r.company} · {r.phone}</p>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground text-xs hidden md:table-cell">{r.agent}</td>
                  <td className="px-5 py-3 text-muted-foreground text-xs hidden sm:table-cell">{r.date}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.duration}</td>
                  <td className="px-5 py-3"><span className="text-xs">{r.outcome}</span></td>
                  <td className="px-5 py-3 hidden lg:table-cell"><StatusBadge status={r.sentiment} /></td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors"><Play className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"><Download className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Call Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl bg-card border-border max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg">{selected.contact} — {selected.company}</DialogTitle>
                <p className="text-xs text-muted-foreground">{selected.date} · {selected.duration} · {selected.agent}</p>
              </DialogHeader>

              {/* Audio Player */}
              <div className="glow-border rounded-xl bg-secondary/50 p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <button onClick={() => setPlaying(!playing)} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors">
                    {playing ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
                  </button>
                  <div className="flex-1">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: "35%" }} />
                    </div>
                    <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
                      <span>1:35</span><span>{selected.duration}</span>
                    </div>
                  </div>
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">Speed:</span>
                  {["0.5x", "1x", "1.5x", "2x"].map(s => (
                    <button key={s} className={`text-[10px] px-2 py-0.5 rounded ${s === "1x" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}>{s}</button>
                  ))}
                  <button className="ml-auto text-xs text-primary hover:underline flex items-center gap-1"><Download className="w-3 h-3" /> Download</button>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="summary" className="mt-2">
                <TabsList className="bg-secondary border border-border">
                  <TabsTrigger value="summary" className="text-xs">AI Summary</TabsTrigger>
                  <TabsTrigger value="transcript" className="text-xs">Transcript</TabsTrigger>
                  <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="space-y-3 mt-3">
                  <div className="glow-border rounded-lg bg-secondary/30 p-4">
                    <p className="text-sm leading-relaxed">{selected.summary}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-secondary/30 p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Sentiment</p>
                      <StatusBadge status={selected.sentiment} />
                      <span className="ml-2 text-sm font-medium">{(selected.sentimentScore * 100).toFixed(0)}%</span>
                    </div>
                    <div className="rounded-lg bg-secondary/30 p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Outcome</p>
                      <p className="text-sm font-medium">{selected.outcome}</p>
                    </div>
                    <div className="rounded-lg bg-secondary/30 p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Next Action</p>
                      <p className="text-sm">Schedule follow-up call</p>
                    </div>
                    <div className="rounded-lg bg-secondary/30 p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Lead Score</p>
                      <p className="text-sm font-medium">{selected.sentimentScore > 0.7 ? "High" : selected.sentimentScore > 0.4 ? "Medium" : "Low"}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.tags.map(t => <span key={t} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">{t}</span>)}
                  </div>
                </TabsContent>
                <TabsContent value="transcript" className="mt-3">
                  <div className="glow-border rounded-lg bg-secondary/30 p-4">
                    <pre className="text-sm whitespace-pre-wrap text-muted-foreground leading-relaxed font-inter">{selected.transcript || "Transcript not available for this recording."}</pre>
                  </div>
                </TabsContent>
                <TabsContent value="details" className="mt-3 space-y-2">
                  {[["Phone", selected.phone], ["Agent", selected.agent], ["Company", selected.company], ["Reviewed", selected.reviewed ? "Yes" : "No"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2 border-b border-border text-sm">
                      <span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>

              <div className="flex flex-wrap gap-2 mt-2">
                <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/80 transition-colors">Mark as Reviewed</button>
                <button className="px-3 py-1.5 rounded-lg bg-secondary text-foreground text-xs font-medium hover:bg-muted transition-colors">Add Note</button>
                <button className="px-3 py-1.5 rounded-lg bg-secondary text-foreground text-xs font-medium hover:bg-muted transition-colors">Create Follow-up</button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}