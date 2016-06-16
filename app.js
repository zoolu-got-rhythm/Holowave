/**
 * Created by Slime on 14/06/2016.
 */

var c = document.createElement("canvas");
var ctx = c.getContext("2d");
c.width = 80;
c.height = 40;
document.body.appendChild(c);

function Shape(x, y, i){
    this.x = x;
    this.y = y;
    this.height = 20;
    this.width = 1;
    this.i = i;
    this.toggle = true;
    this.myLoopReq;

    this.init();
}

Shape.prototype.move = function(n){
    this.x = n;
}

Shape.prototype.draw = function(){

    // console.log(this.toggle);

    this.fluctuate();

    ctx.strokeStyle = "#ecb3ff";

    // canvas api
    ctx.clearRect(this.x - 1, (this.y - this.i) - 1, this.x + 1, (this.y + this.i) + 1);
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.i);
    ctx.lineTo(this.x, this.y + this.i);
    ctx.stroke();
}

Shape.prototype.fluctuate = function(){

    //if(this.i > 10)this.i = 10;

    if(this.toggle){
        this.i++;
        if(this.i >= 10) this.toggle = false;
    } else{
        this.i--;
        if(this.i === 0) this.toggle = true;
    }
    return this.i;
}

Shape.prototype.wave = function(){
    var self = this;
    //window.setInterval(loop, 800);
    this.myLoopReq = window.requestAnimationFrame(loop);

    function loop(){
        // console.log("looping..");
        self.draw();
        window.requestAnimationFrame(loop);
    }
}

Shape.prototype.init = function(){
    console.log("ran");
    this.wave();
}

Shape.prototype.kill = function(){
    window.cancelAnimationFrame(this.myLoopReq);
}

var lines = [];
// var i = 0;

// makes 6 lines
for(var i = 0; i < 24; i += 4){
    lines.push(new Shape(20 + i + i, 20, i));
}




function destroy(){
    for(var j = 0; j < lines.length; j++){
        lines[j].kill();
    }
}






