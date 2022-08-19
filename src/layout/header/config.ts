export const MENU_KEYS = [
  "style",
  "sound",
] as const;
export type TMenuKey =
  typeof MENU_KEYS[number];
