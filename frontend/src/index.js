import React from 'react';
// import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import {ContextProvider} from './contexts/ContextProvider';

// Loading fallback component
// const LoadingFallback = () => (
//   <div className="flex items-center justify-center h-screen">
//     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//   </div>
// );
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
    {/* <Suspense fallback={<LoadingFallback />}> */}
      <ContextProvider>
        <App />
      </ContextProvider>
    {/* </Suspense> */}
  </React.StrictMode>,
    document.getElementById('root'),
  );