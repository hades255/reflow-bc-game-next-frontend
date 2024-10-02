import { FC } from "react";

interface Props {
  page: number;
  total: number;
  perPage: number;
  showPages: number;
  firstPage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  setPage: (page: number) => void;
}

const Pagination: FC<Props> = ({ page, total, perPage, showPages, firstPage, handlePrevPage, handleNextPage, setPage }) => {
  return (
    <nav
      className="flex justify-end items-center -space-x-px text-[#727272] my-2"
      aria-label="Pagination"
    >
      <button
        type="button"
        className={`min-h-[28px] min-w-[28px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1 text-sm first:rounded-s-sm last:rounded-e-sm border border-[#252525] text-[#727272] hover:bg-[#242424] focus:outline-none ${
          page === 1 ? "opacity-50 pointer-events-none" : ""
        }`}
        aria-label="Previous"
        onClick={handlePrevPage}
      >
        <svg
          className="shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span className="sr-only">Previous</span>
      </button>
      {Math.ceil(total / perPage) < showPages
        ? new Array(Math.ceil(total / perPage)).fill(0).map((p, id) => (
            <button
              key={`x-page-${id}`}
              type="button"
              className={`min-h-[28px] min-w-[28px] flex justify-center items-center border border-[#252525] text-[#727272] hover:bg-[#242424] py-[5px] px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${
                page === id + firstPage ? "bg-[#242424]" : ""
              }`}
              onClick={() => setPage(id + firstPage)}
            >
              {id + firstPage}
            </button>
          ))
        : new Array(showPages).fill(0).map((q, id) => (
            <button
              key={`y-page-${id}`}
              type="button"
              className={`min-h-[28px] min-w-[28px] flex justify-center items-center border border-[#252525] text-[#727272] hover:bg-[#242424] py-[5px] px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${
                page === id + firstPage ? "bg-[#242424]" : ""
              }`}
              onClick={() => setPage(id + firstPage)}
            >
              {id + firstPage}
            </button>
          ))}
      <button
        type="button"
        className={`min-h-[28px] min-w-[28px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1 text-sm first:rounded-s-sm last:rounded-e-sm border border-[#252525] text-[#727272] hover:bg-[#242424] focus:outline-none ${
          page === Math.ceil(total / perPage) || total === 0
            ? "opacity-50 pointer-events-none"
            : ""
        }`}
        aria-label="Next"
        onClick={handleNextPage}
      >
        <span className="sr-only">Next</span>
        <svg
          className="shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
