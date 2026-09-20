// All content paths are relative to public/. Encode spaces without losing the Pages base.
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.split("/").map(encodeURIComponent).join("/")}`;
