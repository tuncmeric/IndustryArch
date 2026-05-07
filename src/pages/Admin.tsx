import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Loader2, LogOut, ExternalLink } from "lucide-react";
import { AdminContent } from "@/components/admin/AdminContent";
import { AdminProjects } from "@/components/admin/AdminProjects";
import { AdminSettings } from "@/components/admin/AdminSettings";

export default function AdminPage() {
  const { user, isAdmin, loading, adminCount, refresh } = useAuth();
  const navigate = useNavigate();
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [loading, user, navigate]);

  async function claimAdmin() {
    setClaiming(true);
    try {
      await auth.claimAdmin();
      await refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed");
    } finally {
      setClaiming(false);
    }
  }

  async function signOut() {
    await auth.logout();
    await refresh();
    navigate("/");
  }

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <Card className="max-w-md p-8 text-center">
          <h1 className="text-xl font-bold mb-2">Access Restricted</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Signed in as <strong>{user.email}</strong>
          </p>
          {adminCount === 0 ? (
            <>
              <p className="text-sm mb-4">No admin exists yet. Claim admin access for this account:</p>
              <Button onClick={claimAdmin} disabled={claiming}>
                {claiming ? <Loader2 className="w-4 h-4 animate-spin" /> : "Claim Admin Access"}
              </Button>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Your account does not have admin privileges. Contact an existing admin.
            </p>
          )}
          <Button variant="ghost" size="sm" onClick={signOut} className="mt-4">
            <LogOut className="w-3 h-3 mr-1" /> Sign out
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <Link to="/"><Button variant="outline" size="sm"><ExternalLink className="w-3 h-3 mr-1" /> View Site</Button></Link>
          <Button variant="outline" size="sm" onClick={signOut}><LogOut className="w-3 h-3 mr-1" /> Sign out</Button>
        </div>
      </div>

      <Tabs defaultValue="content">
        <TabsList className="mb-6">
          <TabsTrigger value="content">Page Content</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="settings">Contact & Images</TabsTrigger>
        </TabsList>
        <TabsContent value="content"><AdminContent /></TabsContent>
        <TabsContent value="projects"><AdminProjects /></TabsContent>
        <TabsContent value="settings"><AdminSettings /></TabsContent>
      </Tabs>
    </div>
  );
}
