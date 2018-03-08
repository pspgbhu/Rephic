exports.getAuthorInfo = () => new Promise((resolve) => {
  // 模拟异步获取数据的情况
  setTimeout(() => {
    resolve({
      name: 'pspgbhu',
      email: 'brotherchun001@gmail.com',
      site: 'http://pspgbhu.me',
    });
  }, 100);
});
