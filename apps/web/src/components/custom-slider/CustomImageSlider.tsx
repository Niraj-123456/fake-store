"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./custom-slider.module.css";
import { cn } from "ui/lib/utils";
import { Button } from "ui/components/ui/button";
import Link from "next/link";

type Image = {
  src: string;
  alt: string;
};

const CustomImageSlider = ({ images }: { images: Image[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideCompleted, setSlideCompleted] = useState(true);
  let timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (slideCompleted) {
      setSlideCompleted(false);
      timerId.current = setTimeout(() => {
        handleNext();
        setSlideCompleted(true);
      }, 2000);
    }
  }, [slideCompleted]);

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev >= images?.length - 1 ? 0 : activeIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev <= 0 ? images?.length - 1 : activeIndex - 1
    );
  };

  const handleGoto = (idx: number) => {
    setActiveIndex(idx);
    setSlideCompleted(false);
  };

  const autoPlayStop = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      setSlideCompleted(false);
    }
  };

  const autoPlayStart = () => {
    if (!slideCompleted) {
      setSlideCompleted(true);
    }
  };

  return (
    <section
      aria-label="image-slider"
      onMouseEnter={autoPlayStop}
      onMouseLeave={autoPlayStart}
      className="relative border w-full h-80 p-0 aspect-[4/3] overflow-hidden flex justify-start items-center flex-nowrap rounded-sm"
    >
      <Link
        href={"#skip-image-slider-controls"}
        className="absolute overflow-hidden -m-1 focus-visible:z-10 focus-visible:top-1 focus-visible:left-1 focus-visible:bg-white focus-visible:p-2"
      >
        Skip Image Slider
      </Link>
      {images?.map((image, idx) => (
        <div
          key={idx}
          aria-hidden={activeIndex !== idx}
          className={`${styles.slider__item} ${
            styles[`slider__item__active__${activeIndex + 1}`]
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100%*100%"
            className="object-cover w-full h-full object-center"
          />
        </div>
      ))}
      <Button
        aria-label="slider-image-previous"
        onClick={handlePrev}
        className="absolute left-4 w-8 h-8 bg-white rounded-full p-1 hover:bg-white/80"
      >
        <ChevronLeft className="text-black" />
      </Button>
      <Button
        aria-label="slider-image-next"
        onClick={handleNext}
        className="absolute right-4 w-8 h-8 bg-white rounded-full p-1 hover:bg-white/80"
      >
        <ChevronRight className="text-black" />
      </Button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 translate-y-0 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            aria-label={`image-slider-${index + 1}`}
            className={cn(
              "w-4 h-4 rounded-full border-2 transition-all duration-1000",
              activeIndex === index
                ? "bg-gray-900 bg-opacity-1"
                : "bg-opacity-0"
            )}
            onClick={() => handleGoto(index)}
          />
        ))}
      </div>
      <div id="skip-image-slider-controls" />
    </section>
  );
};

export default CustomImageSlider;
