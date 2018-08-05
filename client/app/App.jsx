import React from 'react';
import { Route, Link } from 'react-router-dom';
import Author from './Author';

// 样式文件需要使用 require 引入，这样 babel-register 才能正确的忽略这些样式文件
require('./style/style.less');
require('./style/demo.scss');

const Root = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Welcome to React Isomorphic</h1>
    </header>
    <Link to="/author">Jump to other page by react router</Link>
    <div style={{ marginTop: '60px' }}>
      <a href="https://github.com/pspgbhu/react-isomorphic#react-isomorphic">查看更多帮助信息</a>
    </div>
  </div>
);

const App = () => ((
  <div>
    <Route exact path="/" component={Root}></Route>
    <Route exact path="/Author" component={ Author }></Route>
  </div>
));

export default App;
