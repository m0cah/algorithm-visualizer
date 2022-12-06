import { createContext } from 'react';
import createPersistedState from 'use-persisted-state';

//a persistedState enables everything to be the same even after refreshing or re-rendering 
// what is localStorage? 
const useDataState = createPersistedState('tableData', localStorage);
const useAlgorithmState = createPersistedState('algorithm', localStorage);

//create each individual node that will be stored in our tabel 
function createNode(rowVal, colVal){
    return {
        className:'unvisited',
        seen: 'false', 
        row: rowVal, 
        col: colVal, 
        //these we need to calculate before hand 
        distanceToFinishNode: null, 
        distanceToStartNode: null, 
        combinedDistance: null
    };
}

//creates our main table that we will eventually see on the screen 
const initData = () => {
        let numRows =  5;
        let numCols = 5;
        const table = [];
        for (let row = 0; row < numRows; row++) {
          const currentRow = [];
          for (let col = 0; col < numCols; col++) {
            currentRow.push(createNode(row, col));
          }
          table.push(currentRow);
        }
        return { table, numRows, numCols };
}

// some random function that i got no clue what it does 
export const setDataDef = () => {};

//creates a context (global for all react components) which has the 
//table, setData, algorithimType, setAlgorithim
export const DataContext = createContext({
  tableData: initData,
  setTableData: setDataDef,
  algorithmType: 'A*',
  setAlgorithmType: () => {},
});

//main function that makes us a provider which has the table data, algoType and functions to change them if needed
//this helps keep stuff updated even on re-loads i believe + can be accessed by any components 
export function DataProvider({ children }){
  const { Provider } = DataContext;
  const [tableData, setTableData] = useDataState(initData);
  const [algorithmType, setAlgorithmType] = useAlgorithmState('');
  return (<Provider value={{ tableData, setTableData,  algorithmType, setAlgorithmType}}>{children}</Provider>
  );
}