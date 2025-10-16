import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const lenders = [
  { name: "QuickCash MZ", loans: 3247, percentage: 35, color: "bg-primary" },
  { name: "Vodacom M-Pesa", loans: 2891, percentage: 31, color: "bg-accent" },
  { name: "TechLend Finance", loans: 1834, percentage: 20, color: "bg-secondary" },
  { name: "Others", loans: 1262, percentage: 14, color: "bg-muted-foreground" },
];

export const LenderDistribution = () => {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border h-fit">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Lender Distribution</h3>
      <div className="space-y-4">
        {lenders.map((lender, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{lender.name}</span>
              <Badge variant="secondary" className="bg-muted text-foreground">
                {lender.loans.toLocaleString()}
              </Badge>
            </div>
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`absolute left-0 top-0 h-full ${lender.color} rounded-full transition-all duration-500`}
                style={{ width: `${lender.percentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{lender.percentage}% of total</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Active Loans</span>
          <span className="font-bold text-foreground">8,234</span>
        </div>
      </div>
    </Card>
  );
};
