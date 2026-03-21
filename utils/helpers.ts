export function formatDate(dateString?: string | null): string {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function toLower(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.toLowerCase().trim();
}