import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Building2, TrendingUp, Users, DollarSign, ArrowLeft, LogOut } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const LENDERS_DATA = [
  {
    id: 1,
    name: 'M-Pesa Credit',
    totalLoans: 1245,
    activeLoans: 876,
    totalDisbursed: 45600000,
    averageTicket: 52000,
    defaultRate: 3.2,
    category: 'MNO Partner'
  },
  {
    id: 2,
    name: 'QuickCash Loans',
    totalLoans: 892,
    activeLoans: 623,
    totalDisbursed: 28400000,
    averageTicket: 31800,
    defaultRate: 5.8,
    category: 'Licensed Lender'
  },
  {
    id: 3,
    name: 'Vodacom Financial Services',
    totalLoans: 2156,
    activeLoans: 1543,
    totalDisbursed: 67200000,
    averageTicket: 31200,
    defaultRate: 2.1,
    category: 'MNO Partner'
  },
  {
    id: 4,
    name: 'Instant Credit Solutions',
    totalLoans: 567,
    activeLoans: 389,
    totalDisbursed: 15800000,
    averageTicket: 27900,
    defaultRate: 7.3,
    category: 'Third Party'
  },
  {
    id: 5,
    name: 'Digital Finance Plus',
    totalLoans: 1034,
    activeLoans: 721,
    totalDisbursed: 38900000,
    averageTicket: 37600,
    defaultRate: 4.5,
    category: 'Licensed Lender'
  }
];

export default function Lenders() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getRiskColor = (rate: number) => {
    if (rate < 3) return 'text-success';
    if (rate < 6) return 'text-warning';
    return 'text-destructive';
  };

  const getRiskBg = (rate: number) => {
    if (rate < 3) return 'bg-success/10';
    if (rate < 6) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Lender Directory</h1>
          <p className="text-muted-foreground">
            {isAdmin 
              ? 'Complete overview of all lending partners and their performance metrics'
              : 'View registered lending partners on the platform'
            }
          </p>
        </div>

        {/* Summary Cards */}
        {isAdmin && (
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardDescription>Total Lenders</CardDescription>
                <CardTitle className="text-2xl">{LENDERS_DATA.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> Active partners
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardDescription>Total Active Loans</CardDescription>
                <CardTitle className="text-2xl">
                  {LENDERS_DATA.reduce((sum, l) => sum + l.activeLoans, 0).toLocaleString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="w-3 h-3" /> Across all lenders
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardDescription>Total Disbursed</CardDescription>
                <CardTitle className="text-2xl">
                  {formatCurrency(LENDERS_DATA.reduce((sum, l) => sum + l.totalDisbursed, 0))}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> Cumulative volume
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardDescription>Avg. Default Rate</CardDescription>
                <CardTitle className="text-2xl">
                  {(LENDERS_DATA.reduce((sum, l) => sum + l.defaultRate, 0) / LENDERS_DATA.length).toFixed(1)}%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Portfolio health
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Lenders List */}
        <div className="grid gap-4">
          {LENDERS_DATA.map((lender) => (
            <Card key={lender.id} className="border-border/50 hover:border-primary/30 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{lender.name}</CardTitle>
                        <CardDescription>{lender.category}</CardDescription>
                      </div>
                    </div>
                  </div>
                  {isAdmin && (
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskBg(lender.defaultRate)} ${getRiskColor(lender.defaultRate)}`}>
                      {lender.defaultRate}% Default Rate
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active Loans</p>
                    <p className="text-2xl font-bold">{lender.activeLoans.toLocaleString()}</p>
                    {isAdmin && (
                      <Progress 
                        value={(lender.activeLoans / lender.totalLoans) * 100} 
                        className="mt-2 h-1"
                      />
                    )}
                  </div>
                  {isAdmin && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Loans</p>
                        <p className="text-2xl font-bold">{lender.totalLoans.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Disbursed</p>
                        <p className="text-2xl font-bold">{formatCurrency(lender.totalDisbursed)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Avg. Ticket Size</p>
                        <p className="text-2xl font-bold">{formatCurrency(lender.averageTicket)}</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
