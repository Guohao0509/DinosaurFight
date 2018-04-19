/**
 * 地板
 * canvas 画布
 */
function Floor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.init();
}

Floor.config = {
    WIDTH: 800,     // 宽600
    HEIGHT: 12,     // 高12像素
    YPOS: 227,      // 在Y轴的位置
    IMG: {y: 54}    // 地面在图上的位置
}

Floor.prototype = {
    // 在canvas上绘制地板
    draw: function() {
        this.ctx.drawImage(gameImage,
            Floor.config.IMG.x, Floor.config.IMG.y, Floor.config.WIDTH, Floor.config.HEIGHT,
            0, Floor.config.YPOS, Floor.config.WIDTH, Floor.config.HEIGHT
        )
    },
    init: function() {
        Floor.config.IMG.x = randomNumBoth(2, 402);
        this.draw();
    }
}