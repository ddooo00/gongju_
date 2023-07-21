import React, { useEffect, useState } from "react";
import { auth } from "../../service/firebase";
import useInput from "../../hooks/useInput";
import useComments from "../../hooks/useComments";
import shortid from "shortid";
import * as S from "../../styles/style.chartcomment";
import Background from "../../styles/style.spinner";
import Spinner from "../../assets/spinner/spinner.gif";

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
    console.log(
      `유저가 요청한 페이지는 ${e.selected}, 댓글 데이터 배열의 새로운 시작 인덱스는 ${newOffset}`
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
    onChangeEditedBody(comment.body);
  };

  // 댓글 수정
  const clickUpdateComment = (comment) => {
    if (!editedBody) {
      alert("내용을 입력해 주세요.");
      return;
    }

    const editedComment = {
      ...comment,
      userName: user.displayName,
      body: editedBody,
    };

    updateMutation.mutate(editedComment);
    setIsEdit(null);
    resetEditedBody("");
  };

  if (isLoading) {
    return (
      <Background>
        잠시만 기다려주세요...
        <img src={Spinner} alt="로딩중" width="5%" />
      </Background>
    );
  }

  if (isError) {
    return <Background>댓글 목록을 가져오지 못했습니다😥</Background>;
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
            <S.Inputbutton onClick={clickAddComment}>등록</S.Inputbutton>
          </form>
          {currentComments?.map((comment) => {
            return (
              <S.CommentBox key={comment.id}>
                <span
                  style={{
                    marginRight: "10px",
                    fontWeight: "700",
                  }}
                >
                  {comment.userName}
                </span>
                <span
                  style={{
                    paddingBottom: "20px",
                    fontSize: "14px",
                    color: "gray",
                  }}
                >
                  {comment.createdAt}
                </span>
                {isEdit === comment.id ? (
                  <>
                    <S.EditTextarea
                      value={editedBody}
                      onChange={(e) => onChangeEditedBody(e.target.value)}
                    />
                    <S.Savebutton onClick={() => clickUpdateComment(comment)}>
                      저장
                    </S.Savebutton>
                  </>
                ) : (
                  <>
                    <p>{comment.body}</p>
                    {user?.uid === comment.uid && (
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
          <S.StyledReactPaginate
            breakLabel="..."
            nextLabel="> "
            previousLabel=" <"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            renderOnZeroPageCount={null}
            activeClassName="active"
          />
        </div>
      </S.CommentWrapper>
    </S.CommentContainer>
  );
};

export default Comments;
