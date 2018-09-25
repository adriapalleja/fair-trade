const Router = require('koa-router');
const controller = require('./controller');
const router = new Router();

router.post('/register', controller.registerUser);
router.post('/createPost', controller.createPost);

module.exports = router;