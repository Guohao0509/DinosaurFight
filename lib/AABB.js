// AABB盒模型
function AABB(x, y, w, h, type) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.type = type;
}

AABB.prototype = {
    setXY: function(x, y) {
        this.x = x;
        this.y = y;
    }
}

// 碰撞检测
function boxCompare(AA, BB) {
    if(AA.type == BB.type) {
        return false;
    }
    var AAX = AA.x;
    var AAY = AA.y;
    var BBX = BB.x;
    var BBY = BB.y;
 
    return AAX < BBX + BB.width && AAX + AA.width > BBX && AAY < BBY + BB.height && AA.height + AAY > BBY;
}