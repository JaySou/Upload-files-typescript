import React from 'react';

const GridRow: React.FC = props => {
  return (
    <div className="row">
      {props.children}
    </div>
  );
}

export default GridRow;