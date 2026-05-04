/** URL `?focus=` value for product Mac tabs — must match {@link headingToFocusParam}(section.heading). */
export function headingToFocusParam(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
