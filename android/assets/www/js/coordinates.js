var TESTMODE = new Boolean();
var sdpath ="/storage/extSdCard" // Samsung Galaxy
//var sdpath ="/mnt/sdcard" // Vodafone
//var sdpath ="/mnt/sdcard2" // Scholl Tablet


TESTMODE = true;
// places in format (lat, lon, path to mp3, artist, title, comment)

function initRoute(option) {
	if (option == "NORMAL") {
		route.length = 0; // Clear array
		fillRoute(52.554646, 13.398342, sdpath+'/berta/jeansteam.mp3', 'Jeans Team', 'Lolita Dröhn', '');
		fillRoute(52.545226, 13.412311, sdpath+'/berta/nylon.mp3', 'Nylon', 'Schönhauser Allee', '');
		fillRoute(52.53887, 13.424338, sdpath+'/berta/dra-q.mp3', 'Dra-Q', 'Mitsommernacht', '');
		fillRoute(52.539779, 13.435933, sdpath+'/berta/berlinskibeat.mp3', 'Berlinskibeat', 'Nacht in Berlin', '');
		fillRoute(52.52207, 13.412805, sdpath+'/berta/tresen.mp3', 'Der Singende Tresen', 'Alexanderplatz', '');

		fillRoute(52.508653, 13.450873, sdpath+'/berta/koletzki.mp3', 'Oliver Koletzki feat. Fran', 'Warschauer Strasse', '');
		fillRoute(52.50723, 13.455905, sdpath+'/berta/panda.mp3', 'Panda', 'Hier bleiben', '');

		fillRoute(52.511559, 13.426843, sdpath+'/berta/bonaparte.mp3', 'Bonaparte', 'Gigolo Vagabundo', '');
		fillRoute(52.510939, 13.425015, sdpath+'/berta/doering.mp3', 'Dirty Doering', 'Bye Bye Bar 25', '');

		fillRoute(52.508392, 13.428921, sdpath+'/berta/rummelsnuff.mp3', 'Rummelsnuff', 'Winterlied', '');

		fillRoute(52.498271, 13.4244, sdpath+'/berta/simonnejones.mp3', 'Simonne Jones', 'We Are Young', '');
		fillRoute(52.4955, 13.420143, sdpath+'/berta/yukazu.mp3', 'Yukazu', 'Rote Äpfel', '');
		fillRoute(52.47942169, 13.43147278, sdpath+'/berta/pauline-andres.mp3', 'Pauline Andrès', 'Fuck you french girl', '');
		findNext();
	}

	if (option == "TESTMODE") {
		route.length = 0; // Clear array
		fillRoute(52.528741,13.420726, sdpath+'/berta/test1.mp3', 'Dra-Q', 'Mitsommernacht', '');
		fillRoute(52.528493,13.417121, sdpath+'/berta/test2.mp3', 'Der Singende Tresen', 'Alexanderplatz', '');
		fillRoute(52.528128,13.422979, sdpath+'/berta/test3.mp3', 'Jeans Team', 'Lolita Dröhn', '');
		findNext();
	}
}


/*		MÄRCHENBRUNNEN TESTROUTE
		fillRoute(52.528141,13.432889, sdpath+'/berta/koletzki.mp3', 'Oliver Koletzki feat. Fran', 'Warschauer Strasse', '');
		fillRoute(52.528141,13.432889, sdpath+'/berta/nylon.mp3', 'Nylon', 'Schönhauser Allee', '');
		fillRoute(52.527279,13.434026, sdpath+'/berta/dra-q.mp3', 'Dra-Q', 'Mitsommernacht', '');
		fillRoute(52.52617,13.435421,  sdpath+'/berta/berlinskibeat.mp3', 'Berlinskibeat', 'Nacht in Berlin', '');
		fillRoute(52.527958,13.435721, sdpath+'/berta/tresen.mp3', 'Der Singende Tresen', 'Alexanderplatz', '');
		fillRoute(52.527867,13.438039, sdpath+'/berta/doering.mp3', 'Dirty Doering', 'Bye Bye Bar 25', '');
		fillRoute(52.527932,13.426409, sdpath+'/berta/jeansteam.mp3', 'Jeans Team', 'Lolita Dröhn', '');
*/
