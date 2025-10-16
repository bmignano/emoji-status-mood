import { ServicePanel } from "@/components/ServicePanel";
import { WeatherBackground } from "@/components/WeatherBackground";
import { Activity, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowDashboard(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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

  // Calculate overall mood and weather
  const getOverallMood = () => {
    const total = services.length;
    const healthyPercentage = (statusCounts.healthy / total) * 100;
    const criticalCount = statusCounts.critical;
    const degradedCount = statusCounts.degraded;

    if (criticalCount > 0) return { 
      emoji: "😰", 
      label: "Under Stress", 
      color: "text-red-500",
      weather: "thunderstorm" as const
    };
    if (healthyPercentage >= 90) return { 
      emoji: "😊", 
      label: "Everything's Great!", 
      color: "text-green-500",
      weather: "sunny" as const
    };
    if (healthyPercentage >= 70) return { 
      emoji: "🙂", 
      label: "Mostly Good", 
      color: "text-green-400",
      weather: "partly-cloudy" as const
    };
    if (healthyPercentage >= 50 || degradedCount > 0) return { 
      emoji: "😐", 
      label: "Could Be Better", 
      color: "text-yellow-500",
      weather: "cloudy" as const
    };
    return { 
      emoji: "😢", 
      label: "Need Attention", 
      color: "text-red-500",
      weather: "rainy" as const
    };
  };

  const overallMood = getOverallMood();

  return (
    <div className="min-h-screen relative">
      <WeatherBackground weather={overallMood.weather} />
      
      {/* Hero Section with Overall Mood */}
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Infrastructure Mood Board</h1>
          </div>
          
          <div className="space-y-4">
            <div className="text-[180px] leading-none animate-pulse">
              {overallMood.emoji}
            </div>
            <p className={`text-4xl font-bold ${overallMood.color}`}>
              {overallMood.label}
            </p>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Monitoring {services.length} services across your infrastructure
            </p>
          </div>

          <div className="flex gap-6 justify-center text-sm pt-8">
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
            {statusCounts.unknown > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                <span className="text-foreground font-medium">{statusCounts.unknown} Unknown</span>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center">
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
          <p className="text-xs text-muted-foreground mt-2">Scroll for details</p>
        </div>
      </div>

      {/* Dashboard Grid - Shows on Scroll */}
      <div 
        className={`p-6 pb-24 transition-all duration-500 relative z-10 ${
          showDashboard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm -z-10" />
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Service Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServicePanel key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
