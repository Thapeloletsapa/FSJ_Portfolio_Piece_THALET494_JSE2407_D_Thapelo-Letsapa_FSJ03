"user client";
export default function Pagination({ currentPage, totalPages }) {
    return (
      <div className="flex justify-center my-10">
        <button disabled={currentPage === 1} className="px-4 py-2">
          Previous
        </button>
        <span className="mx-4">{currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} className="px-4 py-2">
          Next
        </button>
      </div>
    );
  }
