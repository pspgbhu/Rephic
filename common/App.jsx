import React from 'react';
import { Route, Link } from 'react-router-dom';
import Author from './Author';

require('./style/style.less');
require('./style/demo.css');

const Root = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Welcome to React Isomorphic</h1>
    </header>
    <Link to="/author">Jump to other page</Link>
  </div>
);


const App = () => ((
  <div>
    <Route exact path="/" component={Root}></Route>
    <Route exact path="/Author" component={ Author }></Route>
  </div>
));

export default App;
