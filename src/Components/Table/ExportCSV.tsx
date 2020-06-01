import React from 'react';
import { UnparseObject } from 'papaparse';
import { saveAsCSV } from '../../Common/Helpers';
import { CsvBtn } from './styles'

interface ExportCSVProps {
  data: UnparseObject
}

const ExportCSV: React.FunctionComponent<ExportCSVProps> = ({ data }) => (
  <CsvBtn type="button" onClick={() => saveAsCSV(data)}>Save as CSV</CsvBtn>
);

export default ExportCSV;
