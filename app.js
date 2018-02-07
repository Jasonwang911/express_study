var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
// 设置cookie
app.use(cookieParser());

// 配置静态资源
app.use(express.static('public'));
// 
app.use(bodyParser.urlencoded({
	extended: false
}));
// parse application/json
app.use(bodyParser.json());
// 配置ejs模板引擎
app.set('view engine', 'ejs');
// 设置模板引擎的位置
app.set('views', __dirname + '/statics');



// 应用级中间件： 表示在路由开始前执行的一系列的操作
app.use((req, res, next) => {
	// 参数1--名字， 参数2--值， 参数3--配置
	res.cookie('username', 'cookie-value', {
		maxAge: 60000
	});
	console.log(new Date());
	next();
});

app.get('/', (req, res) => {
	console.log(req.cookies)
	var arr = ['小明', '小魁']
	res.render('index', {
		name: arr
	});
});

app.get('/login', (req, res) => {
	res.render('login', {});
});

app.post('/dologin', (req, res) => {
	console.log(req.body);
});

// 路由级中间件 --- 有问题： Can't set headers after they are sent.
// app.get('/duble', (req, res, next) => {
// 	res.send('这是路由级中间件1');
// 	next();
// });

// app.get('/duble', (req, res) => {
// 	res.send('这是路由级中间件2');
// });

app.get('/news', (req, res) => {
	var arr = ['小明', '小魁']
	res.render('index', {
		name: arr
	});
});

app.use((req, res) => {
	res.status(404).send('404页面')
})

app.listen('7001', '127.0.0.1');