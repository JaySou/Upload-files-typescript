import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouterWrapper } from './common/components/Router';

/** Component Main */
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouterWrapper>
      <div className="wrapper">
        <App />
      </div>
    </BrowserRouterWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);