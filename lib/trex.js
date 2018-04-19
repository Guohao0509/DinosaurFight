/**
 * 恐龙
 * canvas 画布
 */
function Trex(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.init();
}

Trex.config = {
    JUMP_INITV: -18,     // 起跳初速度
    G: 1,                // 重力加速度
    BOTTOM_YPOS: 193,    // 恐龙与地面的接触位置
    SPEED: 4,             // 移动速度
    HP: 10,  // 恐龙的血量
    RUN_TIME: 4
}

Trex.type = {
    CRASHED: {
        NAME: 'CRASHED', // 死亡
        WIDTH: 44,        // 死亡时的宽度
        HEIGHT: 47,      // 死亡时的高度
        IMG: {x: 1068, y: 3}, // 死亡状态在图中的位置
    },
    STATICING: {
        NAME: 'STATICING', // 静止
        WIDTH: 44,        // 静止时的宽度
        HEIGHT: 47,      // 静止时的高度
        MOUSEHEIGHT: 40, // 嘴的高度 子弹发射口的高度
        IMG1: {x: 848, y: 3}, // 静止1状态在图中的位置
        IMG2: {x: 892, y: 3}, // 静止2状态在图中的位置
        IMG_TIMING: 3000, // 静止时 图片切换时间 用于眨眼
        BLINK_TIMING: 100, // 眨眼瞬间的时间
        MOUSEHEIGHT: {x: 20, y: 12},
        IMG: {x: 848, y: 3}
    },
    RUNNING: {
        NAME: 'RUNNING',   // 前进
        WIDTH: 44,        // 前进时的宽度
        HEIGHT: 47,      // 前进时的高度
        MOUSEHEIGHT: 40, // 嘴的高度 子弹发射口的高度
        IMG1: {x: 980, y: 3},  // 前进状态在图中的位置
        IMG2: {x: 936, y: 3}, // 前进状态在图中的位置
        IMG_TIMING: 100,        // 奔跑时图片切换的时间
        MOUSEHEIGHT: {x: 20, y: 12},
        IMG: {x: 980, y: 3},
    },
    DUCKING: {
        NAME: 'DUCKING', // 闪避
        WIDTH: 59,        // 闪避时的宽度
        HEIGHT: 47,      // 闪避时的高度
        MOUSEHEIGHT: 40,  // 嘴的高度 子弹发射口的高度
        IMG1: {x: 1111, y: 3},  // 前进状态在图中的位置
        IMG2: {x: 1170, y: 3}, // 前进状态在图中的位置
        IMG_TIMING: 100,
        MOUSEHEIGHT: {x: 45, y: 30},
        IMG: {x: 1111, y: 3}
    },
    // SHOOTING: {
    //     NAME: 'SHOOTING',// 发射
    //     WIDTH: 44,        // 发射时的宽度
    //     HEIGHT: 47,      // 发射时的高度
    //     MOUSEHEIGHT: 40  // 嘴的高度 子弹发射口的高度
    // }
}

Trex.prototype = {
    draw: function() {
        this.ctx.drawImage(gameImage,
            this.config.IMG.x, this.config.IMG.y, this.config.WIDTH, this.config.HEIGHT,
            this.xPos, this.yPos, this.config.WIDTH, this.config.HEIGHT
        )
        this.ctx.font = "13px Verdana";
        this.ctx.fillText('HP: ' + this.hp, this.xPos, this.yPos - 10);
    },
    init: function() {
        this.type = 1;
        this.timer = 0; // 记录各种动画切换的计时器
        this.hp = Trex.config.HP;
        this.xPos = 100;
        this.yPos = Trex.config.BOTTOM_YPOS;
        this.config = Trex.type.STATICING;
        this.box = new AABB(this.xPos, this.yPos, this.config.WIDTH, this.config.HEIGHT, this.type);
        this.jumpV = Trex.config.JUMP_INITV;
        this.isJumping = false;
        this.timer = 0;
        // debug 这里缺少动画
        this.stateMap = {
            JUMPING: 'STATICING',
            WAITING: 'STATICING',
            GOING: 'STATICING',
            BACKING: 'STATICING',
            DUCKING: 'STATICING'
        }
        // 控制前进后退的行为栈，WATING为默认行为，永远执行栈顶的行为；
        this.actionState = ['WATING'];
        // 闪避射击跳跃的功能行为栈，
        this.funcState = [];
        this.draw();
    },
    update: function(time) {
        if(this.hp <= 0) {
            gameState = 'OVER';
        }
        this.timer = time;
        // 为actionState栈顶的行为
        var tmpActionState = this.actionState[this.actionState.length - 1];
        // 为funcState栈顶的行为
        var tmpFuncState = this.funcState[this.funcState.length - 1];
        this.actionFsm(tmpActionState);
        this.funcFsm(tmpFuncState);
        if(tmpFuncState != 'JUMPING' && (tmpActionState == 'GOING' || tmpActionState == 'BACKING')) {
            if(isOdd(Math.floor(this.timer / Trex.config.RUN_TIME))) {
                Trex.type.RUNNING.IMG = Trex.type.RUNNING.IMG1;
                this.config =  Trex.type.RUNNING;
            }else {
                Trex.type.RUNNING.IMG = Trex.type.RUNNING.IMG2;
                this.config =  Trex.type.RUNNING;
            }
        }else {
            this.config =  Trex.type.STATICING;
        }
        this.box.setXY(this.xPos, this.yPos)
        this.draw();
    },
    // 将行为push到栈顶，并执行
    setState: function(stateType, state) {
        this.config = Trex.type[this.stateMap[state]];
        this[stateType].push(state);
    },
    // 当按键弹起时，将起对应的行为删掉
    delState: function(name, state) {
        // 同事删除其栈中的行为
        for(var i = 0, len = this[name].length; i < len; i ++) {
            if(state == this[name][i]) {
                this[name].splice(i, 1);
            }
        }
        // console.log(this.funcState);
    },
    // 行为状态机
    actionFsm: function(actionState) {
        switch(actionState) {
            case 'GOING':
                this.go();
                break;
            case 'BACKING':
                this.back();
                break;
            case 'WAITING':
                this.wait();
                break;
        }
    },
    // 功能状态机
    funcFsm: function(funcState) {
        switch(funcState) {
            case 'JUMPING':
                this.jump();
                break;
            case 'DUCKING':
                this.duck();
                break;
        }
    },
    wait: function() {
        // console.log('waitting');
    },
    crash: function() {
        
    },
    go: function() {
        this.xPos += Trex.config.SPEED;
    },
    back: function() {
        this.xPos -= Trex.config.SPEED;
    },
    jump: function() {
        this.isJumping = true;
        if(this.isJumping) {
            this.jumpV += Trex.config.G;
            this.yPos += this.jumpV;
        }
        if(this.yPos >= Trex.config.BOTTOM_YPOS) {
            this.yPos = Trex.config.BOTTOM_YPOS;
            this.jumpV = Trex.config.JUMP_INITV;
            this.isJumping = false;
            this[67] = true;
            this.delState('funcState', 'JUMPING');
        }
        
    },
    shoot: function() {
        Bullet.creat(this.canvas, {x: this.config.MOUSEHEIGHT.x + this.xPos, y: this.config.MOUSEHEIGHT.y + this.yPos}, 1, 1);
    },
    duck: function() {
        // console.log('duckting');
    }
    
}