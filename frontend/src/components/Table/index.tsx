import './style.css';
import React from 'react';

interface TableProps {
  title: string;
  columns: Array<{ title: string, field: string }>,
  data: any[];
  atualPage?: number;
  finishPage?: number;
  handleClickPreview?: () => void;
  handleClickNext?: () => void;
}

const Table: React.FC<TableProps> = props => {

  return (

    <div className="container">
      <div className="row">

        <div className="col-md-12 col-md-offset-1">

          <div className="panel panel-default panel-table">
            <div className="panel-heading">
              <div className="row">
                <div className="col col-xs-6">
                  <h5 className="panel-title mb-5"> {props.title} </h5>
                </div>
              </div>
            </div>
            <div className="panel-body table-responsive">
              <table className="table table-striped table-bordered table-list">
                <thead>
                  <tr>

                    {
                      props.columns.map((col, icol) => <th key={`head-cel-${icol}`}> {col.title} </th>)
                    }

                  </tr>
                </thead>
                <tbody id="myTable">
                  {
                    props.data.map((data, irow) => (
                      <tr key={`body-row-${irow}`}>
                        {
                          props.columns.map((col, icol) => <td key={`body-row${irow}-cel-${icol}`}> {data[col.field]} </td>)
                        }
                      </tr>
                    ))
                  }
                </tbody>
              </table>

            </div>
            <div className="panel-footer">
              <div className="row">

                <div className="col col-xs-4"> Page {!props.atualPage ? 1 : props.atualPage  } of {!props.finishPage ? 1 : props.finishPage}
                  </div>
                <div className="col col-xs-8">
                  <ul className="pagination hidden-xs pull-right" id="myPager">
                  </ul>
                  <ul className="pagination visible-xs pull-right">
                    <li><button type="button" className="btn btn-primary mr-2" onClick={props.handleClickPreview}>Anterior</button ></li>
                    <li><button type="button" className="btn btn-primary ml-2" onClick={props.handleClickNext} >Proximo</button ></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div></div></div>

  );
}

export default Table;