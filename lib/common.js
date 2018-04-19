// 大约16ms 两帧间隔时间
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback, element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

// 指定范围的随机整数
function randomNumBoth(min,max){
    var range = max - min;
    var rand = Math.random();
    var num = min + Math.round(rand * range); //四舍五入
    return num;
}

// 取绝对值
function absolute(x) {
    return x >= 0 ? x : -x;
}

// 获取两点之间的距离
function getS(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) +  Math.pow(pos1.y - pos2.y, 2));
}

// 判断是否为偶数
function isOdd(num) {
    if((num % 2) == 1){
        return false;
    }
    return true;
}