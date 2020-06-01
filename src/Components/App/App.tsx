import React from 'react';
import Table from '../Table';

const initData = {
  columnNames: ['col 1', 'col 2'],
  cells: [
    ['a1', 'a2'],
    ['b1', 'b2'],
  ],
};
const App = () => (
  <div>
    <p>
      Quick manual:
      <br />
      1. Hover column header cell to see column context menu. Using the menu you can add new columns
       to the left or right of the cell (&#9668; &#9658; butons) and remove the column (&#215;).
      <br />
      2. Hover row header (the cell in the id column) to see row contex menu with options analogous
       to column context menu.
      <br />
      3. Click cell to edit its content (id column cells are not editable)
    </p>
    { /* eslint-disable no-alert, no-console */}
    <Table data={initData} onChange={data => console.log('change', data)} />
    {/* eslint-disable no-alert, no-console */}
  </div>
);

export default App;
