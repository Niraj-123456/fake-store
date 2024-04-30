"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./custom-slider.module.css";
import { cn } from "ui/lib/utils";

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
    <div
      onMouseEnter={autoPlayStop}
      onMouseLeave={autoPlayStart}
      className="relative border w-full h-80 p-0 aspect-[4/3] overflow-hidden flex justify-start items-center flex-nowrap rounded-sm"
    >
      {images.map((image, idx) => (
        <div
          key={idx}
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
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 translate-y-0 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
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
      <ChevronLeft
        className="absolute left-1 w-8 h-8 bg-white rounded-full p-1 cursor-pointer hover:bg-white/80"
        onClick={handlePrev}
      />
      <ChevronRight
        className="absolute right-1 w-8 h-8 bg-white rounded-full p-1 cursor-pointer hover:bg-white/80"
        onClick={handleNext}
      />
    </div>
  );
};

export default CustomImageSlider;
