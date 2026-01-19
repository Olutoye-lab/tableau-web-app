import React, { useState, useMemo, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import UseDialog from './utils/use-dialog';

export const sample1 = [
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "department": "Engineering",
    "salary": 95000,
    "startDate": "2020-03-15",
    "isActive": true
  },
  {
    "id": 2,
    "name": "Bob Smith",
    "email": "bob@example.com",
    "department": "Marketing",
    "salary": 75000,
    "startDate": "2019-07-22",
    "isActive": true
  },
  {
    "id": 3,
    "name": "Charlie Brown",
    "email": "charlie@example.com",
    "department": "Sales",
    "salary": 68000,
    "startDate": "2021-01-10",
    "isActive": false
  },
  {
    "id": 4,
    "name": "Diana Prince",
    "email": "diana@example.com",
    "department": "HR",
    "salary": 82000,
    "startDate": "2018-11-05",
    "isActive": true
  },
  {
    "id": 5,
    "name": "Ethan Hunt",
    "email": "ethan@example.com",
    "department": "Engineering",
    "salary": 105000,
    "startDate": "2017-06-12",
    "isActive": true
  }
];
export const sample2 = [
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "department": "Engineering",
    "salary": 102000,
    "startDate": "2020-03-15",
    "isActive": true
  },
  {
    "id": 2,
    "name": "Bob Smith",
    "email": "bob@example.com",
    "department": "Product",
    "salary": 85000,
    "startDate": "2019-07-22",
    "isActive": true
  },
  {
    "id": 4,
    "name": "Diana Prince",
    "email": "diana@example.com",
    "department": "HR",
    "salary": 82000,
    "startDate": "2018-11-05",
    "isActive": true
  },
  {
    "id": 5,
    "name": "Ethan Hunt",
    "email": "ethan@example.com",
    "department": "Engineering",
    "salary": 105000,
    "startDate": "2017-06-12",
    "isActive": false
  },
  {
    "id": 6,
    "name": "Fiona Gallagher",
    "email": "fiona@example.com",
    "department": "Finance",
    "salary": 90000,
    "startDate": "2023-02-20",
    "isActive": true
  }
];

const DatasetDiffViewer = ({set1, set2}: {set1: any[], set2: any[]}) => {
  const [dataset1, setDataset1] = useState<any[]>([]);
  const [dataset2, setDataset2] = useState<any[]>([]);
  const [idField, setIdField] = useState('id');
  const [filterType, setFilterType] = useState('all');



  const loadDatasets = () => {
    try {

      setDataset1(set1);
      setDataset2(set2);
      
      // Auto-detect ID field if possible
      if (set1.length > 0) {
        const keys = Object.keys(set1[0]);
        const possibleIdFields = ['id', 'ID', '_id', 'key', 'uuid', "Id"];
        const detectedId = possibleIdFields.find(field => keys.includes(field));
        if (detectedId) setIdField(detectedId);
      }
    } catch (error: any) {
      alert('Invalid JSON: ' + error.message);
    }
  };


  useEffect(()=>{
    if (set1.length > 0 && set2.length > 0){
      loadDatasets()
    }
  }, [set2])

  const diffResult = useMemo(() => {
    if (dataset1.length === 0 && dataset2.length === 0) {
      return { rows: [], columns: [] };
    }

    const map1 = new Map(dataset1.map(item => [item[idField], item]));
    const map2 = new Map(dataset2.map(item => [item[idField], item]));
    
    const allKeys = new Set([...map1.keys(), ...map2.keys()]);
    
    // Get all unique columns from both datasets
    const columnsSet = new Set();
    [...dataset1, ...dataset2].forEach(item => {
      Object.keys(item).forEach(key => columnsSet.add(key));
    });
    const columns = Array.from(columnsSet);
    
    const rows = Array.from(allKeys).map(key => {
      const item1 = map1.get(key);
      const item2 = map2.get(key);
      
      let rowType = 'unchanged';
      const changedFields = new Set();
      
      if (!item1 && item2) {
        rowType = 'added';
      } else if (item1 && !item2) {
        rowType = 'removed';
      } else if (item1 && item2) {
        columns.forEach((col: any) => {
          const val1 = item1[col];
          const val2 = item2[col];
          
          // Deep comparison for objects/arrays
          if (JSON.stringify(val1) !== JSON.stringify(val2)) {
            changedFields.add(col);
            rowType = 'modified';
          }
        });
      }
      
      return {
        key,
        item1,
        item2,
        rowType,
        changedFields
      };
    });
    
    return { rows, columns };
  }, [dataset1, dataset2, idField]);

  const filteredRows = useMemo(() => {
    if (filterType === 'all') return diffResult.rows;
    return diffResult.rows.filter(row => row.rowType === filterType);
  }, [diffResult.rows, filterType]);

  const getCellClassName = (rowType: any, fieldName: any, changedFields: any) => {
    const base = 'px-3 py-2 border-b border-gray-200 text-sm';
    
    if (rowType === 'added') {
      return `${base} bg-green-100`;
    }
    if (rowType === 'removed') {
      return `${base} bg-red-300`;
    }
    if (rowType === 'modified' && changedFields.has(fieldName)) {
      return `${base} bg-yellow-100 font-semibold`;
    }
    return base;
  };

  const getRowLabel = (rowType: any) => {
    switch(rowType) {
      case 'added': return '+ Added';
      case 'removed': return '- Removed';
      case 'modified': return '~ Modified';
      default: return '✓ Same';
    }
  };

  const formatValue = (value: any) => {
    if (value === null) return 'null';
    if (value === undefined) return '-';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  const stats = useMemo(() => {
    const added = diffResult.rows.filter(r => r.rowType === 'added').length;
    const removed = diffResult.rows.filter(r => r.rowType === 'removed').length;
    const modified = diffResult.rows.filter(r => r.rowType === 'modified').length;
    const unchanged = diffResult.rows.filter(r => r.rowType === 'unchanged').length;
    return { added, removed, modified, unchanged };
  }, [diffResult.rows]);

  const showDatasets = dataset1.length > 0 || dataset2.length > 0;

  return (
    <>
      
      {/* Input Section
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Load Datasets</h2>
          <button
            onClick={loadSampleData}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
          >
            Load Sample Data
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Dataset 1 (JSON Array)</label>
            <textarea
              value={jsonInput1}
              onChange={(e) => setJsonInput1(e.target.value)}
              className="w-full h-32 p-2 border border-gray-300 rounded font-mono text-xs"
              placeholder='[{"id": 1, "name": "Alice", ...}]'
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Dataset 2 (JSON Array)</label>
            <textarea
              value={jsonInput2}
              onChange={(e) => setJsonInput2(e.target.value)}
              className="w-full h-32 p-2 border border-gray-300 rounded font-mono text-xs"
              placeholder='[{"id": 1, "name": "Alice", ...}]'
            />
          </div>
        </div>
        
        <div className="flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-2">ID Field (for matching rows)</label>
            <input
              type="text"
              value={idField}
              onChange={(e) => setIdField(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded"
              placeholder="id"
            />
          </div>
          <button
            onClick={loadDatasets}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
          >
            Compare Datasets
          </button>
        </div>
      </div> */}

      {/* Results Section */}
        <UseDialog component={
            <>
            {(set1.length > 0 && set2.length > 0)? 
            <>
            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-md p-4 shrink">
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
                  <span>Added: <strong>{stats.added}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-50 border border-red-200 rounded"></div>
                  <span>Removed: <strong>{stats.removed}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-50 border border-yellow-200 rounded"></div>
                  <span>Modified: <strong>{stats.modified}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
                  <span>Unchanged: <strong>{stats.unchanged}</strong></span>
                </div>
              </div>
              
              <div className="mt-4">
                <Select value={filterType} onValueChange={(e)=> setFilterType(e)} >
                  <SelectTrigger className="px-3 py-2 border border-gray-300 rounded-lg">
                      <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectGroup>
                          <SelectLabel className="block text-xs font-medium mb-2">Filter</SelectLabel>
                          <SelectItem value="all">All Rows ({diffResult.rows.length})</SelectItem>
                          <SelectItem value="added">Added ({stats.added})</SelectItem>
                          <SelectItem value="removed">Removed ({stats.removed})</SelectItem>
                          <SelectItem value="modified">Modified ({stats.modified})</SelectItem>
                          <SelectItem value="unchanged">Unchanged  ({stats.unchanged})</SelectItem>
                      </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tables */}
            <div className="flex flex-row gap-2 basis-4/5 max-h-4/5">
              {/* Dataset 1 */}
              <div className="bg-white rounded-lg shadow-md relative w-1/2 max-w-1/2 ">
                <div className="sticky top-0 bg-white border-b-2 border-gray-300 p-4 h-1/6">
                  <h2 className="text-lg font-semibold">Dataset 1 (Original)</h2>
                </div>
                <div className="overflow-auto h-5/6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 sticky top-0">
                        <th className="px-3 py-2 text-left text-xs font-semibold border-b-2 border-gray-300">Status</th>
                        {diffResult.columns.map((col: any) => (
                          <th key={col} className="px-3 py-2 min-w-20 text-left text-xs font-semibold border-b-2 border-gray-300 whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows.map(({ key, item1, rowType, changedFields }, index) => (
                        <tr key={index} className={!item1 ? 'opacity-40' : ''}>
                          <td className="px-3 py-2 border-b border-gray-200 text-xs whitespace-nowrap">
                            {getRowLabel(rowType)}
                          </td>
                          {diffResult.columns.map((col: any) => (
                            <td
                              key={col}
                              className={getCellClassName(rowType === 'added' ? 'unchanged' : rowType, col, changedFields)}
                            >
                              {item1 ? formatValue(item1[col]) : '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Dataset 2 */}
              <div className="bg-white rounded-lg shadow-md w-1/2 max-w-1/2">
                <div className="sticky top-0 bg-white border-b-2 border-gray-300 p-4 h-1/6">
                  <h2 className="text-lg font-semibold">Dataset 2 (New)</h2>
                </div>
                <div className="overflow-auto h-5/6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 sticky top-0">
                        <th className="px-3 py-2 text-left text-xs font-semibold border-b-2 border-gray-300">Status</th>
                        {diffResult.columns.map((col: any) => (
                          <th key={col} className="px-3 py-2 min-w-20 text-left text-xs font-semibold border-b-2 border-gray-300 whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows.map(({ key, item2, rowType, changedFields }, index) => (
                        <tr key={index} className={!item2 ? 'opacity-40' : ''}>
                          <td className="px-3 py-2 border-b border-gray-200 text-xs whitespace-nowrap">
                            {getRowLabel(rowType)}
                          </td>
                          {diffResult.columns.map((col: any) => (
                            <td
                              key={col}
                              className={getCellClassName(rowType === 'removed' ? 'unchanged' : rowType, col, changedFields)}
                            >
                              {item2 ? formatValue(item2[col]) : '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            </>
          : 
          <div className='w-full h-full bg-white border-2 border-green-200 rounded-lg p-8 flex flex-row gap-2'>
            <div className='w-1/2 h-full border-2 border-blue-200 rounded-xl flex flex-col items-center justify-center font-sans'>
              {"No ingested dataset"}<p className='opacity-50 font-serif text-xs'>Please finish data ingestion before viewing diff</p>
            </div>
            <div className='w-1/2 h-full border-2 border-blue-200 rounded-xl flex flex-col items-center justify-center font-sans'>
              {"No ingested dataset"}<p className='opacity-50 font-serif text-xs'>Please finish data ingestion before viewing diff</p>
            </div>
          </div>}
        </>
        }/>      
    </>
  );
};

export default DatasetDiffViewer;