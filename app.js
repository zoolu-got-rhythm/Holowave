/**
 * Created by Slime on 14/06/2016.
 */



// module
var holoWave = (function(){

    // encapsulate code from global namespace

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
        this.speed = 10;
        this.myLoopReq;

        this.init();
    }

    Shape.prototype.move = function(n){
        this.x = n;
    }

    Shape.prototype.draw = function(){
        this.fluctuate();

        ctx.strokeStyle = "#c61aff";
        this.wipe();

        // canvas api
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
        this.myLoopReq = window.setInterval(loop, this.speed);

        function loop(){
            self.draw();
        }
    }

    Shape.prototype.init = function(){
        console.log("ran");
        this.wave();
    }

    Shape.prototype.freeze = function(){
        window.clearInterval(this.myLoopReq);
        console.log(this.myLoopReq);
    }

    Shape.prototype.eraze = function(){
        window.clearInterval(this.myLoopReq);
        this.wipe();
    }

    Shape.prototype.wipe = function(){
        ctx.clearRect(this.x - 1, (this.y - this.i) - 1, this.x + 1, (this.y + this.i) + 1);
    }


    var lines = [];

    // api
    return {
        // you can change the internals of the code after the api is released
        play: function () {
            // implementation
            for(var i = 0; i < 24; i += 4){
                lines.push(new Shape(20 + i + i, 20, i));
            }
        },

        pause: function () {
            // implementation
            console.log("destroy ran");
            if(lines.length > 0){
                console.log("destroy ran");
                for(var j = 0; j < lines.length; j++){
                    console.log("killing");
                    lines[j].freeze();
                }
            }
        },

        stop: function(){
            // implementation
            if(lines.length > 0){
                while(lines.length > 0){
                    lines[lines.length - 1].eraze();
                    lines.pop();
                }
            }

        },

        // dynamically alter speed of animation, can be chainable.
        speed: function(ms){},

        // attach holo wave too document
        attach: function(dom, color, size){},

        // remove holo wave from document and reclaim memory
        destroy: function(){}
    }


}());


holoWave.play();






