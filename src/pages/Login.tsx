import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const success = login(email, password);

    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome to the Credit Checker Platform"
      });
      navigate('/');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md border-border/50 shadow-elegant">
        <CardHeader className="space-y-4 text-center">
          <div className='mx-4'>
            <img src="/logo_new_2.png" alt="Credit Checker Platform" className="mx-auto w-2/3 my-4" />
          </div>
          <div>
            <CardDescription>Credable Financial Services Checker Platform</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>

            <div className="mt-6 p-4 rounded-lg bg-muted/50 space-y-2 text-xs hidden">
              <p className="font-semibold text-foreground">Test Credentials:</p>
              <div className="space-y-1 text-muted-foreground">
                <p><strong>Admin:</strong> admin@credable.com / admin123</p>
                <p><strong>Partner:</strong> partner@credable.com / partner123</p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
