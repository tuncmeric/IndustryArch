import { useEffect, useState } from "react";
import { projects as projectsApi, type ProjectRow } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2, Plus, Trash2, Save, Upload, GripVertical } from "lucide-react";

const CATEGORIES = ["diplomatic", "residential", "commercial", "gastro", "institutional", "road", "social"];

export function AdminProjects() {
  const [rows, setRows] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [edits, setEdits] = useState<Record<number, Partial<ProjectRow>>>({});
  const [busy, setBusy] = useState<number | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await projectsApi.list();
      setRows(data);
    } catch (e) {
      alert("Failed to load: " + (e instanceof Error ? e.message : "unknown"));
    } finally {
      setLoading(false);
    }
  }

  function update(id: number, field: keyof ProjectRow, value: string | boolean | number) {
    setEdits((p) => ({ ...p, [id]: { ...p[id], [field]: value } }));
  }

  async function save(row: ProjectRow) {
    const patch = edits[row.id];
    if (!patch) return;
    setBusy(row.id);
    try {
      await projectsApi.save(row.id, patch);
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, ...patch } : r)));
      setEdits((p) => { const n = { ...p }; delete n[row.id]; return n; });
    } catch (e) {
      alert("Save failed: " + (e instanceof Error ? e.message : "unknown"));
    } finally {
      setBusy(null);
    }
  }

  async function remove(row: ProjectRow) {
    if (!confirm(`Delete project "${row.title_en}"?`)) return;
    setBusy(row.id);
    try {
      await projectsApi.remove(row.id);
      setRows((p) => p.filter((r) => r.id !== row.id));
    } catch (e) {
      alert("Delete failed: " + (e instanceof Error ? e.message : "unknown"));
    } finally {
      setBusy(null);
    }
  }

  async function add() {
    const slug = prompt("New project slug (lowercase, hyphens only):");
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      if (slug) alert("Invalid slug. Use lowercase letters, numbers, and hyphens.");
      return;
    }
    try {
      const created = await projectsApi.create(slug);
      setRows((p) => [...p, created]);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed");
    }
  }

  async function uploadImage(row: ProjectRow, file: File) {
    setBusy(row.id);
    try {
      const { image_url } = await projectsApi.uploadImage(row.id, file);
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, image_url } : r)));
    } catch (e) {
      alert("Upload failed: " + (e instanceof Error ? e.message : "unknown"));
    } finally {
      setBusy(null);
    }
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{rows.length} projects</p>
        <Button onClick={add}><Plus className="w-4 h-4 mr-1" /> Add Project</Button>
      </div>
      <div className="space-y-4">
        {rows.map((row) => {
          const e = edits[row.id] || {};
          const get = <K extends keyof ProjectRow>(k: K): ProjectRow[K] => (e[k] !== undefined ? (e[k] as ProjectRow[K]) : row[k]);
          const dirty = !!edits[row.id];
          return (
            <Card key={row.id} className={`p-4 ${dirty ? "border-primary" : ""}`}>
              <div className="flex items-start gap-4 mb-4">
                <GripVertical className="w-4 h-4 text-muted-foreground mt-2" />
                <div className="flex-1 grid md:grid-cols-3 gap-3">
                  <div>
                    <Label className="text-xs">Slug</Label>
                    <Input value={row.slug} disabled />
                  </div>
                  <div>
                    <Label className="text-xs">Category</Label>
                    <select value={get("category")} onChange={(ev) => update(row.id, "category", ev.target.value)} className="w-full border border-input rounded-md px-3 py-2 bg-background text-sm">
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs">Sort Order</Label>
                    <Input type="number" value={get("sort_order")} onChange={(ev) => update(row.id, "sort_order", parseInt(ev.target.value) || 0)} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" disabled={!dirty || busy === row.id} onClick={() => save(row)}>
                    {busy === row.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => remove(row)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3 mb-3">
                <div><Label className="text-xs">Title EN</Label><Input value={get("title_en")} onChange={(ev) => update(row.id, "title_en", ev.target.value)} /></div>
                <div><Label className="text-xs">Title PL</Label><Input value={get("title_pl")} onChange={(ev) => update(row.id, "title_pl", ev.target.value)} /></div>
                <div><Label className="text-xs">Title TR</Label><Input value={get("title_tr")} onChange={(ev) => update(row.id, "title_tr", ev.target.value)} /></div>
              </div>

              <div className="grid md:grid-cols-3 gap-3 mb-3">
                <div><Label className="text-xs">Description EN</Label><Textarea rows={3} value={get("description_en")} onChange={(ev) => update(row.id, "description_en", ev.target.value)} /></div>
                <div><Label className="text-xs">Description PL</Label><Textarea rows={3} value={get("description_pl")} onChange={(ev) => update(row.id, "description_pl", ev.target.value)} /></div>
                <div><Label className="text-xs">Description TR</Label><Textarea rows={3} value={get("description_tr")} onChange={(ev) => update(row.id, "description_tr", ev.target.value)} /></div>
              </div>

              <div className="grid md:grid-cols-4 gap-3 mb-3">
                <div><Label className="text-xs">Location</Label><Input value={get("location") || ""} onChange={(ev) => update(row.id, "location", ev.target.value)} /></div>
                <div><Label className="text-xs">Scope</Label><Input value={get("scope") || ""} onChange={(ev) => update(row.id, "scope", ev.target.value)} /></div>
                <div><Label className="text-xs">Role</Label><Input value={get("role") || ""} onChange={(ev) => update(row.id, "role", ev.target.value)} /></div>
                <div><Label className="text-xs">Outcome</Label><Input value={get("outcome") || ""} onChange={(ev) => update(row.id, "outcome", ev.target.value)} /></div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={!!get("is_published")} onChange={(ev) => update(row.id, "is_published", ev.target.checked)} />
                  Published
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={!!get("is_restricted")} onChange={(ev) => update(row.id, "is_restricted", ev.target.checked)} />
                  Restricted (NDA)
                </label>
                <div className="flex items-center gap-3 ml-auto">
                  {row.image_url && <img src={row.image_url} alt="" className="w-16 h-16 object-cover rounded border" />}
                  <label className="cursor-pointer">
                    <Button type="button" variant="outline" size="sm" asChild><span><Upload className="w-3 h-3 mr-1" />{row.image_url ? "Replace Image" : "Upload Image"}</span></Button>
                    <input type="file" accept="image/*" className="hidden" onChange={(ev) => { const f = ev.target.files?.[0]; if (f) uploadImage(row, f); }} />
                  </label>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
