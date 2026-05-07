import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function AuthPage() {
  const navigate = useNavigate();
  const { user, loading, refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/admin");
  }, [loading, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "signup") {
        await auth.signup(email, password);
      } else {
        await auth.login(email, password);
      }
      await refresh();
      navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-background">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-2 text-foreground">
          {mode === "signin" ? "Admin Sign In" : "Create Admin Account"}
        </h1>
        <p className="text-sm text-muted-foreground mb-6">IndustryArch content management</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} maxLength={72} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Loading..." : mode === "signin" ? "Sign In" : "Sign Up"}
          </Button>
          <button
            type="button"
            onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }}
            className="text-sm text-muted-foreground hover:text-foreground w-full text-center"
          >
            {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
          <Link to="/" className="block text-xs text-muted-foreground hover:text-foreground text-center mt-4">
            ← Back to site
          </Link>
        </form>
      </Card>
    </div>
  );
}
