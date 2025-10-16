import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ServiceStatus = "healthy" | "degraded" | "critical" | "unknown";

interface ServicePanelProps {
  name: string;
  status: ServiceStatus;
  category: string;
  lastCheck?: string;
  emoji: string;
}

const statusConfig = {
  healthy: {
    label: "Operational",
    className: "text-green-500 border-green-500/20 bg-green-500/5",
  },
  degraded: {
    label: "Degraded",
    className: "text-yellow-500 border-yellow-500/20 bg-yellow-500/5",
  },
  critical: {
    label: "Critical",
    className: "text-red-500 border-red-500/20 bg-red-500/5",
  },
  unknown: {
    label: "Unknown",
    className: "text-muted-foreground border-muted/20 bg-muted/5",
  },
};

export const ServicePanel = ({
  name,
  status,
  category,
  lastCheck = "Just now",
  emoji,
}: ServicePanelProps) => {
  const config = statusConfig[status];

  return (
    <Card
      className={cn(
        "relative overflow-hidden border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
        config.className
      )}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              {category}
            </p>
            <h3 className="font-semibold text-lg text-card-foreground">{name}</h3>
          </div>
          <div className="text-5xl animate-pulse">{emoji}</div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
          <span className="text-sm font-medium">{config.label}</span>
          <span className="text-xs text-muted-foreground">{lastCheck}</span>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none" />
    </Card>
  );
};
