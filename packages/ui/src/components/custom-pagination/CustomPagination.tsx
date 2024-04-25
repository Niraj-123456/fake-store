"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { useRouter } from "next/navigation";
import { cn } from "../../lib/utils";

type Pagination = {
  currentPage: number;
  itemsCount: number;
  itemsPerPage: number;
  className?: string;
};

const CustomPagination = ({
  currentPage,
  itemsCount,
  itemsPerPage,
  className,
}: Pagination) => {
  const router = useRouter();
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);

  const isPaginationVisible = pagesCount > 0;
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pagesCount;

  const handleUpdatePageNumber = (page: number) => {
    router.push(`?page=${page}`);
    window.scrollTo(0, 0);
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
        <PaginationItem key={pageNumber}>
          <PaginationLink
            className="cursor-pointer"
            isActive={pageNumber === currentPage}
            onClick={() => handleUpdatePageNumber(pageNumber)}
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
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
      <Pagination className={cn(className)}>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant={"outline"}
              disabled={isCurrentPageFirst}
              className="w-10 h-10 p-0"
              onClick={() => handleUpdatePageNumber(currentPage - 1)}
            >
              <ChevronLeft />
            </Button>
          </PaginationItem>

          {pageNumbers}
          <PaginationItem>
            <Button
              variant={"outline"}
              disabled={isCurrentPageLast}
              className="w-10 h-10 p-0"
              onClick={() => handleUpdatePageNumber(currentPage + 1)}
            >
              <ChevronRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  );
};

export default CustomPagination;
