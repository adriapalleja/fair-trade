const model = require('./model');

exports.createPost = async (ctx) => {
  try {
    await model.createPost(ctx.request.body);
    ctx.status = 201;
  } catch (err) {
    ctx.status = err.code;
  }
}

exports.registerUser = async (ctx) => {
  try {
    await model.registerUser(ctx.request.body);
    ctx.status = 201;
  } catch (err) {
    ctx.status = err.code;
  }
}

exports.userInterested = async (ctx) => {
  try {
    await model.userInterested(ctx.request.body);
    ctx.status = 201;
  } catch (err) {
    ctx.status = err.code;
  }
}