import express from 'express';
import dotenv from 'dotenv';
import getManifest from './utils/getManifest';
import renderClient from './renderClient';

dotenv.config();

const app = express();
const { NODE_ENV, PORT } = process.env;

if (NODE_ENV === 'development') {
  console.log('Development config');
  // eslint-disable-next-line global-require
  const webpack = require('webpack');
  // eslint-disable-next-line global-require
  const webpackConfig = require('../../webpack/webpack.config.client');
  // eslint-disable-next-line global-require
  const webpackDevMiddleware = require('webpack-dev-middleware');
  // eslint-disable-next-line global-require
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use((req, res, next) => {
    if (!req.hashManifest)req.hashManifest = getManifest();
    next();
  });
  app.use(express.static(`${__dirname}/public`));
}

app.get('*', renderClient());

app.listen(PORT, (error) => {
  if (error) console.log(error);
  else console.log(`Server running on port ${PORT}`);
});

