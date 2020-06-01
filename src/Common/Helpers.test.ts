import PapaParse from 'papaparse';
import FileSaver from 'file-saver';
import { mocked } from 'ts-jest/utils';
import { saveAsCSV } from './Helpers';

//PapaParse.unparse = jest.fn();

jest.mock('papaparse');
jest.mock('file-saver');

const FileSaverMocked = mocked(FileSaver, true)
const PapaParseMocked = mocked(PapaParse, true)

describe('Helpers', () => {
  const data = {
    fields: ['a', 'b'],
    data: [
      ['1', '2'],
    ],
  };

  it('saves CSV file', () => {
    saveAsCSV(data);
    expect(PapaParseMocked.unparse).toHaveBeenCalledWith(data);
    expect(FileSaverMocked.saveAs).toHaveBeenCalled();
    expect(FileSaverMocked.saveAs.mock.calls[0][1]).toBe('tableCSV.csv');
  });
});
