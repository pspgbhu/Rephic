import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/style.less';

const Root = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <Link to="/home">Go To Home</Link>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
);

export default Root;
