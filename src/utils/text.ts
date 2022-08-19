export const nameToTitle = (
  name: string
) =>
  name.replace(/-/g, " ").toUpperCase();
