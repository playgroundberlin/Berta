// Storage base path

var SDPATH = '/storage/extSdCard/berta/'; // Samsung Galaxy
// var SDPATH = '/mnt/sdcard'; // Vodafone
// var SDPATH = '/mnt/sdcard2'; // Scholl Tablet

// Raspberry Pi config (hardware interface, comm. via UDP)

var HWIP = '192.168.42.10';
var HWPORT = 50000;

// Tour places (lat, lon, path to mp3, artist, title, comment)

var TOURS = {
  "default": [
    [52.55464600, 13.39834200, SDPATH + 'jeansteam.mp3',      'Jeans Team',                 'Lolita Dröhn',         SDPATH + 'jeansteam.png'],
    [52.54522600, 13.41231100, SDPATH + 'nylon.mp3',          'Nylon',                      'Schönhauser Allee',    SDPATH + 'nylon.png'],
    [52.53887000, 13.42433800, SDPATH + 'dra-q.mp3',          'Dra-Q',                      'Mitsommernacht',       SDPATH + 'dra-q.png'],
    [52.53977900, 13.43593300, SDPATH + 'berlinskibeat.mp3',  'Berlinskibeat',              'Nacht in Berlin',      SDPATH + 'berlinskibeat.png'],
    [52.53667600, 13.43234100, SDPATH + 'tonikater.mp3',      'Toni Kater',                 'Fuchslied',            SDPATH + 'tonikater.png'],
    [52.52207000, 13.41280500, SDPATH + 'tresen.mp3',         'Der Singende Tresen',        'Alexanderplatz',       SDPATH + 'tresen.png'],
    [52.50865300, 13.45087300, SDPATH + 'koletzki.mp3',       'Oliver Koletzki feat. Fran', 'Warschauer Strasse',   SDPATH + 'koletzki.png'],
    [52.50723000, 13.45590500, SDPATH + 'panda.mp3',          'Panda',                      'Hier bleiben',         SDPATH + 'panda.png'],
    [52.51155900, 13.42684300, SDPATH + 'bonaparte.mp3',      'Bonaparte',                  'Gigolo Vagabundo',     SDPATH + 'bonaparte.png'],
    [52.51093900, 13.42501500, SDPATH + 'doering.mp3',        'Dirty Doering',              'Bye Bye Bar 25',       SDPATH + 'doering.png'],
    [52.50839200, 13.42892100, SDPATH + 'rummelsnuff.mp3',    'Rummelsnuff',                'Winterlied',           SDPATH + 'rummelsnuff.png'],
    [52.49927600, 13.42049700, SDPATH + 'pitchtuner.mp3',     'Pitchtuner',                 'Unity Wins',           SDPATH + 'pitchtuner.png'],
    [52.49827100, 13.42440000, SDPATH + 'simonnejones.mp3',   'Simonne Jones',              'We Are Young',         SDPATH + 'simonnejones.png'],
    [52.49550000, 13.42014300, SDPATH + 'yukazu.mp3',         'Yukazu',                     'Rote Äpfel',           SDPATH + 'yukazu.png'],
    [52.47942169, 13.43147278, SDPATH + 'pauline-andres.mp3', 'Pauline Andrès',             'Fuck you french girl', SDPATH + 'pauline-andres.png']
  ],
  "test": [
    [52.52809900, 13.42511600, SDPATH + 'test1.mp3',          'Test 1',                     'Schöneberg 1',         SDPATH + 'jeansteam.png'],
    [52.52781500, 13.42683800, SDPATH + 'test2.mp3',          'Test 2',                     'Schöneberg 2',         SDPATH + 'nylon.png'],
    [52.52710100, 13.42715000, SDPATH + 'test3.mp3',          'Test 3',                     'Schöneberg 3',         SDPATH + 'berlinskibeat.png']
  ]
};

// Berta sentences

var MESSAGES = {
  disoriented: 'Ich habe die Orientierung verloren. Bitte bringt mich ans Tageslicht und habt etwas Geduld mit mir.',
  distance: 'Noch {{distance}} mal in die Pedale treten',
  announcement: 'Wir sind da. Macht es euch bequem.',
  voila: [
    '',
    '',
    '',
    '',
    ''
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
