import { Button } from "ui/components/ui/button";
import {
  PaginationItem,
  PaginationEllipsis,
} from "ui/components/ui/pagination";
import { cn } from "ui/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Pagination = {
  currentPage: number;
  itemsCount: number;
  itemsPerPage: number;
  onChangePageNumber: (page: number) => void;
};

const Pagination = ({
  currentPage,
  itemsCount,
  itemsPerPage,
  onChangePageNumber,
}: Pagination) => {
  const router = useRouter();
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);

  const isPaginationVisible = pagesCount > 0;
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pagesCount;

  const handleUpdatePageNumber = (page: number) => {
    onChangePageNumber(page);
    router.push(`?page=${page}`);
    window.scrollTo(0, 0);
  };

  let pageNumberOutofRange: boolean;

  const pageNumbers = [...new Array(itemsCount)].map((_, idx) => {
    const pageNumber = idx + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumber =
      Math.abs(pageNumber - currentPage) <= 2;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumber
    ) {
      pageNumberOutofRange = false;
      return (
        <button
          key={pageNumber}
          className={cn(
            pageNumber === currentPage
              ? "bg-gray-200 outline outline-1 border-gray-600"
              : "bg-white",
            "border border-gray-400 py-1 px-3 text-sm font-bold rounded-sm h-8"
          )}
          onClick={() => handleUpdatePageNumber(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    }

    if (!pageNumberOutofRange) {
      pageNumberOutofRange = true;
      return <PaginationEllipsis key={pageNumber} className="muted" />;
    }
    return null;
  });

  return (
    <div className="flex gap-2 items-center">
      <Button
        size={"sm"}
        className="text-xl py-0 px-1 bg-transparent text-black border border-gray-400 h-8 hover:bg-gray-300"
        disabled={currentPage === 1}
      >
        <ChevronLeft size={"1.5rem"} />
      </Button>

      {pageNumbers}

      <Button
        size={"sm"}
        className="text-xl py-0 px-1 bg-transparent text-black border border-gray-400 h-8 hover:bg-gray-300"
        disabled={currentPage === itemsCount}
      >
        <ChevronRight size={"1.5rem"} />
      </Button>
    </div>
  );
};

export default Pagination;
