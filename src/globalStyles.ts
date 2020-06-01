import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "Verdana", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    cursor: pointer;
    transition: opacity .5s;

    &:hover {
      opacity: 0.8;
    }
  }

  p {
    margin: 30px;
    line-height: 1.8;;
  }

`

export default GlobalStyles
