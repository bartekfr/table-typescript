import React from 'react';
import* as Styled from './styles'

interface MenuProps {
  add: (i: number) => void
  remove?: (i: number) => void
  index: number
}

export const MenuRow: React.FunctionComponent<MenuProps> = ({
  add,
  remove,
  index,
}) => (
  <Styled.MenuRow>
    <button title="Add row above" type="button" onClick={() => add(index)}>
      &#9650;
    </button>
    <button title="Remove row" type="button" onClick={() => remove && remove(index)}>
      &#215;
    </button>
    <button title="Add row below" type="button" onClick={() => add(index + 1)}>
      &#9660;
    </button>
  </Styled.MenuRow>
);

export const MenuCol: React.FunctionComponent<MenuProps> = ({
  add,
  remove,
  index,
}) => (
  <Styled.MenuCol>
    <button title="Add column to the left" type="button" onClick={() => add(index)}>
      &#9668;
    </button>
    <button title="Remove column" type="button" onClick={() => remove && remove(index)}>
      &#215;
    </button>
    <button title="Add column to the right" type="button" onClick={() => add(index + 1)}>
      &#9658;
    </button>
  </Styled.MenuCol>
);
