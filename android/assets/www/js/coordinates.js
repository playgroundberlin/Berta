var TESTMODE = true;

var sdpath = "/storage/extSdCard" // Samsung Galaxy
//var sdpath ="/mnt/sdcard" // Vodafone
//var sdpath ="/mnt/sdcard2" // Scholl Tablet

// places in format (lat, lon, path to mp3, artist, title, comment)

var tours = {
	"NORMAL": [
		[52.554646, 13.398342, '/berta/jeansteam.mp3', 'Jeans Team', 'Lolita Dröhn', ''],
		[52.545226, 13.412311, '/berta/nylon.mp3', 'Nylon', 'Schönhauser Allee', ''],
		[52.53887, 13.424338, '/berta/dra-q.mp3', 'Dra-Q', 'Mitsommernacht', ''],
		[52.539779, 13.435933, '/berta/berlinskibeat.mp3', 'Berlinskibeat', 'Nacht in Berlin', ''],
		[52.52207, 13.412805, '/berta/tresen.mp3', 'Der Singende Tresen', 'Alexanderplatz', ''],
		[52.508653, 13.450873, '/berta/koletzki.mp3', 'Oliver Koletzki feat. Fran', 'Warschauer Strasse', ''],
		[52.50723, 13.455905, '/berta/panda.mp3', 'Panda', 'Hier bleiben', ''],
		[52.511559, 13.426843, '/berta/bonaparte.mp3', 'Bonaparte', 'Gigolo Vagabundo', ''],
		[52.510939, 13.425015, '/berta/doering.mp3', 'Dirty Doering', 'Bye Bye Bar 25', ''],
		[52.508392, 13.428921, '/berta/rummelsnuff.mp3', 'Rummelsnuff', 'Winterlied', ''],
		[52.498271, 13.4244, '/berta/simonnejones.mp3', 'Simonne Jones', 'We Are Young', ''],
		[52.4955, 13.420143, '/berta/yukazu.mp3', 'Yukazu', 'Rote Äpfel', ''],
		[52.47942169, 13.43147278, '/berta/pauline-andres.mp3', 'Pauline Andrès', 'Fuck you french girl', '']
	],
	"TESTMODE": [
	  [52.485425,13.362518, '/berta/test1.mp3', 'Test', 'Schöneberg 1', ''],
		[52.486471,13.362272, '/berta/test2.mp3', 'Test', 'Schöneberg 2', ''],
		[52.486033,13.363581, '/berta/test3.mp3', 'Test', 'Schöneberg 3', '']
	],
	"MAERCHENBRUNNEN": [
		[52.528141,13.432889, '/berta/koletzki.mp3', 'Oliver Koletzki feat. Fran', 'Warschauer Strasse', ''],
		[52.528141,13.432889, '/berta/nylon.mp3', 'Nylon', 'Schönhauser Allee', ''],
		[52.527279,13.434026, '/berta/dra-q.mp3', 'Dra-Q', 'Mitsommernacht', ''],
		[52.52617,13.435421,  '/berta/berlinskibeat.mp3', 'Berlinskibeat', 'Nacht in Berlin', ''],
		[52.527958,13.435721, '/berta/tresen.mp3', 'Der Singende Tresen', 'Alexanderplatz', ''],
		[52.527867,13.438039, '/berta/doering.mp3', 'Dirty Doering', 'Bye Bye Bar 25', ''],
		[52.527932,13.426409, '/berta/jeansteam.mp3', 'Jeans Team', 'Lolita Dröhn', '']
	]
};

function initRoute(name) {
	var locations = tours[name];
	route.length = 0; // Clear array
	locations.forEach(function (loc) {
		fillRoute(loc[0], loc[1], sdpath + loc[2], loc[3], loc[4], loc[5]);
	});
	findNext();
}
