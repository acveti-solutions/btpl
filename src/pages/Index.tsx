import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, TrendingUp, IndianRupee } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">importerr.com</span>
          </div>
          <div className="flex gap-2">
            <Link to="/affiliate/dashboard">
              <Button variant="outline" size="sm">Affiliate Login</Button>
            </Link>
            <Link to="/admin/dashboard">
              <Button size="sm">Admin Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center">
        <div className="container py-20">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Grow Your Business with Our{" "}
              <span className="text-accent">Affiliate Program</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Refer sellers, earn ₹500 per registration bonus, and up to 3.25% performance commission on every sale. Track everything from your dashboard.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/affiliate/dashboard">
                <Button size="lg">Join as Affiliate</Button>
              </Link>
              <Link to="/admin/dashboard">
                <Button size="lg" variant="outline">Admin Panel</Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            <div className="stat-card text-center space-y-2">
              <Users className="w-8 h-8 mx-auto text-accent" />
              <h3 className="font-semibold">Refer Sellers</h3>
              <p className="text-sm text-muted-foreground">Share your unique link and bring sellers to the platform.</p>
            </div>
            <div className="stat-card text-center space-y-2">
              <TrendingUp className="w-8 h-8 mx-auto text-accent" />
              <h3 className="font-semibold">Track Performance</h3>
              <p className="text-sm text-muted-foreground">Monitor seller GMV and your commission in real-time.</p>
            </div>
            <div className="stat-card text-center space-y-2">
              <IndianRupee className="w-8 h-8 mx-auto text-accent" />
              <h3 className="font-semibold">Earn Commissions</h3>
              <p className="text-sm text-muted-foreground">Up to 3.25% commission on seller sales, paid monthly.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
