import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchInfo } from './actions';

class Author extends Component {
  componentWillMount() {
    this.props.dispatch(fetchInfo());
  }

  render() {
    const { name, email } = this.props;
    return (
      <div>
        <h2>About Author</h2>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>GitHub: <a href="https://github.com/pspgbhu">Pspgbhu's GitHub</a></p>
        <p>Site: <a href="http://pspgbhu.me">http://pspgbhu.me</a></p>
        <p>关于服务端渲染时到底需要初始化多少数据到 Redux 中的一些建议：</p>
        <p style={{ maxWidth: '800px' }}>
          当我们直接访问 /author 页面时，Name 和 Email 由服务端直接渲染出来。
          但是当我们直接访问其他页面时，/author 页面的数据就没有必要由服务端直接储存在 Redux Store 中。当通过 React Router 由前端跳转至 /author 页面时，将会去异步的获取 Name 和 Email 的值。
        </p>
        <p>
          对于任何页面我们都应该采用同样的处理方式：服务端只为 Redux 初始化当前页面所需要的数据。
        </p>
        <Link to="/">Back Home</Link>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { name, email } = state.authorInfo;
  return ({ name, email });
};


export default withRouter(connect(mapStateToProps)(Author));
