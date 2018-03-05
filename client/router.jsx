import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

/**
 * 此文件只会被客户端所引用，因此为了保证前后端路由的一致性，
 * 请只在 routes.jsx 中编辑路由逻辑。
 */

const AppRouter = () => (
  <BrowserRouter>
    <Routes></Routes>
  </BrowserRouter>
);

export default AppRouter;
