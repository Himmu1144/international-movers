import { cacheLife } from "next/cache";

// Cached so the footer stays static; refreshes daily, so it rolls over on 1 Jan.
export async function Year() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
