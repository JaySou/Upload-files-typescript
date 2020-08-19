import React from 'react';

interface ContentProps {
  content: string;
  display: string;

}

const Content: React.FC<ContentProps> = props => {

  const display = props.content === props.display ? "" : "none"

  return (
    <div id={props.content} style={{ display }}>
      {props.children}
    </div>
  );
}

export default Content;
