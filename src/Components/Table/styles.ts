import styled from 'styled-components'

const thColor2 = 'rgb(212, 212, 231)';
const thColor1 = 'rgb(230, 235, 245)';

// Table component context menu
// TODO: move nested elements to separate styled components
export const Menu = styled.div`
  display: none;
  align-content: center;
  position: absolute;

  button {
    flex: 1 1 auto;
    padding: 1px;
    border: 0 none;
    background: none;
    font-size: 14px;;

    &:nth-child(2) {
      font-size: 22px;
      font-weight: bold;
    }
  }
`

const menuWidth = `30px`;
export const MenuRow = styled(Menu)`
  flex-direction: column;
  height: calc(100% + 20px);
  top: -10px;
  width: ${menuWidth};
  left: -${menuWidth};
`

export const MenuCol = styled(Menu)`
  width: 100%;
  height: 30px;
  position: absolute;
  right: 0;
  top: -30px;
`

export const Table = styled.div`
  padding: 40px 60px;

  table {
    margin-bottom: 20px;
    border: 1px solid #000;
    border-collapse: collapse;
  }

  tr,
  td,
  th {
    position: relative;
    border: 1px solid #000;
  }

  tr {
    &:first-child {
      th:first-child {
        button:nth-child(1),
        button:nth-child(2) {
          display: none;
        }
      }
    }

    &:not(:first-child) > th:first-child {
      background: ${thColor1};
    }
  }

  td,
  th {
    min-width: 75px;
    max-width: 200px;
    height: 50px;
    background-clip: padding-box !important; // fix for dissapearing cell borders in FF
  }

  th {
    background-color: #ccc;
    background: linear-gradient(to bottom, ${thColor1} 0%, ${thColor1} 50%, ${thColor2} 100%);

    &:hover {
      background: ${thColor2};

      ${Menu} {
        display: flex;
      }
    }
  }

  td:hover {
    background: rgba(255, 255, 0, 0.2);
  }

  input {
    width: 100%;
    border: 0 none;
    padding: 15px 22px;
    background: none;
    font-size: 16px;
  }
`

export const Hint = styled.p`
  color: #f00;
  margin: 5px 0 0;
  padding: 0;
  font-size: 14px;
`


// Table component export to CSV button
export const CsvBtn = styled.button`
  padding: 10px 15px;
  margin: 20px 0;
  border: 0;
  background: #0058dc;
  color: #fff;
`
