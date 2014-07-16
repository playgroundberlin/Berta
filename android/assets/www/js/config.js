// Storage base path

var SDPATH = '/storage/extSdCard'; // Samsung Galaxy
// var SDPATH = '/mnt/sdcard'; // Vodafone
// var SDPATH = '/mnt/sdcard2'; // Scholl Tablet


// Tour places (lat, lon, path to mp3, artist, title, comment)

var TOURS = {
  "default": [
    [52.55464600, 13.39834200, '/berta/jeansteam.mp3',      'Jeans Team',                 'Lolita Dröhn',         ''],
    [52.54522600, 13.41231100, '/berta/nylon.mp3',          'Nylon',                      'Schönhauser Allee',    ''],
    [52.53887000, 13.42433800, '/berta/dra-q.mp3',          'Dra-Q',                      'Mitsommernacht',       ''],
    [52.53977900, 13.43593300, '/berta/berlinskibeat.mp3',  'Berlinskibeat',              'Nacht in Berlin',      ''],
    [52.52207000, 13.41280500, '/berta/tresen.mp3',         'Der Singende Tresen',        'Alexanderplatz',       ''],
    [52.50865300, 13.45087300, '/berta/koletzki.mp3',       'Oliver Koletzki feat. Fran', 'Warschauer Strasse',   ''],
    [52.50723000, 13.45590500, '/berta/panda.mp3',          'Panda',                      'Hier bleiben',         ''],
    [52.51155900, 13.42684300, '/berta/bonaparte.mp3',      'Bonaparte',                  'Gigolo Vagabundo',     ''],
    [52.51093900, 13.42501500, '/berta/doering.mp3',        'Dirty Doering',              'Bye Bye Bar 25',       ''],
    [52.50839200, 13.42892100, '/berta/rummelsnuff.mp3',    'Rummelsnuff',                'Winterlied',           ''],
    [52.49827100, 13.42440000, '/berta/simonnejones.mp3',   'Simonne Jones',              'We Are Young',         ''],
    [52.49550000, 13.42014300, '/berta/yukazu.mp3',         'Yukazu',                     'Rote Äpfel',           ''],
    [52.47942169, 13.43147278, '/berta/pauline-andres.mp3', 'Pauline Andrès',             'Fuck you french girl', '']
  ],
  "test": [
    [52.48542500, 13.36251800, '/berta/test1.mp3',          'Test',                       'Schöneberg 1',         ''],
    [52.48647100, 13.36227200, '/berta/test2.mp3',          'Test',                       'Schöneberg 2',         ''],
    [52.48603300, 13.36358100, '/berta/test3.mp3',          'Test',                       'Schöneberg 3',         '']
  ],
  "maerchenbrunnen": [
    [52.52814100, 13.43288900, '/berta/koletzki.mp3',       'Oliver Koletzki feat. Fran', 'Warschauer Strasse',   ''],
    [52.52814100, 13.43288900, '/berta/nylon.mp3',          'Nylon',                      'Schönhauser Allee',    ''],
    [52.52727900, 13.43402600, '/berta/dra-q.mp3',          'Dra-Q',                      'Mitsommernacht',       ''],
    [52.52617000, 13.43542100, '/berta/berlinskibeat.mp3',  'Berlinskibeat',              'Nacht in Berlin',      ''],
    [52.52795800, 13.43572100, '/berta/tresen.mp3',         'Der Singende Tresen',        'Alexanderplatz',       ''],
    [52.52786700, 13.43803900, '/berta/doering.mp3',        'Dirty Doering',              'Bye Bye Bar 25',       ''],
    [52.52793200, 13.42640900, '/berta/jeansteam.mp3',      'Jeans Team',                 'Lolita Dröhn',         '']
  ]
};

// Berta sentences

var MESSAGES = {
  disoriented: 'Ich habe die Orientierung verloren. Bitte bringt mich ans Tageslicht und habt etwas Geduld mit mir.',
  distunit: 'Schritte',
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
