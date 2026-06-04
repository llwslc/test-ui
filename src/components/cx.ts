/* Join class names, dropping falsy entries. Accepts unknown so a Base UI
   className (string, state callback, or undefined) passes through untouched. */
export function cx(...parts: unknown[]): string {
  return parts.filter(Boolean).join(" ");
}
