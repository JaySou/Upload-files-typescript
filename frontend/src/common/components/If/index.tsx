import React from 'react';

interface IfProps {
  test: boolean;
}

const If: React.FC<IfProps> = props => {
  return (
    <>
      {props.test ? props.children : null}
    </>
  );
}

export default If;