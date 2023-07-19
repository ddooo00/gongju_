import React, { useEffect, useState } from "react";
import { auth } from "../../service/firebase";
import useInput from "../../hooks/useInput";
import useComments from "../../hooks/useComments";
import shortid from "shortid";
import ReactPaginate from "react-paginate";

const Comments = () => {
  const user = auth.currentUser;

  const {
    isLoading,
    isError,
    comments,
    addMutation,
    deleteMutation,
    updateMutation,
  } = useComments();

  const [body, onChangeBody, resetBody] = useInput();
  const [editedBody, onChangeEditedBody, resetEditedBody] = useInput();
  const [isEdit, setIsEdit] = useState(null);

  // =========================================================

  // 현재 페이지의 데이터
  const [currentItems, setCurrentItems] = useState([]);
  // 전체 페이지 수를 저장
  const [pageCount, setPageCount] = useState(0);
  // 현재 페이지의 시작 인덱스
  const [itemOffset, setItemOffset] = useState(0);
  //한 페이지에 표시될 항목 수
  const itemsPerPage = 7;

  useEffect(() => {
    // 그 배열의 마지막 인덱스
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(comments?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(comments?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, comments]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % comments.length;
    setItemOffset(newOffset);
    // console.log("newOffset", newOffset);
    console.log(
      `User requested page number ${e.selected}, which is offset ${newOffset}`
    );
  };

  // =========================================================

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const dateFormat = `${year}.${month}.${day} ${hours}:${minutes}`;

  const clickAddComment = (e) => {
    e.preventDefault();

    if (!body) {
      alert("내용을 입력해 주세요.");
      return;
    }

    const newComment = {
      id: shortid.generate(),
      uid: user.uid,
      userName: user.displayName,
      body,
      createdAt: dateFormat,
    };
    addMutation.mutate(newComment);

    resetBody("");
  };

  const clickDeleteComment = (id) => {
    if (window.confirm("정말 삭제하시겠습니까 ?")) {
      alert("삭제되었습니다.");
      deleteMutation.mutate(id);
    } else {
      alert("삭제가 취소되었습니다.");
    }
    console.log(id);
  };

  const clickEditMode = (comment) => {
    setIsEdit(comment.id);
    onChangeEditedBody(comment.editedBody);
  };

  const clickUpdateComment = (comment) => {
    const editedComment = {
      ...comment,
      userName: user.displayName,
      body: editedBody,
      createdAt: dateFormat,
    };

    updateMutation.mutate(editedComment);
    setIsEdit(null);
    resetEditedBody("");
  };

  if (isLoading) {
    return <h1>언제까지 로딩중 ...?</h1>;
  }

  if (isError) {
    return <h1>오류를 발견했다 오바</h1>;
  }

  return (
    <div
      style={{
        border: "1px solid #000000",
        margin: "10px",
        padding: "10px",
      }}
    >
      <form>
        <label htmlFor="comments">댓글 : </label>
        <textarea
          type="text"
          value={body}
          onChange={(e) => onChangeBody(e.target.value)}
        />
        <button onClick={clickAddComment}>등록</button>
      </form>
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
        // pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Comments;
