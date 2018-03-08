import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Root = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Welcome to React Isomorphic</h1>
    </header>
    <Link to="/author">Jump to other page</Link>
  </div>
);

export default Root;
