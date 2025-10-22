import { useState } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, AlertTriangle, DollarSign, LogOut, Building2, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { MetricCard } from "./MetricCard";
import { CreditCheckForm } from "./CreditCheckForm";
import { LenderDistribution } from "./LenderDistribution";

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [timePeriod, setTimePeriod] = useState<"today" | "week" | "month">("today");

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg">
                <img src='favicon.ico' />
              </div>
              <div>
                <p className="font-bold from-primary to-accent text-muted-foreground">Financial Services Checker Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate('/lenders')}>
                <Building2 className="w-4 h-4 mr-2" />
                View Lenders
              </Button>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Time Period Filter */}
        <div className="mb-6 flex justify-end">
          <Tabs value={timePeriod} onValueChange={(value) => setTimePeriod(value as "today" | "week" | "month")}>
            <TabsList className="bg-card border border-border shadow-sm">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <MetricCard
            title="Customers"
            value="3,842"
            trend="+8.3%"
            icon={UserCheck}
            variant="accent"
          />
          <MetricCard
            title="Total Checks"
            value="12,459"
            trend="+12.5%"
            icon={Users}
            variant="primary"
          />
          <MetricCard
            title="Avg Leverage Score"
            value="642"
            trend="-3.2%"
            icon={TrendingUp}
            variant="success"
          />
          <MetricCard
            title="Active Loans"
            value="8,234"
            trend="+5.8%"
            icon={DollarSign}
            variant="accent"
          />
          <MetricCard
            title="High Risk"
            value="1,247"
            trend="+2.1%"
            icon={AlertTriangle}
            variant="warning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Credit Check Form */}
          <div className="lg:col-span-2">
            <CreditCheckForm />
          </div>

          {/* Lender Distribution */}
          <div className="lg:col-span-1">
            <LenderDistribution />
          </div>
        </div>
      </main>
    </div>
  );
};
