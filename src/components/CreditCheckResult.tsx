import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  DollarSign,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CreditCheckResultProps {
  customerId: string;
}

// Mock data - in production this would come from the API
const mockData = {
  customerId: "CUST-2024-5891",
  leverageScore: 642,
  currentOutstanding: 45000,
  activeLoanCount: 3,
  retrievedAt: new Date().toISOString(),
  loanHistory: [
    {
      lenderName: "QuickCash MZ",
      amountDisbursed: 25000,
      amountRepaid: 18000,
      outstandingAmount: 7000,
      loanStartDate: "2024-08-15",
      lastRepaymentDate: "2024-10-10",
      loanStatus: "Active"
    },
    {
      lenderName: "Vodacom M-Pesa Advance",
      amountDisbursed: 30000,
      amountRepaid: 12000,
      outstandingAmount: 18000,
      loanStartDate: "2024-09-01",
      lastRepaymentDate: "2024-10-14",
      loanStatus: "Active"
    },
    {
      lenderName: "TechLend Finance",
      amountDisbursed: 50000,
      amountRepaid: 30000,
      outstandingAmount: 20000,
      loanStartDate: "2024-07-20",
      lastRepaymentDate: "2024-10-12",
      loanStatus: "Active"
    },
    {
      lenderName: "QuickCash MZ",
      amountDisbursed: 15000,
      amountRepaid: 15000,
      outstandingAmount: 0,
      loanStartDate: "2024-05-10",
      lastRepaymentDate: "2024-08-10",
      loanStatus: "Paid"
    }
  ]
};

const getLeverageLevel = (score: number) => {
  if (score >= 750) return { level: "Low Risk", color: "success", icon: CheckCircle };
  if (score >= 500) return { level: "Moderate Risk", color: "warning", icon: AlertCircle };
  return { level: "High Risk", color: "destructive", icon: AlertCircle };
};

export const CreditCheckResult = ({ customerId }: CreditCheckResultProps) => {
  const { level, color, icon: Icon } = getLeverageLevel(mockData.leverageScore);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Summary Card */}
      <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border backdrop-blur-sm">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Credit Check Result</h3>
            <p className="text-sm text-muted-foreground">Customer ID: {mockData.customerId}</p>
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "px-3 py-1",
              color === "success" && "bg-success/10 text-success border-success/20",
              color === "warning" && "bg-warning/10 text-warning border-warning/20",
              color === "destructive" && "bg-destructive/10 text-destructive border-destructive/20"
            )}
          >
            <Icon className="w-4 h-4 mr-2" />
            {level}
          </Badge>
        </div>

        {/* Leverage Score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Leverage Score</span>
            <span className="text-2xl font-bold text-foreground">{mockData.leverageScore}/1000</span>
          </div>
          <Progress 
            value={mockData.leverageScore / 10} 
            className={cn(
              "h-3",
              color === "success" && "[&>div]:bg-success",
              color === "warning" && "[&>div]:bg-warning",
              color === "destructive" && "[&>div]:bg-destructive"
            )}
          />
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Outstanding</span>
            </div>
            <p className="text-xl font-bold text-foreground">
              MWK {mockData.currentOutstanding.toLocaleString()}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Active Loans</span>
            </div>
            <p className="text-xl font-bold text-foreground">{mockData.activeLoanCount}</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-secondary" />
              <span className="text-sm text-muted-foreground">Last Updated</span>
            </div>
            <p className="text-sm font-medium text-foreground">
              {new Date(mockData.retrievedAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </Card>

      {/* Loan History */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Loan History</h3>
        <div className="space-y-3">
          {mockData.loanHistory.map((loan, index) => (
            <div 
              key={index} 
              className="p-4 rounded-lg border border-border bg-background hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{loan.lenderName}</h4>
                    <Badge 
                      variant={loan.loanStatus === "Active" ? "default" : "secondary"}
                      className={cn(
                        "text-xs",
                        loan.loanStatus === "Active" 
                          ? "bg-primary/10 text-primary border-primary/20" 
                          : "bg-success/10 text-success border-success/20"
                      )}
                    >
                      {loan.loanStatus}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Started: {new Date(loan.loanStartDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Last Payment: {new Date(loan.lastRepaymentDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Disbursed</p>
                  <p className="font-semibold text-foreground">MWK {loan.amountDisbursed.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Repaid</p>
                  <p className="font-semibold text-success">MWK {loan.amountRepaid.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Outstanding</p>
                  <p className={cn(
                    "font-semibold",
                    loan.outstandingAmount > 0 ? "text-warning" : "text-success"
                  )}>
                    MWK {loan.outstandingAmount.toLocaleString()}
                  </p>
                </div>
              </div>
              
              {loan.loanStatus === "Active" && (
                <div className="mt-3">
                  <Progress 
                    value={(loan.amountRepaid / loan.amountDisbursed) * 100} 
                    className="h-2 [&>div]:bg-success"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {((loan.amountRepaid / loan.amountDisbursed) * 100).toFixed(1)}% repaid
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
