import type { ComponentType } from "react";

/* The single source of truth for which kits exist. Adding a theme is one entry
   here plus a src/kits/<id>/ folder that follows the kit contract:
     - index.tsx imports its theme/*.css and `export { default } from "./App"`
     - theme/global.css scopes all page chrome under html[data-kit="<id>"]
     - components + classes use a unique --<id>-* / .<id>-* namespace
   The shell, the persisted preference, and the FOUC-avoidance in main.tsx all
   derive from this list — nothing else hardcodes a kit id. */
export interface KitDef {
  id: string;
  label: string; // switcher label, e.g. "ABYSS"
  tag: string; // switcher subtitle
  load: () => Promise<{ default: ComponentType }>;
}

export const KITS: KitDef[] = [
  { id: "abyss", label: "ABYSS", tag: "Eldritch · Grimoire", load: () => import("./abyss") },
  { id: "nova", label: "NOVA", tag: "Sci-Fi · HUD", load: () => import("./nova") },
];

export const DEFAULT_KIT = KITS[0].id;

export function resolveKit(id: string | null): string {
  return KITS.some((k) => k.id === id) ? (id as string) : DEFAULT_KIT;
}
