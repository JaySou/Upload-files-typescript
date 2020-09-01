import './style.css';
import React from "react";

export interface DataTableProps {
  tableTitle?: string;
  data: Array<{}>;
  columns: Array<{ column: string; value: string }>;
}

const DataTable: React.FC<DataTableProps> = (props) => {

  function handleChangeSearch(e: any) {
    
  }


  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title"> {props.tableTitle} </h3>

        <div className="card-tools">
          <div
            className="input-group input-group-sm"
            style={{ width: "auto" }}
          >

            <input
              type="text"
              name="table_search"
              className="form-control float-right"
              placeholder="Search"
              onChange={handleChangeSearch}
            />
            <div className="input-group-append">
              <button type="button" className="btn btn-default">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card-body table-responsive p-0"
        style={{ height: "25rem" }}
      >
        <table className="table table-head-fixed text-nowrap">
          <thead>
            <tr>
              {props.columns.map((col, i) => (
                <th key={`head-cel-${i}`}> {col.column} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.data.map((row: any, r) => (
              <tr key={`body-row-${r}`}>
                {props.columns.map((col, c) => (
                  <td key={`body-row-${r}-cel-${c}`}> {row[col.value]} </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
