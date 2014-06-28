function log(message) {
    document.getElementById("log").innerHTML = message;
}

function startWatch() {
    // Update compass every second (3000) for UDP communication
    var options = { frequency: 100 };
    headID = navigator.compass.watchHeading(headSuccess, onError, options);

  }

function headSuccess(heading) {

    currentHeading = heading.trueHeading >= 0 ? Math.round(heading.trueHeading) : Math.round(heading.magneticHeading);
    updateScreen();
    updateDisplay();

    var arrow = parseInt(soundDir) - parseInt(currentHeading);
    document.getElementById("compass").innerHTML = "Sound: " +soundDir +" Heading: " +(heading+90) +"= " +arrow;


}



// new
function updateScreen(){
    destinationBearing = Math.round(currentPosition.bearingTo(destinationPosition));
    //$('#distance').html(Math.round(currentPosition.distanceTo(destinationPosition)*1000) + " Meters");
    degreesOfDiff = destinationBearing - currentHeading; // The difference between destination bearing and current heading is the direction of the arrow.

    //console.log("Degree: " +degreesOfDiff);
    $('#pointer').css("-webkit-transform", "rotate(" + degreesOfDiff + "deg)");
}
//

function sendUDP() {
  if (degreesOfDiff != 0) {
    var value = Math.floor(scaleRange(degreesOfDiff, 0 , 360 , 100 , 80));
    if(ISPLAYING == false){
      MyCls.setServoValue(value);
      console.log("Send via UDP: " +value);
    }
  }
}


function setGeolocation() {

    // Start UDP communication
    setInterval(function() {
      sendUDP();
    }, UDPSendDelay);

    var geolocation = window.navigator.geolocation.watchPosition(

            function ( position ) {

                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                accuracy = position.coords.accuracy;

                // Implement accuracy check
                // if(accuracy > minPositionAccuracy) return;
                  

                // new
                currentPosition = new LatLon(position.coords.latitude, position.coords.longitude);
                updateScreen();
                //

                if(route[next].f == "unplayed" && ONLOCATION == false && TRIPOVER == false) { // Show infos when current song is unplayed and not on location
                    $('#meters').show();
                    $('#pointer').show();
                }

                // find next sound location when current sound is maked as played
                if(route[next].f == "played") {
                    findNext();
                    console.log("Sound played, left location.");
                }

                currentDist = parseInt(calculateDistance(latitude, longitude, soundLat, soundLon)); // calculate distance to sound location
				        console.log("Lat: " +latitude);
                console.log("Lon: " +longitude);
                console.log("soundLat: " +soundLat);
                console.log("soundLon: " +soundLon);

                soundDir = calcBearing(latitude, longitude, soundLat, soundLon); // calculate bearing
                updateDisplay();

                // check distance and play audio, set ONLOCATION flag
                if(currentDist < distLimit && ONLOCATION == false) {

                    $('#meters').hide(); // hide distance layer
                    $('#pointer').hide(); // hide arrow layer
                    document.getElementById("textdiv").innerHTML = before_location;
                    console.log("Reached location, asking to rest.");
                    ONLOCATION = true;

                    // Play audio
                    playAudio(route[next].s);
                    console.log("Start playing.");

                    // after a delay show title
                    setTimeout(function() {
                        var msg = on_location[Math.floor((Math.random()*on_location.length))];
                        document.getElementById("textdiv").innerHTML = msg;
                        log(msg);
                    }, locationDelay);

                }
            },

            function () { /*error*/ },
            {
                maximumAge: 0,
                timeout: 1000,
                enableHighAccuracy: true
            }
        );
    };

function prevPoint() {
  if(next > 0) {
    route[next-1].f = "unplayed";
    findNext();
  }
}

function nextPoint() {
  route[next].f = "played";
  findNext();
}

function findNext() {
    // write next unplayed source to var
    console.log("findNext");
    for (var i = 0; i < route.length; i++) {
        if(route[i].f == "unplayed") {
        soundLat = route[i].x;
        soundLon = route[i].y;

        // new
        destinationPosition = new LatLon(soundLat, soundLon);
        //

        artist = route[i].a;
        title = route[i].t;
        next = i;
        console.log("Next: " +next);
        document.getElementById("soundComment").innerHTML = route[i].c;
        fillStrings(); // update list of strings
        updateDisplay();
        if(i == route.length-1) {
            GOODBYE = true;
            console.log("Found last entry.");
        }
        break; // leave loop
        }
    }
}

function updateDisplay() {
                document.getElementById("currentLat").innerHTML = latitude;
                document.getElementById("currentLon").innerHTML = longitude;
                document.getElementById("currentAcc").innerHTML = accuracy;
                document.getElementById("currentHead").innerHTML = heading;
                document.getElementById("soundDistance").innerHTML = currentDist;
                document.getElementById("soundLat").innerHTML = route[next].x;
                document.getElementById("soundLon").innerHTML = route[next].y;
                document.getElementById("soundArtist").innerHTML = route[next].a;
                document.getElementById("soundTitle").innerHTML = route[next].t;
                document.getElementById("soundComment").innerHTML = route[next].c;
                if(ONLOCATION == false) {
                	document.getElementById("meters").innerHTML = currentDist;
                	document.getElementById("textdiv").innerHTML = "Schritte";
                }
}

function orderByDist(a, b) {
    return a.d - b.d;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = (lat2-lat1).toRad();
        var dLon = (lon2-lon1).toRad();
        console.log(lat1);
        console.log(lat2);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d * 1000;
}

function calcBearing(lat1, lon1, lat2, lon2) {
  lat1 = lat1.toRad();
  lat2 = lat2.toRad();
  var dLon = (lon2-lon1).toRad();

  var y = Math.sin(dLon) * Math.cos(lat2);
  var x = Math.cos(lat1)*Math.sin(lat2) -
          Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);

  return Math.floor(Math.atan2(y, x).toBrng());
}

Number.prototype.toRad = function() {  // convert degrees to radians
  return this * Math.PI / 180;
}

function toRad(Value) {
    return Value * Math.PI / 180;
}

Number.prototype.toDeg = function() {  // convert radians to degrees (signed)
  return this * 180 / Math.PI;
}

Number.prototype.toBrng = function() {  // convert radians to degrees (as bearing: 0...360)
  return (this.toDeg()+360) % 360;
}

function scaleRange(num, oldMin, oldMax, newMin, newMax) {
	return (num / ((oldMax - oldMin) / (newMax - newMin))) + newMin;
}
