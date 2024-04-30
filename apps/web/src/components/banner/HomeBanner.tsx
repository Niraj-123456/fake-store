"use client";
import CustomImageSlider from "../custom-slider/CustomImageSlider";

const banners = [
  { src: "/images/banner/banner-1.jpg", alt: "banner1" },
  { src: "/images/banner/banner-2.jpg", alt: "banner2" },
  { src: "/images/banner/banner-3.jpg", alt: "banner3" },
  { src: "/images/banner/banner-4.jpg", alt: "banner4" },
];

const HomeBanner = () => {
  return <CustomImageSlider images={banners} />;
};

export default HomeBanner;
