/**
 * 分割线的仙人掌 
 * canvas 画布
 */
function Cacti(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.init();
}

Cacti.config = {
    SPLIT_POS: 400,            // 分割线，总宽的一半
    TYPES_RATIO: 0.5           // 分割线的系数
}

Cacti.types = [
    {
        WIDTH: 50,             // 宽12
        HEIGHT: 35,            // 高35像素
        XPOS: 400,             // 在x轴的位置
        YPOS: 205,             // 在Y轴的位置
        IMG: {x: 228, y: 3},   // 在图上的位置
    },
    {
        WIDTH: 50,             // 宽12
        HEIGHT: 50,            // 高35像素
        XPOS: 400,             // 在x轴的位置
        YPOS: 190,             // 在Y轴的位置
        IMG: {x: 430, y: 3},   // 地面在图上的位置
    }
]

Cacti.prototype = {
    // 在canvas上绘制仙人掌
    draw: function() {
        this.ctx.drawImage(gameImage,
            Cacti.config.CACTI_TYPE.IMG.x, Cacti.config.CACTI_TYPE.IMG.y, Cacti.config.CACTI_TYPE.WIDTH, Cacti.config.CACTI_TYPE.HEIGHT,
            Cacti.config.CACTI_TYPE.XPOS - (Cacti.config.CACTI_TYPE.WIDTH / 2), Cacti.config.CACTI_TYPE.YPOS, Cacti.config.CACTI_TYPE.WIDTH, Cacti.config.CACTI_TYPE.HEIGHT
        )
    },
    // 获得随机类型的仙人掌
    init: function() {
        Cacti.config.CACTI_TYPE = Math.random() > Cacti.config.TYPES_RATIO ? Cacti.types[0] : Cacti.types[1];
        this.draw();
    }
}