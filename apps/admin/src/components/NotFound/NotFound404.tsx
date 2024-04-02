import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound404 = () => {
  return (
    <div className="text-center">
      <div className="relative w-full h-96">
        <Image
          src={"/images/404NotFound.svg"}
          alt="404NotFound"
          fill
          sizes="100%"
          priority
        />
      </div>
      <h1 className="text-2xl font-bold">404 Page Not Found</h1>
      <p className="p-3">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-4">
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-500 hover:border-blue-700 rounded"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound404;
