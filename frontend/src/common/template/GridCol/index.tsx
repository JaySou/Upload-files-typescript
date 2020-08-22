import React from 'react';

interface GridColProps {
  length: number;
}

const GridCol: React.FC<GridColProps> = props => {
  return (
    <div className={`col-lg-${props.length}`}>
      {props.children}
    </div>
  );
}

export default GridCol;