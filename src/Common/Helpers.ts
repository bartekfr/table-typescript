import PapaParse, { UnparseObject } from 'papaparse';
import { saveAs } from 'file-saver';

// Immutable array helpers
// from https://redux.js.org/recipes/structuringreducers/immutableupdatepatterns
export function insertItem<T = string>(array: T[], index: number, item: T) {
  const newArray: T[] = array.slice();
  newArray.splice(index, 0, item as T);
  return newArray;
}

export function removeItem<T = string>(array: T[], index: number) {
  const newArray = array.slice();
  newArray.splice(index, 1);
  return newArray;
}

export function updateItem<T>(array: T[], index: number, newItem: T) {
  return array.map((item, i) => {
    if (i !== index) {
      return item;
    }
    return newItem;
  });
}


// saves data as CSV file
export function saveAsCSV(data: UnparseObject) {
  const csvString = PapaParse.unparse(data);
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, 'tableCSV.csv');
}
