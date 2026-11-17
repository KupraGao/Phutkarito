export const modelSlots = {
  jar: "/models/honey-jar.glb",
  honeycomb: "/models/honeycomb.glb",
  bee: "/models/bee.glb",
  flower: "/models/acacia-flower.glb",
  leaf: "/models/chestnut-leaf.glb",
  dipper: "/models/honey-dipper.glb",
  drop: "/models/honey-drop.webp",
} as const;

export type Scene = {
  id: string;
  word: string;
  visual: "jar" | "hive" | "comb";
  model: string;
  ground: string;
  deep: string;
  glow: string;
  ink: string;
  accent: string;
  mute: string;
  honey: string;
  wood: string;
  wax: string;
  leaf: string;
  panel: string;
  action: string;
  actionInk: string;
  ornaments: string[];
};

export const scenes: Scene[] = [
  {
    id: "honey",
    word: "თაფლი",
    visual: "jar",
    model: modelSlots.jar,
    ground: "#e39b2d",
    deep: "#8a3e0c",
    glow: "#ffe3a3",
    ink: "#2a1408",
    accent: "#fff4d2",
    mute: "#4a2810",
    honey: "#f2a31c",
    wood: "#7a3e12",
    wax: "#fff6e4",
    leaf: "#3e6a30",
    panel: "rgba(255, 246, 228, 0.62)",
    action: "#2a1408",
    actionInk: "#fff8ec",
    ornaments: ["dipper"],
  },
  {
    id: "colony",
    word: "ოჯახი",
    visual: "hive",
    model: modelSlots.bee,
    ground: "#1e3a28",
    deep: "#101c14",
    glow: "#d5e48a",
    ink: "#f6f2e6",
    accent: "#f0c14e",
    mute: "#d5dcc4",
    honey: "#e4b84a",
    wood: "#d8a15a",
    wax: "#f7f3e8",
    leaf: "#9dcc6a",
    panel: "rgba(8, 18, 12, 0.72)",
    action: "#f0c14e",
    actionInk: "#1c1408",
    ornaments: ["bee", "linden"],
  },
  {
    id: "comb",
    word: "ფიჭა",
    visual: "comb",
    model: modelSlots.honeycomb,
    ground: "#d36a32",
    deep: "#6e2410",
    glow: "#ffd0a8",
    ink: "#2c1208",
    accent: "#fff1e6",
    mute: "#5a2612",
    honey: "#ffb15e",
    wood: "#8a3414",
    wax: "#fff4ea",
    leaf: "#2f6a34",
    panel: "rgba(255, 244, 234, 0.66)",
    action: "#2c1208",
    actionInk: "#fff6ee",
    ornaments: ["dipper"],
  },
];

export function sceneFor(index: number) {
  return scenes[index] ?? scenes[scenes.length - 1];
}

export function sceneVars(scene: Scene) {
  return {
    "--hero-ground": scene.ground,
    "--hero-deep": scene.deep,
    "--hero-glow": scene.glow,
    "--hero-ink": scene.ink,
    "--hero-accent": scene.accent,
    "--hero-mute": scene.mute,
    "--hero-honey": scene.honey,
    "--hero-wood": scene.wood,
    "--hero-wax": scene.wax,
    "--hero-leaf": scene.leaf,
    "--hero-panel": scene.panel,
    "--hero-action": scene.action,
    "--hero-action-ink": scene.actionInk,
  };
}
