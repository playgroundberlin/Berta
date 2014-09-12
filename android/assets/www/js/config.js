// Storage base path

var SDPATH = '/storage/extSdCard/berta/'; // Samsung Galaxy
// var SDPATH = '/mnt/sdcard'; // Vodafone
// var SDPATH = '/mnt/sdcard2'; // Scholl Tablet

// Raspberry Pi config (hardware interface, comm. via UDP)

var HWIP = '192.168.42.10';
var HWPORT = 50000;

// Tour places (lat, lon, path to mp3, artist, title, comment)

var TOURS = {
  "tour1": [
    [52.541898, 13.403592, SDPATH + 'jeansteam.mp3',      'Jeans Team',                 'Lolita Dröhn',         SDPATH + 'jeansteam.png'],
    [52.545226, 13.412311, SDPATH + 'nylon.mp3',          'Nylon',                      'Schönhauser Allee',    SDPATH + 'nylon.png'],
    [52.538870, 13.424338, SDPATH + 'dra-q.mp3',          'Dra-Q',                      'Mitsommernacht',       SDPATH + 'dra-q.png'],
    [52.539575, 13.436428, SDPATH + 'berlinskibeat.mp3',  'Berlinskibeat',              'Nacht in Berlin',      SDPATH + 'berlinskibeat.png'],
    [52.536676, 13.432341, SDPATH + 'tonikater.mp3',      'Toni Kater',                 'Fuchslied',            SDPATH + 'tonikater.png'],
    [52.521166, 13.413264, SDPATH + 'tresen.mp3',         'Der Singende Tresen',        'Alexanderplatz',       SDPATH + 'tresen.png'],
    [52.511632, 13.426854, SDPATH + 'doering.mp3',        'Dirty Doering',              'Bye Bye Bar 25',       SDPATH + 'doering.png'],
    [52.508653, 13.450873, SDPATH + 'koletzki.mp3',       'Oliver Koletzki feat. Fran', 'Warschauer Strasse',   SDPATH + 'koletzki.png'],
    [52.507230, 13.455905, SDPATH + 'panda.mp3',          'Panda',                      'Hier bleiben',         SDPATH + 'panda.png'],
],
"tour2": [
    [52.50839200, 13.42892100, SDPATH + 'rummelsnuff.mp3',    'Rummelsnuff',                'Winterlied',           SDPATH + 'rummelsnuff.png'],
    [52.49927600, 13.42049700, SDPATH + 'pitchtuner.mp3',     'Pitchtuner',                 'Unity Wins',           SDPATH + 'pitchtuner.png'],
    [52.49827100, 13.42440000, SDPATH + 'simonnejones.mp3',   'Simonne Jones',              'We Are Young',         SDPATH + 'simonnejones.png'],
    [52.49550000, 13.42014300, SDPATH + 'yukazu.mp3',         'Yukazu',                     'Rote Äpfel',           SDPATH + 'yukazu.png'],
    [52.47942169, 13.43147278, SDPATH + 'pauline-andres.mp3', 'Pauline Andrès',             'Fuck you french girl', SDPATH + 'pauline-andres.png']
  ],
  "sberg-test": [
    [52.483512, 13.363395, SDPATH + 'test1.mp3',          'Test 1',                     'Schöneberg 1',         SDPATH + 'jeansteam.png'],
    [52.483538, 13.361378, SDPATH + 'test2.mp3',          'Test 2',                     'Schöneberg 2',         SDPATH + 'nylon.png'],
    [52.485969, 13.361206, SDPATH + 'test3.mp3',          'Test 3',                     'Schöneberg 3',         SDPATH + 'berlinskibeat.png']
  ],
  "pberg-test": [
    [52.52809900, 13.42511600, SDPATH + 'test1.mp3',          'Test 1',                     'Schöneberg 1',         SDPATH + 'jeansteam.png'],
    [52.52781500, 13.42683800, SDPATH + 'test2.mp3',          'Test 2',                     'Schöneberg 2',         SDPATH + 'nylon.png'],
    [52.52710100, 13.42715000, SDPATH + 'test3.mp3',          'Test 3',                     'Schöneberg 3',         SDPATH + 'berlinskibeat.png']
  ]
};

// Berta sentences

var MESSAGES = {
  disoriented: 'Ich habe die Orientierung verloren. Bitte bringt mich ans Tageslicht und habt etwas Geduld mit mir.',
  distance: 'Noch {{distance}} mal in die Pedale treten',
  announcement: 'Wir sind da. Macht es euch bequem. In 30 Sekunden geht\'s los.',
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
    'Also ich habe schon viele Dates gehabt, aber das hier...',
    'Also ich kann noch!',
    'Oma würde sagen: Wer rastet, der rostet.',
    'Am Ende gibt\'s nen kaltes Bier, versprochen!',
    'Ich dachte ich wäre hier die alte Dame.',
    'Hopp hopp!'
  ],
  goodbye: 'Es war echt schön mit euch. Bitte bringt mich zurück nach Hause.'
};
