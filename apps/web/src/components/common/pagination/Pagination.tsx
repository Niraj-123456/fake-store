import { Button } from "ui/components/ui/button";
import {
  Pagination,
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

const CustomPagination = ({
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
    router.push(`?page=${page}`, { scroll: true });
  };

  let pageNumberOutofRange: boolean;

  const pageNumbers = [...new Array(pagesCount)].map((_, idx) => {
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
    isPaginationVisible && (
      <Pagination className="gap-2">
        <Button
          size={"sm"}
          className="text-xl py-0 px-1 bg-transparent text-black border border-gray-400 h-8 hover:bg-gray-300"
          disabled={isCurrentPageFirst}
          onClick={() => handleUpdatePageNumber(currentPage - 1)}
        >
          <ChevronLeft size={"1.5rem"} />
        </Button>

        {pageNumbers}

        <Button
          size={"sm"}
          className="text-xl py-0 px-1 bg-transparent text-black border border-gray-400 h-8 hover:bg-gray-300"
          disabled={isCurrentPageLast}
          onClick={() => handleUpdatePageNumber(currentPage + 1)}
        >
          <ChevronRight size={"1.5rem"} />
        </Button>
      </Pagination>
    )
  );
};

export default CustomPagination;
