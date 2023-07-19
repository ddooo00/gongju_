import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Test from "../pages/Test";
import Detail from "../pages/Detail";
import Board from "../pages/Board";
import Result from "../pages/Result";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test/:id" element={<Result />} />
        <Route path="/board" element={<Board />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<h1>없는 페이지 입니다.</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
