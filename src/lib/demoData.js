export const company = { name: "Steiner Group", email: "admin@steinergroup.at", plan: "Enterprise", timezone: "Europe/Vienna" };

export const agents = [
  { id: 1, name: "Inbound Sales Agent", status: "Active", calls: 1247, avgDuration: "3m 42s", successRate: 78, useCase: "Inbound sales qualification", number: "+43 1 234 5678", lastActive: "2 min ago" },
  { id: 2, name: "Outbound Lead Qualifier", status: "Active", calls: 892, avgDuration: "2m 18s", successRate: 65, useCase: "Outbound cold lead qualification", number: "+43 1 234 5679", lastActive: "5 min ago" },
  { id: 3, name: "Appointment Booking Agent", status: "Active", calls: 2103, avgDuration: "4m 05s", successRate: 84, useCase: "Schedule consultations", number: "+43 1 234 5680", lastActive: "1 min ago" },
  { id: 4, name: "Customer Support Agent", status: "Paused", calls: 567, avgDuration: "5m 22s", successRate: 91, useCase: "Post-sale support", number: "+43 1 234 5681", lastActive: "3 hours ago" },
];

export const callOutcomes = ["Booked appointment", "Interested lead", "Needs follow-up", "Not interested", "No answer", "Failed call", "Escalated to human", "Completed successfully"];

export const recordings = [
  { id: 1, contact: "Markus Huber", phone: "+43 660 123 4567", company: "Autohaus Wien", date: "2026-05-24 09:15", duration: "4m 32s", durationSec: 272, agent: "Inbound Sales Agent", outcome: "Booked appointment", sentiment: "Positive", sentimentScore: 0.87, summary: "Asked about pricing and availability. AI answered questions and booked a consultation for next Tuesday.", transcript: "Agent: Good morning, thank you for calling Steiner Group. How can I help you today?\nCaller: Hi, I'm interested in your premium package. Can you tell me more about pricing?\nAgent: Of course! Our premium package starts at €2,499 per month...", tags: ["high-intent", "pricing"], reviewed: true },
  { id: 2, contact: "Anna Schmidt", phone: "+43 660 234 5678", company: "Prime Estates", date: "2026-05-24 10:32", duration: "2m 11s", durationSec: 131, agent: "Outbound Lead Qualifier", outcome: "Needs follow-up", sentiment: "Neutral", sentimentScore: 0.52, summary: "Interested but requested a human callback before making a decision. Collected email and preferred callback time.", transcript: "Agent: Hello Anna, this is the AI assistant from Steiner Group...", tags: ["callback-requested"], reviewed: false },
  { id: 3, contact: "Lukas Wagner", phone: "+43 660 345 6789", company: "MedCare Clinic", date: "2026-05-24 11:05", duration: "6m 08s", durationSec: 368, agent: "Appointment Booking Agent", outcome: "Interested lead", sentiment: "Positive", sentimentScore: 0.91, summary: "Asked detailed questions about AI integration for their clinic. Showed strong buying intent and requested a demo.", transcript: "Agent: Welcome to Steiner Group. I understand you're looking into AI solutions for healthcare...", tags: ["high-intent", "demo-requested", "healthcare"], reviewed: false },
  { id: 4, contact: "Sophie Berger", phone: "+43 660 456 7890", company: "TechStart GmbH", date: "2026-05-24 08:45", duration: "1m 23s", durationSec: 83, agent: "Inbound Sales Agent", outcome: "No answer", sentiment: "N/A", sentimentScore: 0, summary: "Call went to voicemail. Left a brief message requesting callback.", transcript: "", tags: ["no-answer"], reviewed: true },
  { id: 5, contact: "Thomas Maier", phone: "+43 660 567 8901", company: "Autohaus Wien", date: "2026-05-23 14:20", duration: "3m 55s", durationSec: 235, agent: "Customer Support Agent", outcome: "Completed successfully", sentiment: "Positive", sentimentScore: 0.79, summary: "Existing customer asked about upgrading their plan. Explained benefits and sent upgrade link via email.", transcript: "Agent: Hello Thomas, welcome back...", tags: ["upsell", "existing-customer"], reviewed: true },
  { id: 6, contact: "Elena Fischer", phone: "+43 660 678 9012", company: "Prime Estates", date: "2026-05-23 16:10", duration: "5m 44s", durationSec: 344, agent: "Inbound Sales Agent", outcome: "Escalated to human", sentiment: "Negative", sentimentScore: 0.28, summary: "Customer had complex compliance questions the AI couldn't fully address. Escalated to human specialist with context summary.", transcript: "Agent: Thank you for calling...", tags: ["escalated", "compliance"], reviewed: false },
  { id: 7, contact: "Michael Gruber", phone: "+43 660 789 0123", company: "Steiner Group", date: "2026-05-23 11:30", duration: "2m 48s", durationSec: 168, agent: "Appointment Booking Agent", outcome: "Booked appointment", sentiment: "Positive", sentimentScore: 0.82, summary: "Quick booking for a product demo. Customer was already familiar with the offering.", transcript: "", tags: ["demo", "warm-lead"], reviewed: true },
  { id: 8, contact: "Laura Pichler", phone: "+43 660 890 1234", company: "MedCare Clinic", date: "2026-05-22 09:00", duration: "7m 12s", durationSec: 432, agent: "Outbound Lead Qualifier", outcome: "Interested lead", sentiment: "Positive", sentimentScore: 0.88, summary: "Extensive discussion about AI voice agents for patient intake. Very interested, requested proposal.", transcript: "", tags: ["high-intent", "proposal-requested"], reviewed: false },
];

export const teamMembers = [
  { id: 1, name: "Johannes Steiner", email: "johannes@steinergroup.at", role: "Owner", accessLevel: "Full Access", lastLogin: "2 min ago", status: "Active" },
  { id: 2, name: "Maria Hofmann", email: "maria@steinergroup.at", role: "Admin", accessLevel: "Admin", lastLogin: "1 hour ago", status: "Active" },
  { id: 3, name: "Peter Klinger", email: "peter@steinergroup.at", role: "Manager", accessLevel: "Manager", lastLogin: "3 hours ago", status: "Active" },
  { id: 4, name: "Sarah Weber", email: "sarah@steinergroup.at", role: "Analyst", accessLevel: "Analytics", lastLogin: "Yesterday", status: "Active" },
  { id: 5, name: "David Schwarz", email: "david@steinergroup.at", role: "Viewer", accessLevel: "Read Only", lastLogin: "2 days ago", status: "Pending" },
];

export const integrations = [
  { name: "HubSpot", icon: "🟠", status: "Connected", desc: "Sync leads and contacts with HubSpot CRM" },
  { name: "Salesforce", icon: "☁️", status: "Not connected", desc: "Enterprise CRM integration" },
  { name: "Google Sheets", icon: "📊", status: "Connected", desc: "Export call data to spreadsheets" },
  { name: "Google Calendar", icon: "📅", status: "Connected", desc: "Sync booked appointments" },
  { name: "WhatsApp", icon: "💬", status: "Coming soon", desc: "WhatsApp messaging analytics" },
  { name: "Zapier", icon: "⚡", status: "Not connected", desc: "Connect to 5,000+ apps" },
  { name: "Make", icon: "🔧", status: "Not connected", desc: "Advanced automation workflows" },
  { name: "Webhooks", icon: "🔗", status: "Connected", desc: "Custom webhook endpoints" },
  { name: "Email (SMTP)", icon: "📧", status: "Connected", desc: "Email notifications and reports" },
  { name: "SIP Trunk", icon: "📞", status: "Connected", desc: "Phone provider integration" },
];

export const dailyCallData = [
  { day: "Mon", calls: 42, minutes: 156 }, { day: "Tue", calls: 58, minutes: 210 },
  { day: "Wed", calls: 51, minutes: 189 }, { day: "Thu", calls: 67, minutes: 248 },
  { day: "Fri", calls: 73, minutes: 271 }, { day: "Sat", calls: 12, minutes: 44 },
  { day: "Sun", calls: 8, minutes: 29 },
];

export const outcomeData = [
  { name: "Booked", value: 34, fill: "hsl(0, 0%, 85%)" },
  { name: "Interested", value: 22, fill: "hsl(0, 0%, 65%)" },
  { name: "Follow-up", value: 18, fill: "hsl(0, 0%, 48%)" },
  { name: "Not interested", value: 12, fill: "hsl(0, 0%, 32%)" },
  { name: "No answer", value: 8, fill: "hsl(0, 0%, 20%)" },
  { name: "Escalated", value: 6, fill: "hsl(0, 0%, 14%)" },
];

export const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  calls: i < 8 ? Math.floor(Math.random() * 3) : i < 18 ? Math.floor(Math.random() * 12) + 3 : Math.floor(Math.random() * 5),
}));

export const featureRequests = [
  { id: 1, title: "Live call monitoring", desc: "Listen to AI calls in real-time", priority: "High", category: "Calls", status: "Planned", votes: 24 },
  { id: 2, title: "WhatsApp analytics", desc: "Track WhatsApp message performance", priority: "Medium", category: "Analytics", status: "Requested", votes: 18 },
  { id: 3, title: "Custom AI agent voices", desc: "Choose from different voice profiles", priority: "Medium", category: "AI Agent", status: "In Progress", votes: 31 },
  { id: 4, title: "Multi-language support", desc: "AI agents in German, French, Italian", priority: "High", category: "AI Agent", status: "In Progress", votes: 42 },
  { id: 5, title: "Advanced lead scoring", desc: "ML-based lead quality prediction", priority: "Low", category: "Analytics", status: "Requested", votes: 12 },
  { id: 6, title: "Billing API access", desc: "Programmatic billing management", priority: "Low", category: "Billing", status: "Released", votes: 8 },
];