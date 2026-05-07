import { useEffect, useState } from "react";
import { content as contentApi, type ContentRow } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Search, Save, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function AdminContent() {
  const { reload } = useI18n();
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [search, setSearch] = useState("");
  const [section, setSection] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<number | null>(null);
  const [edits, setEdits] = useState<Record<number, Partial<ContentRow>>>({});

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    try {
      const data = await contentApi.list();
      setRows(data);
    } catch (e) {
      alert("Failed to load: " + (e instanceof Error ? e.message : "unknown"));
    } finally {
      setLoading(false);
    }
  }

  function update(id: number, field: keyof ContentRow, value: string) {
    setEdits((p) => ({ ...p, [id]: { ...p[id], [field]: value } }));
  }

  async function save(row: ContentRow) {
    const patch = edits[row.id];
    if (!patch) return;
    setSavingKey(row.id);
    try {
      await contentApi.save(row.id, patch);
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, ...patch } : r)));
      setEdits((p) => {
        const n = { ...p };
        delete n[row.id];
        return n;
      });
      await reload();
    } catch (e) {
      alert("Save failed: " + (e instanceof Error ? e.message : "unknown"));
    } finally {
      setSavingKey(null);
    }
  }

  const sections = Array.from(new Set(rows.map((r) => r.section))).sort();
  const filtered = rows.filter((r) => {
    if (section !== "all" && r.section !== section) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      r.content_key.toLowerCase().includes(q) ||
      r.value_en.toLowerCase().includes(q) ||
      r.value_pl.toLowerCase().includes(q) ||
      r.value_tr.toLowerCase().includes(q)
    );
  });

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by key or text..." className="pl-9" />
        </div>
        <select value={section} onChange={(e) => setSection(e.target.value)} className="border border-input rounded-md px-3 py-2 bg-background text-sm">
          <option value="all">All sections ({rows.length})</option>
          {sections.map((s) => (
            <option key={s} value={s}>{s} ({rows.filter((r) => r.section === s).length})</option>
          ))}
        </select>
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} entries</p>

      <div className="space-y-3">
        {filtered.map((row) => {
          const e = edits[row.id] || {};
          const en = e.value_en ?? row.value_en;
          const pl = e.value_pl ?? row.value_pl;
          const tr = e.value_tr ?? row.value_tr;
          const dirty = !!edits[row.id];
          const long = row.is_long || en.length > 100 || pl.length > 100 || tr.length > 100;
          const Comp = long ? Textarea : Input;
          return (
            <Card key={row.id} className={`p-4 ${dirty ? "border-primary" : ""}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <code className="text-xs bg-muted px-2 py-1 rounded">{row.content_key}</code>
                  <span className="ml-2 text-xs text-muted-foreground">{row.section}</span>
                </div>
                <Button size="sm" disabled={!dirty || savingKey === row.id} onClick={() => save(row)}>
                  {savingKey === row.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                  <span className="ml-1">Save</span>
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs">EN — English</Label>
                  <Comp value={en} onChange={(ev) => update(row.id, "value_en", ev.target.value)} rows={long ? 3 : undefined} />
                </div>
                <div>
                  <Label className="text-xs">PL — Polski</Label>
                  <Comp value={pl} onChange={(ev) => update(row.id, "value_pl", ev.target.value)} rows={long ? 3 : undefined} />
                </div>
                <div>
                  <Label className="text-xs">TR — Türkçe</Label>
                  <Comp value={tr} onChange={(ev) => update(row.id, "value_tr", ev.target.value)} rows={long ? 3 : undefined} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
