import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Paginate() {
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
    <div>
      {currentItems?.map((comment) => {
        return (
          <div
            style={{
              border: "1px solid #000000",
              borderRadius: "10px",
              margin: "10px",
              padding: "10px",
            }}
            key={comment.id}
          >
            <p>작성자 : {comment.userName}</p>
            <p>날짜 : {comment.createdAt}</p>
            {isEdit === comment.id ? (
              <>
                <label htmlFor="editedBody">내용 : </label>
                <textarea
                  value={editedBody}
                  onChange={(e) => onChangeEditedBody(e.target.value)}
                />
              </>
            ) : (
              <p>내용 : {comment.body}</p>
            )}
            {user?.uid === comment.uid && (
              <>
                {isEdit ? (
                  <button onClick={() => clickUpdateComment(comment)}>
                    저장
                  </button>
                ) : (
                  <>
                    <button onClick={() => clickDeleteComment(comment.id)}>
                      삭제
                    </button>
                    <button onClick={() => clickEditMode(comment)}>수정</button>
                  </>
                )}
              </>
            )}
          </div>
        );
      })}
      <ReactPaginate
        // breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Paginate;
