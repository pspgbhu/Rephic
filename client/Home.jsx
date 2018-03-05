import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    我是 Home 组件！
    <Link to="/">返回首页</Link>
  </div>
);

export default Home;
