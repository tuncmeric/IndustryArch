// API client for the PHP backend on cPanel.
// All endpoints under /api/* — relative paths so dev (Vite proxy) and prod (same origin) both work.

const BASE = "/api";

async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const isForm = opts.body instanceof FormData;
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    ...opts,
    headers: {
      ...(isForm ? {} : { "Content-Type": "application/json" }),
      ...(opts.headers || {}),
    },
  });
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const body = isJson ? await res.json().catch(() => null) : await res.text();
  if (!res.ok) {
    const msg =
      (isJson && body && typeof body === "object" && "error" in body && typeof body.error === "string")
        ? body.error
        : typeof body === "string" && body
          ? body
          : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return body as T;
}

export interface AuthUser {
  id: number;
  email: string;
  is_admin: boolean;
}

export const auth = {
  login: (email: string, password: string) =>
    request<{ user: AuthUser }>("/auth/login.php", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  signup: (email: string, password: string) =>
    request<{ user: AuthUser }>("/auth/signup.php", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  logout: () => request<{ ok: true }>("/auth/logout.php", { method: "POST" }),
  me: () => request<{ user: AuthUser | null; admin_count: number }>("/auth/me.php"),
  claimAdmin: () => request<{ ok: true }>("/auth/claim-admin.php", { method: "POST" }),
};

export interface ContentRow {
  id: number;
  content_key: string;
  section: string;
  value_en: string;
  value_pl: string;
  value_tr: string;
  is_long: boolean;
  sort_order: number;
}

export const content = {
  list: () => request<ContentRow[]>("/content/list.php"),
  save: (id: number, patch: Partial<ContentRow>) =>
    request<{ ok: true }>(`/content/save.php`, {
      method: "POST",
      body: JSON.stringify({ id, patch }),
    }),
};

export interface ProjectRow {
  id: number;
  slug: string;
  category: string;
  title_en: string;
  title_pl: string;
  title_tr: string;
  description_en: string;
  description_pl: string;
  description_tr: string;
  location: string | null;
  scope: string | null;
  role: string | null;
  outcome: string | null;
  image_url: string | null;
  is_restricted: boolean;
  is_published: boolean;
  sort_order: number;
}

export const projects = {
  list: () => request<ProjectRow[]>("/projects/list.php"),
  save: (id: number, patch: Partial<ProjectRow>) =>
    request<{ ok: true }>(`/projects/save.php`, {
      method: "POST",
      body: JSON.stringify({ id, patch }),
    }),
  create: (slug: string) =>
    request<ProjectRow>(`/projects/create.php`, {
      method: "POST",
      body: JSON.stringify({ slug }),
    }),
  remove: (id: number) =>
    request<{ ok: true }>(`/projects/delete.php`, {
      method: "POST",
      body: JSON.stringify({ id }),
    }),
  uploadImage: async (id: number, file: File) => {
    const fd = new FormData();
    fd.append("id", String(id));
    fd.append("file", file);
    return request<{ image_url: string }>(`/projects/upload.php`, {
      method: "POST",
      body: fd,
    });
  },
};

export interface SettingRow {
  id: number;
  setting_key: string;
  setting_value: string;
  label: string | null;
  setting_type: string;
  sort_order: number;
}

export const settings = {
  list: () => request<SettingRow[]>("/settings/list.php"),
  save: (id: number, value: string) =>
    request<{ ok: true }>(`/settings/save.php`, {
      method: "POST",
      body: JSON.stringify({ id, value }),
    }),
  uploadImage: async (id: number, file: File) => {
    const fd = new FormData();
    fd.append("id", String(id));
    fd.append("file", file);
    return request<{ setting_value: string }>(`/settings/upload.php`, {
      method: "POST",
      body: fd,
    });
  },
};
