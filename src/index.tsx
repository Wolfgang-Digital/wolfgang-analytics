import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';

import './index.css';
import * as serviceWorker from './serviceWorker';
import awsExports from './aws-exports';
import App from './App';

Amplify.configure(awsExports);

// Remove strict mode until react-select legacy context API error fixed

ReactDOM.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();

