// expressを代入
var express = require('express'),
    app     = express();

// こんな感じにしておけば、静的ファイルへのアクセスは全カバーできる
app.use(express.static(__dirname + '/public'));

// railsのroutesみたいな感じで書く、postとかもあるよ
// いくつでも増やせる
app.get('/', function(req, res) {
    res.send('Hello world')
});
app.get('/about', function(req, res) {
    res.send('about this page')
});

// マジでRailsみたいな感じでとれる、コロンの部分をプレースホルダという
// はてなをつけるとオプショナル！Swiftやんけ！
app.get('/users/:name?', function(req, res) {
    if (req.params.name) {
        res.send('Hello ' + req.params.name);
    } else {
        res.send('Hello Guest!');
    }
});

// routerには正規表現も使えるよ
app.get('/items/:id([0-9]+)', function(req, res) {
    res.send('item no: ' + req.params.id);
});

// ファイルを取得してみる
app.get('/hello.txt', function(req, res) {
    res.sendfile(__dirname + '/public/hello.txt');
});


// 3000番のポートで待ち受け！
app.listen(3000);
console.log('server starting...');