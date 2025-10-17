import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a demo - in production, you would use proper authentication
    if (password === "admin123") {
      setIsLoggedIn(true);
      toast.success("Logged in successfully!");
    } else {
      toast.error("Incorrect password");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-gradient-to-br from-background to-muted">
        <Card className="w-full max-w-md shadow-elegant animate-fade-in">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-display">Admin Login</CardTitle>
            <CardDescription>Enter your password to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" variant="luxury" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32">
      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-display font-bold text-gradient-gold">
              Admin Dashboard
            </h1>
            <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
              Logout
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl font-display">Product Management</CardTitle>
              <CardDescription>
                To enable full product management capabilities, connect to Lovable Cloud for database features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  Connect Lovable Cloud to add, edit, and manage your products with a database.
                </p>
                <p className="text-sm text-muted-foreground">
                  This will enable authentication, database storage, and full CRUD operations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Admin;
