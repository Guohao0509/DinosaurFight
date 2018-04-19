// 游戏的画布
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// 加载游戏使用到的图片
var gameImage = new Image();
gameImage.src = './lib/game.png';

var logo = new Image();
logo.src = './lib/logo.png';

var over = new Image();
over.src = './lib/over.png';

var kaishi = new Image();
kaishi.src = './lib/start.png';
