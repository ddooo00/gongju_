import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Paginate({ data }) {
  // 현재 페이지의 데이터
  const [currentItems, setCurrentItems] = useState([]);
  // 전체 페이지 수를 저장
  const [pageCount, setPageCount] = useState(0);
  // 현재 페이지의 시작 인덱스
  const [itemOffset, setItemOffset] = useState(0);
  //한 페이지에 표시될 항목 수
  const itemsPerPage = 3;

  useEffect(() => {
    // 그 배열의 마지막 인덱스
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
    // console.log("newOffset", newOffset);
    console.log(
      `User requested page number ${e.selected}, which is offset ${newOffset}`
    );
  };

  return (
    <>
      <ReactPaginate
        // breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Paginate;
