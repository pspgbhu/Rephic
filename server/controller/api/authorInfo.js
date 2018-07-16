const { getInfo } = require('../../service/user');

module.exports = async (ctx, next) => {
  let info;
  try {
    info = await getInfo();
  } catch (error) {
    ctx.body = { code: -1, msg: 'Server Error' };
    return;
  }

  ctx.body = {
    code: 0,
    data: info,
  };

  await next();
};
