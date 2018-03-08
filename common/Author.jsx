import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Author = props => (
  <div>
    <h2>About Author</h2>
    <p>Name: Pspgbhu</p>
    <p>Email: brotherchun001@gmail.com</p>
    <p>GitHub: <a href="https://github.com/pspgbhu">Pspgbhu's GitHub</a></p>
    <p>Site: <a href="http://pspgbhu.me">http://pspgbhu.me</a></p>
    <Link to="/">Back Home</Link>
  </div>
);


const mapStateToProps = state => ({
  info: state.info,
});


// export default Author;
export default connect(mapStateToProps)(Author);
