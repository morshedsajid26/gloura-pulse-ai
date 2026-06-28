import { company } from "../lib/demoData";
import { Switch } from "@/components/ui/switch";

const notifOptions = [
  { label: "Daily call report", desc: "Receive a summary every morning", default: true },
  { label: "Weekly performance report", desc: "Sent every Monday", default: true },
  { label: "Failed call alerts", desc: "Instant notification on failed calls", default: true },
  { label: "High-intent lead alerts", desc: "When a lead scores above 80%", default: false },
  { label: "Human escalation alerts", desc: "When AI escalates to a human", default: true },
  { label: "Billing alerts", desc: "Invoice and payment notifications", default: true },
];

export default function AccountSettings() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Account Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your company profile and preferences.</p>
      </div>

      {/* Company Profile */}
      <div className="glow-border rounded-xl bg-card p-5 space-y-4">
        <h3 className="text-sm font-semibold">Company Profile</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            ["Company Name", company.name],
            ["Billing Email", company.email],
            ["Main Contact", "Johannes Steiner"],
            ["Phone", "+43 1 234 5670"],
            ["Timezone", company.timezone],
            ["Data Retention", "12 months"],
          ].map(([label, value]) => (
            <div key={label}>
              <label className="text-xs text-muted-foreground">{label}</label>
              <input defaultValue={value} className="w-full mt-1 px-3 py-2 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary" />
            </div>
          ))}
        </div>
        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80 transition-colors">Save Changes</button>
      </div>

      {/* Notifications */}
      <div className="glow-border rounded-xl bg-card p-5 space-y-4">
        <h3 className="text-sm font-semibold">Notification Preferences</h3>
        <div className="space-y-3">
          {notifOptions.map(n => (
            <div key={n.label} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <Switch defaultChecked={n.default} />
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="glow-border rounded-xl bg-card p-5 space-y-4">
        <h3 className="text-sm font-semibold">Security</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <p className="text-sm">Change Password</p>
              <p className="text-xs text-muted-foreground">Update your account password</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-secondary text-sm hover:bg-muted transition-colors">Change</button>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <p className="text-sm">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
            </div>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">Coming soon</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm">Active Sessions</p>
              <p className="text-xs text-muted-foreground">1 active session</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-secondary text-sm hover:bg-muted transition-colors">Manage</button>
          </div>
        </div>
      </div>
    </div>
  );
}