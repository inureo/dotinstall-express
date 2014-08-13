// node appでアプリ起動
// nodemonを-gでインストールすればnodemon appで毎回再起動しなくてOK

// expressを代入
var express = require('express');
var morgan  = require('morgan'); // loggerはmorganへ [expressjs/morgan](https://github.com/expressjs/morgan)
var app     = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.use で読み込まれるものをmiddlewareと呼ぶ、書く順番で適用されていく
// 静的ファイルの上にrouterを書いておけばrouterが先に適用される
// こんな感じにしておけば、静的ファイルへのアクセスは全カバーできる
app.use(morgan('dev')); // loggerは4で名前が変わった
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) { // next()使う時は引数にnextを！
   console.log('my custom middleware !');
   next(); // next()がないと
});

// app.param('hoge')で、対象のparamに対して共通の処理ができる
app.param('id', function(req, res, next, id) {
    var users = ['tezuka', 'ryo', 'inureo'];
    req.params.name = users[id];
    next();
});

app.get('/hello/:id', function(req, res) {
    res.send('ossu! ' + req.params.name);
});

// railsのroutesみたいな感じで書く、postとかもあるよ
// いくつでも増やせる
app.get('/', function(req, res) {
    res.render('index', { title: 'title' }); // オブジェクト渡せるよ〜
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
    res.send('Hello Guest!');
});


// 3000番のポートで待ち受け！
app.listen(3000);
console.log('server starting...');