"use client";
import CustomImageSlider from "../custom-slider/CustomImageSlider";

type Banner = {
  src: string;
  alt: string;
};

const HomeBanner = ({ banners }: { banners: Banner[] }) => {
  return <CustomImageSlider images={banners} />;
};

export default HomeBanner;
