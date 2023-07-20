import React, { useEffect, useState } from "react";
import { auth } from "../../service/firebase";
import useInput from "../../hooks/useInput";
import useComments from "../../hooks/useComments";
import shortid from "shortid";
import ReactPaginate from "react-paginate";
import { styled } from "styled-components";
import * as S from "../../styles/style.chartcomment";

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

  // 댓글 페이지네이션
  // 현재 페이지의 데이터
  const [currentComments, setCurrentComments] = useState([]);
  // 전체 페이지 수를 저장
  const [pageCount, setPageCount] = useState(0);
  // 현재 페이지의 시작 인덱스
  const [itemOffset, setItemOffset] = useState(0);
  // 한 페이지에 표시될 항목 수
  const itemsPerPage = 5;

  useEffect(() => {
    // 한 페이지 내 댓글 배열의 마지막 인덱스
    const endOffset = itemOffset + itemsPerPage;
    setCurrentComments(
      comments
        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(itemOffset, endOffset)
    );
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

  //  날짜 포맷팅
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const dateFormat = `${year}.${month}.${day} ${hours}:${minutes}`;

  // 댓글 추가
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

  // 댓글 삭제
  const clickDeleteComment = (id) => {
    if (window.confirm("정말 삭제하시겠습니까 ?")) {
      deleteMutation.mutate(id);
    } else {
      return alert("삭제가 취소되었습니다.");
    }
  };

  const clickEditMode = (comment) => {
    setIsEdit(comment.id);
    onChangeEditedBody(comment.editedBody);
  };

  // 댓글 수정
  const clickUpdateComment = (comment) => {
    const editedComment = {
      ...comment,
      userName: user.displayName,
      body: editedBody,
      // createdAt: dateFormat,
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
    <S.CommentContainer>
      <S.CommentWrapper>
        <div
          style={{
            margin: "10px",
            padding: "20px",
            background: "#E5D3A9",
            borderRadius: "20px",
          }}
        >
          <form>
            <label htmlFor="comments"> </label>
            <S.CommentTextarea
              type="text"
              value={body}
              onChange={(e) => onChangeBody(e.target.value)}
            />
            <S.button onClick={clickAddComment}>등록</S.button>
          </form>
          {currentComments?.map((comment) => {
            return (
              <S.CommentBox key={comment.id}>
                <span style={{ marginRight: "10px" }}>{comment.userName}</span>
                <span style={{ paddingBottom: "20px" }}>
                  {comment.createdAt}
                </span>
                {isEdit === comment.id ? (
                  <>
                    <p style={{ fontSize: "18px" }}>
                      <label htmlFor="editedBody"></label>
                    </p>
                    <textarea
                      value={editedBody}
                      onChange={(e) => onChangeEditedBody(e.target.value)}
                    />
                  </>
                ) : (
                  <p>{comment.body}</p>
                )}
                {user?.uid === comment.uid && (
                  <>
                    {isEdit ? (
                      <button onClick={() => clickUpdateComment(comment)}>
                        저장
                      </button>
                    ) : (
                      <>
                        <S.button
                          onClick={() => clickDeleteComment(comment.id)}
                        >
                          삭제
                        </S.button>
                        <S.button onClick={() => clickEditMode(comment)}>
                          수정
                        </S.button>
                      </>
                    )}
                  </>
                )}
              </S.CommentBox>
            );
          })}

          {/* 페이지네이트 */}
          <StyledReactPaginate
            breakLabel="..."
            nextLabel="> "
            previousLabel=" <"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            renderOnZeroPageCount={null}
            // containerClassName="pagination justify-content-center"
            // pageClassName="page-item"
            // pageLinkClassName="page-link"
            // previousClassName="page-item"
            // previousLinkClassName="page-link"
            // nextClassName="page-item"
            // nextLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
      </S.CommentWrapper>
    </S.CommentContainer>
  );
};

export default Comments;

const StyledReactPaginate = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 30px;

  li a {
    font-size: 20px;
    padding: 15px;
    cursor: pointer;
  }

  li.active a {
    color: #f26f18;
    font-weight: 800;
    min-width: 32px;
  }
`;
