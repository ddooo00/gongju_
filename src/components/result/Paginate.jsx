import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Paginate({ data }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);

    console.log(
      `User requested page number ${e.selected}, which is offset ${newOffset}`
    );
  };

  //   const itemsPerPage = 4;
  //   const [itemOffset, setItemOffset] = useState(0);

  //   const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  //   const currentItems = items.slice(itemOffset, endOffset);
  //   const pageCount = Math.ceil(items.length / itemsPerPage);

  //   const handlePageClick = (event) => {
  //     const newOffset = (event.selected * itemsPerPage) % items.length;
  //     console.log(
  //       `User requested page number ${event.selected}, which is offset ${newOffset}`
  //     );
  //     setItemOffset(newOffset);
  //   };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Paginate;
