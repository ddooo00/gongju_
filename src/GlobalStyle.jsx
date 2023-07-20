import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
 ${reset}
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

body {
    font-family: 'Pretendard-Regular';
<<<<<<< HEAD
  
=======
>>>>>>> c3c959c552f6b63f37c473d10bce40524c00d258
    
}
`;

export default GlobalStyle;
