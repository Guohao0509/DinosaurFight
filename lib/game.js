var gameState = 'WAITING';

function start() {
    // 注册键盘事件，完成对角色的控制
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    var floor = new Floor(canvas);
    var cacti = new Cacti(canvas);
    var cloud = new Cloud(canvas);
    var trex = new Trex(canvas);
    var boss = new Boss(canvas);

    trex[37] = true;
    trex[67] = true;
    trex[39] = true;
    trex[40] = true;
    trex[88] = true;
    function onKeyDown(e) {
        switch(e.keyCode){
            case 37:
                if(trex[e.keyCode]) {
                    trex[e.keyCode] = false;
                    trex.setState('actionState', 'BACKING');
                }
                break;
            case 67:
                if(trex[e.keyCode]) {
                    trex[e.keyCode] = false;
                    trex.setState('funcState', 'JUMPING');
                }
                break;
            case 39:
                if(trex[e.keyCode]) {
                    trex[e.keyCode] = false;
                    trex.setState('actionState', 'GOING');
                }
                break;
            case 40:
                if(trex[e.keyCode]) {
                    trex[e.keyCode] = false;
                    trex.setState('funcState', 'DUCKING');
                }
                break;
            case 88:
                if(trex[e.keyCode]) {
                    trex[e.keyCode] = false;
                    trex.shoot();
                }
                break;
        }
    }

    function onKeyUp(e) {
        switch(e.keyCode){
            case 37:
                trex[e.keyCode] = true;
                trex.delState('actionState', 'BACKING');
                break;
            // case 38:
            //     trex[e.keyCode] = true;
            //     trex.delState('funcState', 'JUMPING');
            //     break;
            case 39:
                trex[e.keyCode] = true;
                trex.delState('actionState', 'GOING');
                break;
            case 40:
                trex[e.keyCode] = true;
                trex.delState('funcState', 'DUCKING');
                break;
            case 88:
                trex[e.keyCode] = true;
                break;
        }
    }

    var timer = 0;
    (function draw(time) {
        timer ++;
        // time 大约16ms 两帧间隔时间
        ctx.clearRect(0,0,800,250);
        
        // h.update(time - startTime,3);
        // startTime = time;
        // 绘制完成后不会改变的图像 用draw方法
        floor.draw();
        cacti.draw();
        // 绘制完成后会改变的图像 用update方法
        cloud.update();
        trex.update(timer);
        boss.update(timer, trex);
        Bullet.update(trex, boss);
        if(gameState == 'OVER') {
            return this.ctx.drawImage(over, 0, 0, 500, 98, 160, 70, 500, 98);
        }
        window.requestAnimFrame(draw);
    })();
}
function GameStart(e) {
    if(gameState == 'WAITING' &&　e.keyCode == 13) {
        gameState = 'RUNNING';
        start();
    }
}

document.addEventListener('keydown', GameStart);