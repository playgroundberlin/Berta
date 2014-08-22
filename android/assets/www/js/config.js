// Storage base path

var SDPATH = '/storage/extSdCard'; // Samsung Galaxy
// var SDPATH = '/mnt/sdcard'; // Vodafone
// var SDPATH = '/mnt/sdcard2'; // Scholl Tablet

// Raspberry Pi config (hardware interface, comm. via UDP)

var HWIP = '192.168.42.10';
var HWPORT = 50000;

// Tour places (lat, lon, path to mp3, artist, title, comment)

var TOURS = {
  "default": [
    [52.55464600, 13.39834200, SDPATH + '/berta/jeansteam.mp3',      'Jeans Team',                 'Lolita Dröhn',         SDPATH + 'jeansteam.png'],
    [52.54522600, 13.41231100, SDPATH + '/berta/nylon.mp3',          'Nylon',                      'Schönhauser Allee',    SDPATH + 'nylon.png'],
    [52.53887000, 13.42433800, SDPATH + '/berta/dra-q.mp3',          'Dra-Q',                      'Mitsommernacht',       SDPATH + 'dra-q.png'],
    [52.53977900, 13.43593300, SDPATH + '/berta/berlinskibeat.mp3',  'Berlinskibeat',              'Nacht in Berlin',      SDPATH + 'berlinskibeat.png'],
    [52.53667600, 13.43234100, SDPATH + '/berta/tonikater.mp3',      'Toni Kater',                 'Fuchslied',            SDPATH + 'tonikater.png'],
    [52.52207000, 13.41280500, SDPATH + '/berta/tresen.mp3',         'Der Singende Tresen',        'Alexanderplatz',       SDPATH + 'tresen.png'],
    [52.50865300, 13.45087300, SDPATH + '/berta/koletzki.mp3',       'Oliver Koletzki feat. Fran', 'Warschauer Strasse',   SDPATH + 'koletzki.png'],
    [52.50723000, 13.45590500, SDPATH + '/berta/panda.mp3',          'Panda',                      'Hier bleiben',         SDPATH + 'panda.png'],
    [52.51155900, 13.42684300, SDPATH + '/berta/bonaparte.mp3',      'Bonaparte',                  'Gigolo Vagabundo',     SDPATH + 'bonaparte.png'],
    [52.51093900, 13.42501500, SDPATH + '/berta/doering.mp3',        'Dirty Doering',              'Bye Bye Bar 25',       SDPATH + 'doering.png'],
    [52.50839200, 13.42892100, SDPATH + '/berta/rummelsnuff.mp3',    'Rummelsnuff',                'Winterlied',           SDPATH + 'rummelsnuff.png'],
    [52.49927600, 13.42049700, SDPATH + '/berta/pitchtuner.mp3',     'Pitchtuner',                 'Unity Wins',           SDPATH + 'pitchtuner.png'],
    [52.49827100, 13.42440000, SDPATH + '/berta/simonnejones.mp3',   'Simonne Jones',              'We Are Young',         SDPATH + 'simonnejones.png'],
    [52.49550000, 13.42014300, SDPATH + '/berta/yukazu.mp3',         'Yukazu',                     'Rote Äpfel',           SDPATH + 'yukazu.png'],
    [52.47942169, 13.43147278, SDPATH + '/berta/pauline-andres.mp3', 'Pauline Andrès',             'Fuck you french girl', SDPATH + 'pauline-andres.png']
  ],
  "test": [
    [52.52809900, 13.42511600, SDPATH + '/berta/test1.mp3',          'Test 1',                     'Schöneberg 1',         SDPATH + 'test-1.png'],
    [52.52781500, 13.42683800, SDPATH + '/berta/test2.mp3',          'Test 2',                     'Schöneberg 2',         SDPATH + 'test-2.png'],
    [52.52710100, 13.42715000, SDPATH + '/berta/test3.mp3',          'Test 3',                     'Schöneberg 3',         SDPATH + 'test-3.png']
  ]
};

// Berta sentences

var MESSAGES = {
  disoriented: 'Ich habe die Orientierung verloren. Bitte bringt mich ans Tageslicht und habt etwas Geduld mit mir.',
  distance: 'Noch {{distance}} mal in die Pedale treten',
  announcement: 'Wir sind da. Macht es euch bequem.',
  voila: [
    'Vorhang auf für {{artist}} mit {{title}}.',
    'Tadaaaaa! {{artist}} mit {{title}}.',
    'Ohren jespitzt für {{artist}} mit {{title}}.',
    'Woooow, das klingt wie {{artist}} mit {{title}}.',
    '{{artist}} mit {{title}}, da brauch ich wohl nicht mehr zu sagen.'
  ],
  proceed: [
    'Und, weiter geht\'s!',
    'Wollt ihr Wurzeln schlagen oder was?',
    'Einen hab ich noch.',
    'Schon müde?',
    'Hopp hopp!'
  ],
  goodbye: 'Es war echt schön mit euch. Bitte bringt mich zurück nach Hause.'
};
