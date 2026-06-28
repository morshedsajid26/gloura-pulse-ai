import { useState } from "react";
import { teamMembers } from "../lib/demoData";
import StatusBadge from "../components/StatusBadge";
import { UserPlus, MoreVertical } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const roles = ["Owner", "Admin", "Manager", "Viewer", "Analyst", "Agent Operator"];

export default function TeamAccess() {
  const [showInvite, setShowInvite] = useState(false);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team Access</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage who can access your AI operations dashboard.</p>
        </div>
        <button onClick={() => setShowInvite(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80 transition-colors">
          <UserPlus className="w-4 h-4" /> Invite User
        </button>
      </div>

      <div className="glow-border rounded-xl bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="text-left px-5 py-3 font-medium">Member</th>
              <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Role</th>
              <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Last Login</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-right px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map(m => (
              <tr key={m.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                <td className="px-5 py-3">
                  <p className="font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </td>
                <td className="px-5 py-3 hidden sm:table-cell">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{m.role}</span>
                </td>
                <td className="px-5 py-3 text-muted-foreground text-xs hidden md:table-cell">{m.lastLogin}</td>
                <td className="px-5 py-3"><StatusBadge status={m.status} /></td>
                <td className="px-5 py-3 text-right">
                  <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"><MoreVertical className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Permissions */}
      <div className="glow-border rounded-xl bg-card p-5">
        <h3 className="text-sm font-semibold mb-4">Role Permissions</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { role: "Owner", perms: "Full access, billing, team management, integrations" },
            { role: "Admin", perms: "Analytics, manage calls, manage agents, invite users" },
            { role: "Manager", perms: "View calls, review recordings, assign follow-ups" },
            { role: "Viewer", perms: "Read-only dashboard access" },
            { role: "Analyst", perms: "Analytics and reporting, export reports" },
            { role: "Agent Operator", perms: "View assigned agents and performance only" },
          ].map(r => (
            <div key={r.role} className="rounded-lg bg-secondary/50 p-3">
              <p className="text-xs font-semibold mb-1">{r.role}</p>
              <p className="text-[11px] text-muted-foreground">{r.perms}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showInvite} onOpenChange={setShowInvite}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle>Invite Team Member</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <input className="w-full mt-1 px-3 py-2 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary" placeholder="email@company.com" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Role</label>
              <select className="w-full mt-1 px-3 py-2 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary">
                {roles.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80 transition-colors">Send Invitation</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}