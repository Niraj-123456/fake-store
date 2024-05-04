"use client";
import Image from "next/image";
import React from "react";
import { Button } from "ui/components/ui/button";
import { Home } from "lucide-react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h4 className="text-6xl text-red-500 font-semibold">OOPS!!!</h4>
      <div className="relative w-1/2 h-1/2 overflow-hidden mt-8">
        <Image
          src={"/images/error.jpg"}
          alt="error"
          fill
          className="w-full h-full object-cover object-center"
        />
      </div>
      <h4 className="text-2xl text-red-500 mt-8">Something went wrong</h4>
      <Button className="mt-4 text-lg" size={"lg"} onClick={() => reset()}>
        <Home className="w-5 h-5 mr-2" />
        <span>Go Home</span>
      </Button>
    </div>
  );
};

export default Error;
