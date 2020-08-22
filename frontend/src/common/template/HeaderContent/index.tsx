import React from 'react';

interface HeaderContentprops {
  title?: string;
}

const HeaderContent: React.FC<HeaderContentprops> = props => {
  return (
    <div className="content-header">
      <div className="container">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">
              {props.title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderContent;