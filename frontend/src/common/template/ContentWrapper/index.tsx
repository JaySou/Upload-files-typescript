import React from 'react';

const ContentWrapper: React.FC = props => {
  return (
    <div className='content-wrapper'>
      {props.children}
    </div>
  );
}

export default ContentWrapper;