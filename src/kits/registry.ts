import type { ComponentType } from "react";

type LazyImport = () => Promise<{ default: ComponentType }>;

export interface KitDef {
  id: string;
  label: string;
  tag: string;
  app: LazyImport;
  loader: LazyImport;
}

export const KITS: KitDef[] = [
  {
    id: "abyss",
    label: "ABYSS",
    tag: "Eldritch · Grimoire",
    app: () => import("./abyss"),
    loader: () => import("./abyss/Loader"),
  },
  {
    id: "nova",
    label: "NOVA",
    tag: "Neon · HUD",
    app: () => import("./nova"),
    loader: () => import("./nova/Loader"),
  },
];

export const DEFAULT_KIT = KITS[0].id;

export function resolveKit(id: string | null): string {
  return KITS.some((k) => k.id === id) ? (id as string) : DEFAULT_KIT;
}
