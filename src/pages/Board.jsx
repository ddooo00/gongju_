import React from "react";
import Comments from "../components/result/Comments";
import { auth } from "../service/firebase";

const Board = () => {
  const user = auth.currentUser;

  return <Comments user={user} />;
};

export default Board;
