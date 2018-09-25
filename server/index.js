const Koa = require('koa');
const router = require('./router');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const PORT = 3000;

app.use(cors());
app.use(bodyParser());  
app.use(router.routes());

app.listen(PORT, console.log('listening in port 3000'));