export function imageURLCleaner(image: string) {
  return image?.replace(/[[\]"]/g, "");
}
