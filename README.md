#Holowave api
a visual indicator which can be used to represent the processing of various actions!
E.G's: loading, audio playback, video playback, calls, voice input..

##API
    holoWave.attach(domParent);
    holoWave.play();
    holoWave.pause();
    holoWave.stop();
    holoWave.detach();

##Demo App
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

check the demo out: link