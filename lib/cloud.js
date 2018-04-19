/**
 * 云朵
 * canvas 画布
 */
function Cloud(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.init();
}

Cloud.config = {
    WIDTH: 46,           // 云朵的宽度
    HEIGHT: 14,          // 云朵的高度
    IMG: {x: 88, y: 3},  // 云朵在图中的位置
    MAX_BASE_HEIGHT: 30, // 云朵离地面的最大高度
    MIN_BASE_HEIGHT: 71, // 云朵离地面的最小高度
    MAX_GAP: 300,        // 云朵之间的最大间隔
    MIN_GAP: 100,        // 云朵之间的最小间隔
}
// 用于存储云朵
Cloud.clouds = [];

Cloud.prototype = {
    // 在canvas上绘制云朵
    draw: function() {
        this.ctx.drawImage(gameImage,
            Cloud.config.IMG.x, Cloud.config.IMG.y, Cloud.config.WIDTH, Cloud.config.HEIGHT,
            this.xPos, this.yPos, Cloud.config.WIDTH, Cloud.config.HEIGHT
        )
    },
    // 实例化云朵时的初始参数
    init: function() {
        this.xPos = 800 + Cloud.config.WIDTH;
        this.yPos = randomNumBoth(Cloud.config.MAX_BASE_HEIGHT, Cloud.config.MIN_BASE_HEIGHT);
        this.cloudGap = randomNumBoth(Cloud.config.MIN_GAP,Cloud.config.MAX_GAP)
        this.spead = 1;
    },
    // 更新canvas上云朵的位置
    update: function() {
        // 当没有云朵的时候，绘制一个云朵
        if(Cloud.clouds.length == 0) {
            return this.creat();
        }
        // 当云朵移出屏幕外的时候，删掉这个云朵
        if(Cloud.clouds[0].xPos < -Cloud.config.WIDTH) {
            Cloud.clouds.shift();
        }
        var len = Cloud.clouds.length;
        // 当最后一个云朵大于其云朵间距的时候，生成一个云朵
        if(800 - Cloud.clouds[len-1].xPos > Cloud.clouds[len-1].cloudGap) {
            this.creat();
        }
        // 循环这些云朵数组，绘制他们的云朵
        for(var i = 0; i < len; i ++) {
            Cloud.clouds[i].xPos = Cloud.clouds[i].xPos - Cloud.clouds[i].spead;
            Cloud.clouds[i].draw();
        }
    },
    // 存储云朵的数组中添加一个云朵
    creat: function() {
        Cloud.clouds.push(new Cloud(this.canvas));
    }
}
