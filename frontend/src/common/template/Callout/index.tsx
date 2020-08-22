import React from 'react';

type type = 'info' | 'warning' | 'success' | 'danger' | 'default'

interface CalloutProps {
  type: type;
  title: string;
  col: number;
}

const Callout: React.FC<CalloutProps> = props => {

  return (
    <div className={`callout callout-${props.type} col-lg-${props.col}`}>
      <h5>
        <span style={{ verticalAlign: "inherit" }}>
          <span style={{ verticalAlign: "inherit" }}>
            {props.title}
          </span>
        </span>
      </h5>
      <div>
        {props.children}
      </div>
    </div>
  );
}

export default Callout;