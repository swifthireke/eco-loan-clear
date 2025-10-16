import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  variant: "primary" | "success" | "warning" | "accent";
}

const variantStyles = {
  primary: "from-primary/10 to-primary/5 border-primary/20",
  success: "from-success/10 to-success/5 border-success/20",
  warning: "from-warning/10 to-warning/5 border-warning/20",
  accent: "from-accent/10 to-accent/5 border-accent/20",
};

const iconStyles = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  accent: "bg-accent/10 text-accent",
};

export const MetricCard = ({ title, value, trend, icon: Icon, variant }: MetricCardProps) => {
  const isPositive = trend.startsWith("+");
  
  return (
    <Card className={cn(
      "p-6 bg-gradient-to-br border transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
      variantStyles[variant]
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-lg", iconStyles[variant])}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={cn(
          "text-sm font-medium px-2 py-1 rounded-full",
          isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
        )}>
          {trend}
        </span>
      </div>
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      <p className="text-3xl font-bold text-foreground">{value}</p>
    </Card>
  );
};
