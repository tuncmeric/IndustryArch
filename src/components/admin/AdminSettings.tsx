import { useEffect, useState } from "react";
import { settings as settingsApi, type SettingRow } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2, Save, Upload } from "lucide-react";

export function AdminSettings() {
  const [rows, setRows] = useState<SettingRow[]>([]);
  const [edits, setEdits] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<number | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await settingsApi.list();
      setRows(data);
    } catch (e) {
      alert("Failed to load: " + (e instanceof Error ? e.message : "unknown"));
    } finally {
      setLoading(false);
    }
  }

  async function save(row: SettingRow) {
    if (edits[row.id] === undefined) return;
    setBusy(row.id);
    try {
      await settingsApi.save(row.id, edits[row.id]);
      setRows((p) => p.map((r) => (r.id === row.id ? { ...r, setting_value: edits[row.id] } : r)));
      setEdits((p) => { const n = { ...p }; delete n[row.id]; return n; });
    } catch (e) {
      alert("Save failed: " + (e instanceof Error ? e.message : "unknown"));
    } finally {
      setBusy(null);
    }
  }

  async function uploadImage(row: SettingRow, file: File) {
    setBusy(row.id);
    try {
      const { setting_value } = await settingsApi.uploadImage(row.id, file);
      setRows((p) => p.map((r) => (r.id === row.id ? { ...r, setting_value } : r)));
    } catch (e) {
      alert("Upload failed: " + (e instanceof Error ? e.message : "unknown"));
    } finally {
      setBusy(null);
    }
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-3 max-w-4xl">
      {rows.map((row) => {
        const value = edits[row.id] !== undefined ? edits[row.id] : row.setting_value;
        const dirty = edits[row.id] !== undefined;
        return (
          <Card key={row.id} className={`p-4 ${dirty ? "border-primary" : ""}`}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <Label className="text-sm font-medium">{row.label || row.setting_key}</Label>
                <code className="ml-2 text-xs bg-muted px-2 py-0.5 rounded">{row.setting_key}</code>
              </div>
              <Button size="sm" disabled={!dirty || busy === row.id} onClick={() => save(row)}>
                {busy === row.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                <span className="ml-1">Save</span>
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Input value={value} onChange={(ev) => setEdits((p) => ({ ...p, [row.id]: ev.target.value }))} placeholder={row.setting_type === "image" ? "Upload an image or paste URL" : ""} />
              {row.setting_type === "image" && (
                <>
                  {row.setting_value && <img src={row.setting_value} alt="" className="w-16 h-16 object-cover rounded border" />}
                  <label className="cursor-pointer shrink-0">
                    <Button type="button" variant="outline" size="sm" asChild><span><Upload className="w-3 h-3 mr-1" />Upload</span></Button>
                    <input type="file" accept="image/*" className="hidden" onChange={(ev) => { const f = ev.target.files?.[0]; if (f) uploadImage(row, f); }} />
                  </label>
                </>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
