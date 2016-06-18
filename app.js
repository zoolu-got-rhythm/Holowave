/**
 * Created by Slime on 14/06/2016.
 */



// module
// exports.holoWave = ...
// module.exports = iife
var holoWave = (function(){

    function Shape(x, y, i){
        this.x = x;
        this.y = y;
        this.height = 20;
        this.width = 1;
        this.i = i;
        this.toggle = true;
        this.speed = 10;
        this.myLoopReq;

        // this.init();
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
        console.log("interval id " + this.myLoopReq);
    }

    Shape.prototype.eraze = function(){
        window.clearInterval(this.myLoopReq);
        this.wipe();
    }

    Shape.prototype.wipe = function(){
        ctx.clearRect(this.x - 1, (this.y - this.i) - 1, this.x + 1, (this.y + this.i) + 1);
    }


    // encapsulate code from global namespace

    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    c.width = 80;
    c.height = 40;
    var parentContainer;
    var playing;

    var lines = [];

    // api
    return {
        // you can change the internals of the code after the api is released
        play: function () {
            // implementation

            if(lines.length === 6 && !playing) {
                playing = true;
                for (var i = 0; i < lines.length; i++) {
                    lines[i].init();
                }
            }

            // re-instantiate objects and initialize if previously stopped.
            if(lines.length === 0 && !playing){
                playing = true;
                for(var j = 0; j < 24; j += 4){
                    lines.push(new Shape(20 + j + j, 20, j));
                }

                for (var k = 0; k < lines.length; k++) {
                    lines[k].init();
                }
            }
        },

        pause: function () {
            // implementation
            console.log("destroy ran");
            if(lines.length > 0){
                playing = false;
                console.log("destroy ran");
                for(var j = 0; j < lines.length; j++){
                    console.log("killing");
                    lines[j].freeze();
                }
            }
            console.log(lines);
        },

        stop: function(){
            // implementation
            if(lines.length > 0){
                playing = false;
                while(lines.length > 0){
                    lines[lines.length - 1].eraze();
                    lines.pop();
                }
            }

        },

        // dynamically alter and override default speed of animation
        speed: function(ms){
            // loop through lines and adjust interval speed.
        },

        // attach holo wave too document
        attach: function(parent, color, size){
            if(!parent) throw "must provide parent element in DOM as argument";
            parentContainer = parent;
            parentContainer.appendChild(c);

            for(var i = 0; i < 24; i += 4){
                lines.push(new Shape(20 + i + i, 20, i));
            }
            console.log(lines.length);
        },

        // remove holo wave from document and reclaim memory
        destroy: function(){
            // force user to stop the animation before destroying.
            if(!(lines.length === 0)) throw "must stop holoWave first";

            if(parentContainer)
                parentContainer.removeChild(c);

        }
    }
}());





// demo code.

// var holoWave = require("holoWave");

holoWave.attach(document.body);
// holoWave.play();

function buttonHelper(name, fn){
    var btn = document.createElement("button");
    btn.innerHTML = name;
    btn.addEventListener("click", fn);
    document.body.appendChild(btn);
}

buttonHelper("play", holoWave.play);
buttonHelper("pause", holoWave.pause);
buttonHelper("stop", holoWave.stop);




