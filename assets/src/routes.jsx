import React from 'react';
import { Route } from 'react-router-dom';
import App from './App';
import Home from './Home';

const routes = () => ((
  <div>
    <Route exact path="/" component={ App }></Route>
    <Route exact path="/home" component={ Home }></Route>
  </div>
));

export default routes;
