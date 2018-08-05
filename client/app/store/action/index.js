import axios from 'axios';

export const FETCH_INFO_REQUEST = 'fetch_info_requset';
export const FETCH_INFO_ERROR = 'fetch_info_error';
export const FETCH_INFO_SUCCESS = 'fetch_info_success';
export const FETCH_INFO_CACHED = 'fetch_info_cached';

export const fetchInfo = () => (dispatch, getState) => {
  const { authorInfo } = getState();

  // 在服务器环境，或在浏览器中直接访问的 /author 页面， Redux Store 中会有该数据的缓存。
  if (authorInfo.name) {
    dispatch({ type: FETCH_INFO_CACHED });
    return;
  }

  dispatch({ type: FETCH_INFO_REQUEST });

  // 如果是通过前端路由跳转到这个页面的，则需要异步的请求数据
  const api = '/api/authorInfo';
  axios.get(api).then(({ data }) => {
    if (data.code !== 0) {
      dispatch({ type: FETCH_INFO_ERROR, msg: data.msg });
      return;
    }
    dispatch({
      type: FETCH_INFO_SUCCESS,
      data: data.data,
    });
  }).catch((error) => {
    dispatch({ type: FETCH_INFO_ERROR, msg: error });
  });
};
