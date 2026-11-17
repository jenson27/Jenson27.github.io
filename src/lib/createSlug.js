const GENERATE_SLUG_FROM_TITLE = true;

export default function createSlug(title, staticSlug) {
  return !GENERATE_SLUG_FROM_TITLE
    ? staticSlug
    : title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")
        .replace(/^-+|-+$/g, "");
}