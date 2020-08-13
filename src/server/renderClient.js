import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import initialState from '../client/store';
import reducer from '../client/reducer';
import serverRouter from '../client/routes/serverRoutes';

function renderFullPage(html, preloadedState, manifest) {
  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  return (
    `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <link rel="stylesheet" href="${mainStyles}" type="text/css"/>
              <meta charset="UTF-8"/>
              <title>Platzi Video</title>
          </head>
          <body>
              <div id="app">${html}</div>
              <script>
              window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
              </script>
              <script src="${mainBuild}" type="text/javascript"></script>
          </body>
          </html>`
  );
};
function renderClient() {
  return ((req, res) => {
    const manifest = req.hashManifest;
    const store = createStore(reducer, initialState);
    const preloadedState = store.getState();
    const reactApp = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          {renderRoutes(serverRouter)}
        </StaticRouter>
      </Provider>,
    );
    res.send(renderFullPage(reactApp, preloadedState, manifest));
  }
  );
};

export default renderClient;
