import React from 'react';
import { MenuCol, MenuRow } from './Menu';
import { updateItem, insertItem, removeItem } from '../../Common/Helpers';
import ExportCSVBtn from './ExportCSV';
import * as Styled from './styles';

const CellInput: React.FunctionComponent<{
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}> = props => (
  <input type="text" {...props} />
);

interface TableData {
  columnNames: string[]
  cells: string[][]
}

export interface TableProps {
  onChange: (data: TableData) => void,
  data: TableData,
}

export type TableState = TableData

class Table extends React.Component<TableProps, TableState> {
  state: TableState = this.props.data

  constructor(props: TableProps) {
    super(props);
    this.updateCell = this.updateCell.bind(this);
    this.updateColName = this.updateColName.bind(this);
    this.addRow = this.addRow.bind(this);
    this.addCol = this.addCol.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.removeCol = this.removeCol.bind(this);
  }

  componentDidUpdate() {
    this.onChange();
  }

  onChange() {
    const { columnNames, cells } = this.state;
    const { onChange } = this.props;
    onChange({
      columnNames,
      cells,
    });
  }

  updateColName(i: number, e: React.ChangeEvent<HTMLInputElement>) {
    const { target: { value } } = e;
    const { columnNames } = this.state;
    const newRow = updateItem(columnNames, i, value);
    this.setState({
      columnNames: newRow,
    });
  }

  updateCell(i: number, j: number, e: React.ChangeEvent<HTMLInputElement>) {
    const { target: { value } } = e;
    const { cells } = this.state;
    const newRow = updateItem(cells[i], j, value);
    const newCells = updateItem(cells, i, newRow);
    this.setState({
      cells: newCells,
    });
  }

  addRow(i: number) {
    const { cells, columnNames } = this.state;
    const newRow: string[] = new Array(columnNames.length).fill('');
    const newCells = insertItem(cells, i, newRow);
    this.setState({
      cells: newCells,
    });
  }

  addCol(j: number) {
    const { cells, columnNames } = this.state;
    const newCells = cells.map(row => insertItem(row, j, ''));
    this.setState({
      cells: newCells,
      columnNames: insertItem(columnNames, j, `New column ${j + 1}`),
    });
  }

  removeRow(i: number) {
    const { cells } = this.state;
    const newCells = removeItem(cells, i);
    this.setState({
      cells: newCells,
    });
  }

  removeCol(i: number) {
    const { cells, columnNames } = this.state;
    const newCells = cells.map(row => removeItem(row, i));
    this.setState({
      cells: newCells,
      columnNames: removeItem(columnNames, i),
    });
  }

  render() {
    const { cells, columnNames } = this.state;
    const papaParseData = {
      fields: columnNames,
      data: cells.length ? cells : '',
    };

    // Generally array indexes shouldn't be used as keys but in this specific case
    // it shouldn't cause any issues
    return (
      <Styled.Table>
        <table>
          <tbody>
            {/* Column row - START */}
            <tr>
              <th>
                <MenuCol add={this.addCol} index={-1} />
                <MenuRow index={-1} add={this.addRow} />
                id
              </th>
              {
                columnNames.map((col, i) => (
                  <th key={i}>
                    <MenuCol add={this.addCol} index={i} remove={this.removeCol} />
                    <CellInput value={col} onChange={e => this.updateColName(i, e)} />
                  </th>
                ))
              }
            </tr>
            {/* Column row - END */}
            {/* Data Row  - START */}
            {
              cells.map((row, i) => (
                <tr key={i}>
                  <th>
                    <MenuRow add={this.addRow} index={i} remove={this.removeRow} />
                    {i + 1}
                  </th>
                  {row.map((_cell, j) => (
                    <td key={j}>
                      <CellInput value={cells[i][j]} onChange={e => this.updateCell(i, j, e)} />
                    </td>
                  ))}
                </tr>
              ))
            }
            {/* Data Row  - END */}
          </tbody>
        </table>
        <Styled.Hint>{!columnNames.length ? 'No columns defined.' : null }</Styled.Hint>
        <Styled.Hint>{!cells.length ? 'No rows defined.' : null }</Styled.Hint>
        <ExportCSVBtn data={papaParseData} />
      </Styled.Table>
    );
  }
}

export default Table;
