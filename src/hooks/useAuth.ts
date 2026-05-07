import { useEffect, useState, useCallback } from "react";
import { auth, type AuthUser } from "@/lib/api";

interface AuthState {
  user: AuthUser | null;
  isAdmin: boolean;
  loading: boolean;
  adminCount: number;
  refresh: () => Promise<void>;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [adminCount, setAdminCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await auth.me();
      setUser(res.user);
      setAdminCount(res.admin_count);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    user,
    isAdmin: !!user?.is_admin,
    loading,
    adminCount,
    refresh,
  };
}
