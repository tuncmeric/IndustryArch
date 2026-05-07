import { useEffect, useState } from "react";
import { settings as settingsApi } from "@/lib/api";

let cache: Record<string, string> | null = null;
const listeners = new Set<(s: Record<string, string>) => void>();

async function fetchSettings() {
  try {
    const rows = await settingsApi.list();
    const map: Record<string, string> = {};
    for (const r of rows) map[r.setting_key] = r.setting_value;
    cache = map;
    listeners.forEach((l) => l(map));
    return map;
  } catch {
    cache = {};
    return {};
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<Record<string, string>>(cache || {});
  useEffect(() => {
    listeners.add(setSettings);
    if (!cache) fetchSettings();
    else setSettings(cache);
    return () => {
      listeners.delete(setSettings);
    };
  }, []);
  return settings;
}
