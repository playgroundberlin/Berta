document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
}

function playAudio(src) {
    if(ISPLAYING == false) {
    my_media = new Media(src, onSuccess, onError);
    my_media.play();
    ISPLAYING = true;
    console.log("Playing: " +src);
    route[next].f = "playing"; // set flag
    }
}

var mediaTimer = setInterval(function() {
    if(ISPLAYING == true) {
        my_media.getCurrentPosition(
        function(position) {
        if (position == -0.001) {
            log("Song played. Continuing with next location.");
            ONLOCATION = false; // Set ONLOCATION to false
            stopAudio(); // Stopping playback and resetting box
            }
        },
        function(e) {
            console.log("Error getting pos=" + e);   
        }
    );
}}, 1000);


function pauseAudio() {
    if (my_media) {
        my_media.pause();
    }
}

function stopAudio() {
    if (ISPLAYING == true) {
    my_media.stop();
    clearInterval(mediaTimer);
    mediaTimer = null;
    ISPLAYING = false;
    console.log("Stopping playback.")
    route[next].f = "played";
        if (GOODBYE == false) {
            document.getElementById("textdiv").innerHTML = after_location[Math.floor((Math.random()*after_location.length))];
            setTimeout(function() {
                findNext();
                currentDist = parseInt(calculateDistance(latitude, longitude, soundLat, soundLon)); // update distance before phone moves
                updateDisplay();
                $('#meters').show();
                $('#pointer').show();
                }, locationDelay);       
            
        } else {
            ISPLAYING = true;
            TRIPOVER = true;
            document.getElementById("textdiv").innerHTML = goodybye;
            $('#meters').hide();
            $('#pointer').hide();
            console.log("Trip is over!");
        }
    }
}

function onSuccess() {
}

function onError(error) {
}