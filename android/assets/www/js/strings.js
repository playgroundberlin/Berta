///////////////////////////////////////////////////////////////////////////////

    var latitude, longitude, degreesOfDiff, accuracy, heading, currentHeading, destinationBearing, currentPosition, destinationPosition, currentDist, currentDir, bearing, result, artist, title, soundLat, soundLon;
    var next = 0; // first soundpoint
    var distLimit = 5; // limit to play sounds
    var locationDelay = 10000; // wait until playback (default: 20000)
    var UDPSendDelay = 500;
    latitude, longitude = 0;
    var minPositionAccuracy = 30;

///////////////////////////////////////////////////////////////////////////////

	ISPLAYING = new Boolean(false);
	ONLOCATION = new Boolean(false);
	GOODBYE = new Boolean(false);
	TRIPOVER = new Boolean(false);
	var my_media = null;
	var mediaTimer = null;

////////////////////////////////// GPS ARRAY //////////////////////////////////

    var coords = [];
    var sortedCoords = [];
    var route = [];

    // push locations to array "route", start with the first / last ??
    function fillRoute(xVal, yVal, soundFile, artist, title, comment) {
        route.push({ i: coords.length, x: xVal, y: yVal, s: soundFile, a: artist, t: title, c: comment, f: "unplayed" });
    }

///////////////////////////////////////////////////////////////////////////////

	function fillStrings() {
		log("Updating strings.");
			//Am Ort (Song)
		on_location = new Array();
		on_location[0] = "Vorhang auf für " + artist + " mit " + title;
		on_location[1] = "Tadaaaaa! " + artist + " mit " + title;
		on_location[2] = "Ohren jespitzt für " + artist + " mit " + title;
		on_location[3] = "Woooow, das klingt wie " + artist + " mit " + title;
		on_location[4] = artist + " mit " + title +", da brauch ich wohl nicht mehr zu sagen. ";
	}

	//Kein GPS
	var no_gps = "Ich habe die Orientierung verloren. Bitte bringt mich ans Tageslicht und habt etwas Geduld mit mir.";

	//Auf dem Weg
	var on_the_go = "Schritte";

	//Vor dem Song
	var before_location = "Wir sind da. Macht es euch bequem.";

	//Am Ort (Geschichte)
	var on_location = artist + " verrät euch, was diesen Ort so besonders macht.";


	//Nach dem Song
	after_location = new Array();
	after_location[0] = "Und, weiter geht's!";
	after_location[1] = "Wollt ihr Wurzeln schlagen oder was?";
	after_location[2] = "Einen hab ich noch.";
	after_location[3] = "Schon müde?";
	after_location[4] = "Hopp hopp!";

	//Ende der Tour
	var goodybye = "Es war echt schön mit euch. Bitte bringt mich zurück nach Hause.";
