import React from 'react';
import { Route } from 'react-router-dom';
import Root from './Root';
import Author from './Author';

require('./style/style.less');
require('./style/demo.css');

const App = () => ((
  <div>
    <Route exact path="/" component={ Root }></Route>
    <Route exact path="/Author" component={ Author }></Route>
  </div>
));

export default App;
