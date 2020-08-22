import React from 'react';

const ContentContainer: React.FC = props => {
  return (
    <div className="content">
      <div className="container">
        {props.children}
      </div>
    </div>
  );
}

export default ContentContainer;