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
    badge: "g-badge g-badge-healthy",
    bar: "from-green-500/60 to-green-500/10",
  },
  degraded: {
    label: "Degraded",
    badge: "g-badge g-badge-degraded",
    bar: "from-yellow-500/60 to-yellow-500/10",
  },
  critical: {
    label: "Critical",
    badge: "g-badge g-badge-critical",
    bar: "from-red-500/60 to-red-500/10",
  },
  unknown: {
    label: "Unknown",
    badge: "g-badge g-badge-unknown",
    bar: "from-muted-foreground/60 to-muted-foreground/10",
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
    <Card className={cn("relative overflow-hidden g-panel g-panel-hover")}>
      <div className={cn("absolute top-0 inset-x-0 h-1 bg-gradient-to-r", config.bar)} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
              {category}
            </p>
            <h3 className="font-semibold text-base text-card-foreground">{name}</h3>
          </div>
          <div className="text-4xl select-none">{emoji}</div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/60">
          <span className={cn(config.badge)}>{config.label}</span>
          <span className="text-xs text-muted-foreground">{lastCheck}</span>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none" />
    </Card>
  );
};
