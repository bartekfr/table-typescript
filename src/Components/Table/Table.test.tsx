import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Table, { TableProps, TableState } from './index';
import * as Helpers from '../../Common/Helpers'
import * as Styled from './styles'

const data = {
  columnNames: ['col1', 'col2', 'col3'],
  cells: [
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'],
  ],
};

describe('Table component', () => {
  let wrapper: ShallowWrapper<TableProps, TableState, Table>;
  let instance: Table
  const onChange = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Table onChange={onChange} data={data} />);
    instance = wrapper.instance();
    jest.spyOn(Helpers, 'insertItem')
    jest.spyOn(Helpers, 'removeItem')
    jest.spyOn(Helpers, 'updateItem')
    jest.clearAllMocks()
  });

  it('adds row even if there are no columns', () => {
    const localWrapper: ShallowWrapper<TableProps, TableState, Table> = shallow(<Table onChange={onChange} data={{
      columnNames: [],
      cells: []
    }} />);
    const localInstance = localWrapper.instance();
    localInstance.addRow(0);
    expect(Helpers.insertItem).toHaveBeenCalledTimes(1)
    expect(Helpers.insertItem).toHaveBeenLastCalledWith([], 0, [])
    // wrapper.update();
    expect(localWrapper.state('cells')).toEqual([
      [],
    ]);
    localInstance.addRow(0);
    // wrapper.update();
    expect(Helpers.insertItem).toHaveBeenCalledTimes(2)
    expect(Helpers.insertItem).toHaveBeenLastCalledWith([[]], 0, [])
    expect(localWrapper.state('cells')).toEqual([
      [],
      [],
    ]);
  });

  it('adds row', () => {
    // wrapper.update();
    instance.addRow(1);
    // wrapper.update();
    expect(Helpers.insertItem).toHaveBeenCalledTimes(1)
    expect(Helpers.insertItem).toHaveBeenLastCalledWith(data.cells, 1, ['', '', ''])
    expect(wrapper.state('cells')).toEqual([
      ['a1', 'a2', 'a3'],
      ['', '', ''],
      ['b1', 'b2', 'b3'],
      ['c1', 'c2', 'c3'],
    ]);

    instance.addRow(3);
    // wrapper.update();
    expect(Helpers.insertItem).toHaveBeenCalledTimes(2)
    expect(wrapper.state('cells')).toEqual([
      ['a1', 'a2', 'a3'],
      ['', '', ''],
      ['b1', 'b2', 'b3'],
      ['', '', ''],
      ['c1', 'c2', 'c3'],
    ]);
  });

  it('removes row', () => {
    // wrapper.update();
    instance.removeRow(1);
    // wrapper.update();
    expect(Helpers.removeItem).toHaveBeenCalledTimes(1)
    expect(Helpers.removeItem).toHaveBeenLastCalledWith(data.cells, 1)
    expect(wrapper.state('cells')).toEqual([
      ['a1', 'a2', 'a3'],
      ['c1', 'c2', 'c3'],
    ]);

    instance.removeRow(0);
    // wrapper.update();
    expect(Helpers.removeItem).toHaveBeenCalledTimes(2)
    expect(Helpers.removeItem).toHaveBeenLastCalledWith([
      ['a1', 'a2', 'a3'],
      ['c1', 'c2', 'c3'],
    ], 0)
    expect(wrapper.state('cells')).toEqual([
      ['c1', 'c2', 'c3'],
    ]);
  });

  it('adds columns even if there are no rows', () => {
    const localWrapper: ShallowWrapper<TableProps, TableState, Table> = shallow(<Table onChange={onChange} data={{
      columnNames: [],
      cells: []
    }} />);
    const instance = localWrapper.instance();
    instance.addCol(0);
    expect(Helpers.insertItem).toHaveBeenCalledTimes(1)
    expect(Helpers.insertItem).toHaveBeenLastCalledWith([], 0, 'New column 1')
    expect(localWrapper.state('columnNames')).toEqual(['New column 1']);
    expect(localWrapper.state('cells')).toEqual([]);
  });

  it('adds columns', () => {
    // wrapper.update();
    instance.addCol(0);
    // wrapper.update();
    expect(Helpers.insertItem).toHaveBeenLastCalledWith(data.columnNames, 0, 'New column 1')
    expect(wrapper.state('cells')).toEqual([
      ['', 'a1', 'a2', 'a3'],
      ['', 'b1', 'b2', 'b3'],
      ['', 'c1', 'c2', 'c3'],
    ]);
    expect(wrapper.state('columnNames')).toEqual(['New column 1', 'col1', 'col2', 'col3']);

    instance.addCol(2);
    // wrapper.update();
    expect(Helpers.insertItem).toHaveBeenLastCalledWith(['New column 1', ...data.columnNames], 2, 'New column 3')
    expect(wrapper.state('cells')).toEqual([
      ['', 'a1', '', 'a2', 'a3'],
      ['', 'b1', '', 'b2', 'b3'],
      ['', 'c1', '', 'c2', 'c3'],
    ]);
    expect(wrapper.state('columnNames')).toEqual(['New column 1', 'col1', 'New column 3', 'col2', 'col3']);
  });

  it('removes col', () => {
    // wrapper.update();
    instance.removeCol(1);
    // wrapper.update();
    expect(Helpers.removeItem).toHaveBeenCalledTimes(data.cells.length + 1)
    expect(Helpers.removeItem).toHaveBeenLastCalledWith(data.columnNames, 1)
    expect(wrapper.state('cells')).toEqual([
      ['a1', 'a3'],
      ['b1', 'b3'],
      ['c1', 'c3'],
    ]);
    expect(wrapper.state('columnNames')).toEqual(['col1', 'col3']);

    instance.removeCol(0);
    // wrapper.update();
    expect(Helpers.removeItem).toHaveBeenLastCalledWith(['col1', 'col3'], 0)
    expect(wrapper.state('cells')).toEqual([
      ['a3'],
      ['b3'],
      ['c3'],
    ]);
    expect(wrapper.state('columnNames')).toEqual(['col3']);
  });

  it('updates data cell', () => {
    // wrapper.update();
    const mockEvent = { target: { value: '45' } } as React.ChangeEvent<HTMLInputElement>
    instance.updateCell(1, 1, mockEvent);
    // wrapper.update();
    expect(Helpers.updateItem).toHaveBeenCalledTimes(2)
    expect(Helpers.updateItem).toHaveBeenLastCalledWith(data.cells, 1, ['b1', '45', 'b3'])
    expect(wrapper.state('cells')).toEqual([
      ['a1', 'a2', 'a3'],
      ['b1', '45', 'b3'],
      ['c1', 'c2', 'c3'],
    ]);
  });

  it('updates column name', () => {
    // wrapper.update();
    const mockEvent = { target: { value: 'New name' } } as React.ChangeEvent<HTMLInputElement>
    instance.updateColName(1,  mockEvent);
    expect(Helpers.updateItem).toHaveBeenCalledTimes(1)
    expect(Helpers.updateItem).toHaveBeenLastCalledWith(data.columnNames, 1, 'New name')
    expect(wrapper.state('columnNames')).toEqual(['col1', 'New name', 'col3']);
  });

  it('calls onChange prop', () => {
    onChange.mockClear();
    wrapper = shallow(<Table onChange={onChange} data={data} />);
    // adding column
    instance.addCol(0);
    // wrapper.update();
    const cellsWithNewRow = [
      ['', 'a1', 'a2', 'a3'],
      ['', 'b1', 'b2', 'b3'],
      ['', 'c1', 'c2', 'c3'],
    ]
    expect(onChange).toHaveBeenCalledWith({
      columnNames: ['New column 1', ...data.columnNames],
      cells: cellsWithNewRow
    });
    // adding row
    onChange.mockClear();
    instance.addRow(0);
    // wrapper.update();
    expect(onChange).toHaveBeenCalledWith({
      columnNames: ['New column 1', ...data.columnNames],
      cells: [
        ['', '', '', ''],
        ['', 'a1', 'a2', 'a3'],
        ['', 'b1', 'b2', 'b3'],
        ['', 'c1', 'c2', 'c3'],
      ],
    });
    // updating cell
    onChange.mockClear();
    const mockEvent = { target: { value: '22' } } as React.ChangeEvent<HTMLInputElement>
    instance.updateCell(0, 0, mockEvent);
    // wrapper.update();
    expect(onChange).toHaveBeenCalledWith({
      columnNames: ['New column 1', ...data.columnNames],
      cells:[
        ['22', '', '', ''],
        ['', 'a1', 'a2', 'a3'],
        ['', 'b1', 'b2', 'b3'],
        ['', 'c1', 'c2', 'c3'],
      ],
    });

    // TODO: more onChange tests (remove row, remove col, etc)
  });

  it('shows hints if no data', () => {
    const localWrapper: ShallowWrapper<TableProps, TableState, Table> = shallow(
      <Table
        onChange={onChange}
        data={{
          columnNames: [],
          cells: []
        }}
      />
    );

    expect(localWrapper.find(Styled.Hint).first().dive().find('p')).toHaveLength(1)
    expect(localWrapper.find(Styled.Hint).first().text()).toBe('No columns defined.')

    expect(localWrapper.find(Styled.Hint).at(1).dive().find('p')).toHaveLength(1)
    expect(localWrapper.find(Styled.Hint).at(1).text()).toBe('No rows defined.')
  });

  it('does not show hints if data defined', () => {
    expect(wrapper.find(Styled.Hint).first().text()).toBe('')
    expect(wrapper.find(Styled.Hint).at(1).text()).toBe('')
  });
});
