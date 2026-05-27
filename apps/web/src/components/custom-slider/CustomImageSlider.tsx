"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "ui/lib/utils";
import { Button } from "ui/lib/components/ui/button";
import Link from "next/link";

type Image = {
  src: string;
  alt: string;
};

const CustomImageSlider = ({ images }: { images: Image[] }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const extendedImages = images?.length
    ? [images[images.length - 1], ...images, images[0]]
    : [];

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  const handleGoto = useCallback((idx: number) => {
    setIsTransitioning(true);
    setCurrentIndex(idx + 1);
  }, []);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === 0) {
      setCurrentIndex(images.length);
    } else if (currentIndex === images.length + 1) {
      setCurrentIndex(1);
    }
  };

  useEffect(() => {
    if (isPaused) return;
    const timerId = setTimeout(() => {
      handleNext();
    }, 4000);
    return () => {
      clearTimeout(timerId);
    };
  }, [currentIndex, isPaused, handleNext]);

  const autoPlayStop = () => setIsPaused(true);
  const autoPlayStart = () => setIsPaused(false);

  if (!images || images.length === 0) return null;

  const activeIndex = (currentIndex - 1 + images.length) % images.length;

  return (
    <section
      aria-label="image-slider"
      onMouseEnter={autoPlayStop}
      onMouseLeave={autoPlayStart}
      className="relative h-[500px] rounded-[3rem] overflow-hidden mb-16 shadow-2xl shadow-slate-200"
    >
      <Link
        href={"#skip-image-slider-controls"}
        className="absolute overflow-hidden -m-1 focus-visible:z-10 focus-visible:top-1 focus-visible:left-1 focus-visible:bg-white focus-visible:p-2"
      >
        Skip Image Slider
      </Link>
      <div
        className={cn(
          "flex h-full",
          isTransitioning && "transition-transform duration-1000 ease-in-out",
        )}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedImages.map((image, idx) => (
          <div
            key={idx}
            aria-hidden={
              activeIndex !== (idx - 1 + images.length) % images.length
            }
            className="relative min-w-full h-full"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={idx === 1}
              sizes="100%*100%"
              className="object-cover w-full h-full object-center"
            />
          </div>
        ))}
      </div>
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
                : "bg-opacity-0",
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
