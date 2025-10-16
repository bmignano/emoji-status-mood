import { ServicePanel } from "@/components/ServicePanel";
import { Activity } from "lucide-react";

const Index = () => {
  const services = [
    // Servers
    { name: "API Gateway", status: "healthy" as const, category: "Servers", emoji: "😊", lastCheck: "2m ago" },
    { name: "Load Balancer", status: "healthy" as const, category: "Servers", emoji: "😎", lastCheck: "1m ago" },
    { name: "Web Server 1", status: "degraded" as const, category: "Servers", emoji: "😐", lastCheck: "30s ago" },
    { name: "Web Server 2", status: "healthy" as const, category: "Servers", emoji: "🙂", lastCheck: "1m ago" },
    
    // Databases
    { name: "PostgreSQL Primary", status: "healthy" as const, category: "Database", emoji: "💪", lastCheck: "45s ago" },
    { name: "PostgreSQL Replica", status: "healthy" as const, category: "Database", emoji: "✨", lastCheck: "1m ago" },
    { name: "Redis Cache", status: "critical" as const, category: "Database", emoji: "😢", lastCheck: "3m ago" },
    { name: "MongoDB Cluster", status: "healthy" as const, category: "Database", emoji: "🚀", lastCheck: "2m ago" },
    
    // APIs & Services
    { name: "Auth Service", status: "healthy" as const, category: "Services", emoji: "🔐", lastCheck: "1m ago" },
    { name: "Payment Gateway", status: "healthy" as const, category: "Services", emoji: "💳", lastCheck: "30s ago" },
    { name: "Email Service", status: "degraded" as const, category: "Services", emoji: "😬", lastCheck: "5m ago" },
    { name: "Search Engine", status: "healthy" as const, category: "Services", emoji: "🔍", lastCheck: "1m ago" },
    
    // Storage & CDN
    { name: "S3 Storage", status: "healthy" as const, category: "Storage", emoji: "📦", lastCheck: "2m ago" },
    { name: "CDN", status: "healthy" as const, category: "Storage", emoji: "⚡", lastCheck: "1m ago" },
    { name: "Backup System", status: "unknown" as const, category: "Storage", emoji: "🤷", lastCheck: "10m ago" },
    
    // Network & Monitoring
    { name: "VPN Gateway", status: "healthy" as const, category: "Network", emoji: "🌐", lastCheck: "1m ago" },
    { name: "DNS Service", status: "healthy" as const, category: "Network", emoji: "🎯", lastCheck: "45s ago" },
    { name: "Firewall", status: "healthy" as const, category: "Network", emoji: "🛡️", lastCheck: "1m ago" },
  ];

  const statusCounts = {
    healthy: services.filter((s) => s.status === "healthy").length,
    degraded: services.filter((s) => s.status === "degraded").length,
    critical: services.filter((s) => s.status === "critical").length,
    unknown: services.filter((s) => s.status === "unknown").length,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Infrastructure Mood Board</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          A emotional dashboard for your services
        </p>
        
        <div className="flex gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-foreground font-medium">{statusCounts.healthy} Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-foreground font-medium">{statusCounts.degraded} Degraded</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-foreground font-medium">{statusCounts.critical} Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
            <span className="text-foreground font-medium">{statusCounts.unknown} Unknown</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <ServicePanel key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default Index;
