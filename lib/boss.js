/**
 * Boss
 * canvas 画布
 */
function Boss(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.init();
}

Boss.config = {}
Boss.type = [
    { 
        WIDTH: 48,     // 宽600
        HEIGHT: 29,     // 高12像素
        POS: [410, 735, 10, 190],      // boss的活动范围
        IMG: {x: 180, y: 3},    // Boss在图上的位置
        SPEED: 1.5,
        MOUSEHEIGHT: {x: 0, y: 17},
        HP: 1, // boss的血量
        FLY_TIME: 30
    },
    {
        WIDTH: 48,     // 宽600
        HEIGHT: 39,     // 高12像素
        POS: [410, 735, 10, 190],      // boss的活动范围
        IMG: {x: 134, y: 3},    // Boss在图上的位置
        SPEED: 1.5,
        MOUSEHEIGHT: {x: 0, y: 17},
        HP: 1, // boss的血量
        FLY_TIME: 30
    }
]

Boss.prototype = {
    // 在canvas上绘制Boss
    draw: function() {
        this.ctx.drawImage(gameImage,
            Boss.config.IMG.x, Boss.config.IMG.y, Boss.config.WIDTH, Boss.config.HEIGHT,
            this.xPos, this.yPos, Boss.config.WIDTH, Boss.config.HEIGHT
        );
        this.ctx.font = "13px Verdana";
        this.ctx.fillText('HP: ' + this.hp, this.xPos, this.yPos - 10);
        
    },
    // 初始化boss
    init: function() {
        this.type = 0;
        Boss.config = Boss.type[0]
        this.timer = 0;
        this.hp = Boss.config.HP;
        // 在y轴上的位置
        this.yPos = randomNumBoth(Boss.config.POS[2], Boss.config.POS[3]);
        // 在x轴上的位置
        this.xPos = randomNumBoth(Boss.config.POS[0], Boss.config.POS[1]);
        this.box = new AABB(this.xPos, this.yPos, Boss.config.WIDTH, Boss.config.HEIGHT, this.type);
        this.nextPos(); // 下一个位置
        this.draw();
    },
    update: function(time, trex) {
        if(this.hp <= 0) {
            this.ctx.fillText('嘻嘻！ ˇ＾ˇ)', this.xPos, this.yPos - 25);
            trex.ctx.fillText('what！ O_o', trex.xPos, trex.yPos - 25);
            trex.ctx.fillText('|||', trex.xPos, trex.yPos + 10);
        }
        this.timer = time;
        if(isOdd(Math.floor(this.timer / Boss.config.FLY_TIME))) {
            Boss.config = Boss.type[0]
        }else {
            Boss.config = Boss.type[1]
        }
        this.yPos += this.yIncrement;
        this.xPos += this.xIncrement;
        this.yPos = Math.ceil(this.yPos * 10) / 10;
        this.xPos = Math.ceil(this.xPos * 10) / 10;
        this.box.setXY(this.xPos, this.yPos);
        if(absolute(this.nextXPos - this.xPos) < 1 || absolute(this.nextYPos - this.yPos) < 1) {
            this.nextPos();
        }
        this.draw();
    },
    nextPos: function() {
        // 在boss的活动范围内随机生成下一个位置
        this.nextXPos = randomNumBoth(Boss.config.POS[0], Boss.config.POS[1]);
        this.nextYPos = randomNumBoth(Boss.config.POS[2], Boss.config.POS[3]);
        var t = getS({x: this.nextXPos, y: this.nextYPos}, {x: this.xPos, y:this.yPos}) / Boss.config.SPEED;
        // 每 t 内 xPos 和 yPos 的增量
        this.xIncrement = Math.ceil((this.nextXPos - this.xPos) / t * 10) / 10;
        this.yIncrement = Math.ceil((this.nextYPos - this.yPos) / t * 10) / 10;
        this.shoot();
    },
    shoot: function() {
        Bullet.creat(this.canvas, {x: Boss.config.MOUSEHEIGHT.x + this.xPos, y: Boss.config.MOUSEHEIGHT.y + this.yPos}, -1, 0);
    }
}