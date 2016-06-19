// demo code.

var holoWave = require("holowave.js");

holoWave.attach(document.body);

function buttonHelper(name, fn){
    var btn = document.createElement("button");
    btn.innerHTML = name;
    btn.addEventListener("click", fn);
    document.body.appendChild(btn);
}

buttonHelper("play", holoWave.play);
buttonHelper("pause", holoWave.pause);
buttonHelper("stop", holoWave.stop);