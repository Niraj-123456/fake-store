export function imageFormatter(image: string) {
  return image?.replace(/[[\]"]/g, "");
}
