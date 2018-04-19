/**
 * 子弹的画布
 * canvas 画布
 */
function Bullet(canvas, initPos, dir, type) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.b_xPos = initPos.x;
    this.b_yPos = initPos.y;
    this.dir = dir;
    this.type = type;
    this.config = Bullet.types[this.type];
    this.box = new AABB(this.b_xPos, this.b_yPos, this.config.WIDTH, this.config.HEIGHT, this.type);
}

Bullet.config = {};

Bullet.types = [
    {
        WIDTH: 10,
        HEIGHT: 4,
        IMG: {x: 5, y: 5},
        SPEED: 5 
    },
    {
        WIDTH: 4,
        HEIGHT: 4,
        IMG: {x: 65, y: 7},
        SPEED: 5
    }
]

Bullet.bullets = [];
Bullet.prototype = {
    // 在canvas上绘制子弹
    draw: function() {
        this.ctx.drawImage(gameImage,
            this.config.IMG.x, this.config.IMG.y,this.config.WIDTH, this.config.HEIGHT,
            this.b_xPos, this.b_yPos, this.config.WIDTH, this.config.HEIGHT
        )
    },
    move: function() {
        this.b_xPos += this.config.SPEED * this.dir;
    }
}
Bullet.creat = function(canvas, bPos, dir, type) {
    Bullet.bullets.push(new Bullet(canvas, bPos, dir, type)); 
}
Bullet.update = function(trex, boss) {
    var len = Bullet.bullets.length;
    if(len == 0) {
        return;
    }
    if(Bullet.bullets[0].b_xPos > 800){
        Bullet.bullets.shift();
    }
    for(var i = 0; i < Bullet.bullets.length; i ++) {
        Bullet.bullets[i].move();
        Bullet.bullets[i].box.setXY(Bullet.bullets[i].b_xPos, Bullet.bullets[i].b_yPos);
        Bullet.bullets[i].draw();
        if(Bullet.bullets[i] && boxCompare(trex.box, Bullet.bullets[i].box)) {
            trex.hp -= 1;
            Bullet.bullets.splice(i, 1);
        }
        if(Bullet.bullets[i] && boxCompare(boss.box, Bullet.bullets[i].box)) {
            boss.hp -= 1;
            Bullet.bullets.splice(i, 1);
        }
    }
}