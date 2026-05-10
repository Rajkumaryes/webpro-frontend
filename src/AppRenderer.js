import React, { Suspense } from 'react';
// For React 18 use the createRoot API from react-dom/client
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './redux/store';
  
const App = React.lazy(() => import(/* webpackChunkName: "App" */ './App'));

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={configureStore()}>
      <Suspense fallback={<div className="loading" />}>
        <App />
      </Suspense>
    </Provider>
  );
}
/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. This comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();
