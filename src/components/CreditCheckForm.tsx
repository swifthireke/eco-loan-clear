import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { CreditCheckResult } from "./CreditCheckResult";
import { useToast } from "@/hooks/use-toast";

// Dummy searchable customer records
const dummyCustomers = [
  "CUST-2024-5891",
  "CUST-2024-3421",
  "CUST-2024-7856",
  "CUST-2024-1092",
  "CUST-2024-6543",
  "258841234567", // M-Pesa number
  "258843456789", // M-Pesa number
  "258847891234", // M-Pesa number
];

export const CreditCheckForm = () => {
  const [customerId, setCustomerId] = useState("");
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedId = customerId.trim();
    
    if (!trimmedId) {
      toast({
        title: "Input required",
        description: "Please enter a customer ID or M-Pesa number",
        variant: "destructive",
      });
      return;
    }

    const customerExists = dummyCustomers.some(
      (id) => id.toLowerCase() === trimmedId.toLowerCase()
    );

    if (customerExists) {
      setShowResult(true);
      toast({
        title: "Customer found",
        description: "Loading credit check results...",
      });
    } else {
      setShowResult(false);
      toast({
        title: "Customer not found",
        description: "No records found for this ID. Try: CUST-2024-5891 or 258841234567",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Customer Leverage Check</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerId" className="text-foreground">Customer ID</Label>
            <div className="flex gap-3">
              <Input
                id="customerId"
                placeholder="Enter customer ID"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="flex-1 bg-background border-input"
              />
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all"
              >
                <Search className="w-4 h-4 mr-2" />
                Check
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Enter a customer identifier to view their leverage score, active loans, and repayment history.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Try: <span className="font-mono font-semibold">CUST-2024-5891</span> or <span className="font-mono font-semibold">258841234567</span>
          </p>
        </form>
      </Card>

      {showResult && <CreditCheckResult customerId={customerId} />}
    </div>
  );
};
