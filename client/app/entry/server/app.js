import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../../App';

export default ({ ctx, store, context }) => (
  <StaticRouter location={ctx.url} context={context}>
    <Provider store={store}>
      <App/>
    </Provider>
  </StaticRouter>
);
