export function imageFormatter(image: string) {
  if (!image) return "";
  try {
    const parsed = JSON.parse(image);
    if (Array.isArray(parsed)) {
      return parsed[0];
    }
    return parsed;
  } catch (e) {
    return image?.replace(/[[\]"]/g, "");
  }
}
