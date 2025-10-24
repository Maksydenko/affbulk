export const getPropertyValue = (property: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(property);
