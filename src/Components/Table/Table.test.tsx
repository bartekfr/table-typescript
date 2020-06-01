import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Table, { TableProps, TableState } from './index';

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
  const onChange = jest.fn();

  beforeEach(() => {
    // wrapper = shallow(<Table onChange={onChange} data={data} />);
  });

  it('adds row even if there are no columns', () => {
    wrapper = shallow(<Table onChange={onChange} data={{
      columnNames: [],
      cells: []
    }} />);
    const instance = wrapper.instance();
    instance.addRow(0);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      [],
    ]);
    instance.addRow(0);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      [],
      [],
    ]);
  });

  it('adds row', () => {
    wrapper = shallow(<Table onChange={onChange} data={data} />);
    // wrapper.update();
    const instance = wrapper.instance();
    instance.addRow(1);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['a1', 'a2', 'a3'],
      ['', '', ''],
      ['b1', 'b2', 'b3'],
      ['c1', 'c2', 'c3'],
    ]);

    instance.addRow(3);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['a1', 'a2', 'a3'],
      ['', '', ''],
      ['b1', 'b2', 'b3'],
      ['', '', ''],
      ['c1', 'c2', 'c3'],
    ]);
  });

  it('removes row', () => {
    wrapper = shallow(<Table onChange={onChange} data={data} />);
    // wrapper.update();
    const instance = wrapper.instance();
    instance.removeRow(1);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['a1', 'a2', 'a3'],
      ['c1', 'c2', 'c3'],
    ]);

    instance.removeRow(0);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['c1', 'c2', 'c3'],
    ]);
  });

  it('adds columns even if there are no rows', () => {
    wrapper = shallow(<Table onChange={onChange} data={data} />);
    const instance = wrapper.instance();
    instance.addCol(0);
    wrapper.update();
    expect(wrapper.state('columnNames')).toEqual(['New column 1', ...data.columnNames]);
    expect(wrapper.state('cells')).toEqual([
      ['', 'a1', 'a2', 'a3'],
      ['', 'b1', 'b2', 'b3'],
      ['', 'c1', 'c2', 'c3'],
    ]);
  });

  it('adds columns', () => {
    wrapper = shallow(<Table onChange={onChange} data={data} />);
    // wrapper.update();
    const instance = wrapper.instance();
    instance.addCol(0);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['', 'a1', 'a2', 'a3'],
      ['', 'b1', 'b2', 'b3'],
      ['', 'c1', 'c2', 'c3'],
    ]);
    expect(wrapper.state('columnNames')).toEqual(['New column 1', 'col1', 'col2', 'col3']);

    instance.addCol(2);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['', 'a1', '', 'a2', 'a3'],
      ['', 'b1', '', 'b2', 'b3'],
      ['', 'c1', '', 'c2', 'c3'],
    ]);
    expect(wrapper.state('columnNames')).toEqual(['New column 1', 'col1', 'New column 3', 'col2', 'col3']);
  });

  it('removes col', () => {
    wrapper = shallow(<Table onChange={onChange} data={data} />);
    // wrapper.update();
    const instance = wrapper.instance();
    instance.removeCol(1);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['a1', 'a3'],
      ['b1', 'b3'],
      ['c1', 'c3'],
    ]);
    expect(wrapper.state('columnNames')).toEqual(['col1', 'col3']);

    instance.removeCol(0);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['a3'],
      ['b3'],
      ['c3'],
    ]);
    expect(wrapper.state('columnNames')).toEqual(['col3']);
  });

  it('updates data cell', () => {
    wrapper = shallow(<Table onChange={onChange} data={data} />);
    // wrapper.update();
    const instance = wrapper.instance();
    const mockEvent = { target: { value: '45' } } as React.ChangeEvent<HTMLInputElement>
    instance.updateCell(1, 1, mockEvent);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['a1', 'a2', 'a3'],
      ['b1', '45', 'b3'],
      ['c1', 'c2', 'c3'],
    ]);
  });

  it('updates column name', () => {
    wrapper = shallow(<Table onChange={onChange} data={data} />);
    // wrapper.update();
    const instance = wrapper.instance();
    const mockEvent = { target: { value: 'New name' } } as React.ChangeEvent<HTMLInputElement>
    instance.updateColName(1,  mockEvent);
    wrapper.update();
    expect(wrapper.state('columnNames')).toEqual(['col1', 'New name', 'col3']);
  });

  it('calls onChange prop', () => {
    onChange.mockClear();
    wrapper = shallow(<Table onChange={onChange} data={data} />);
    const instance = wrapper.instance();
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
});
