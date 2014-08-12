// expressを代入
var express = require('express'),
    app     = express();

// これは古いので必要ない
//app.use(app.router);

// railsのroutesみたいな感じで書く、postとかもあるよ
// いくつでも増やせる
app.get('/', function(req, res) {
    res.send('Hello world')
});
app.get('/about', function(req, res) {
    res.send('about this page')
});

// 3000番のポートで待ち受け！
app.listen(3000);
console.log('server starting...');