USE OmneFictio
GO

INSERT INTO PostType VALUES(1, 'Story')
INSERT INTO PostType VALUES(2, 'Scenario')
INSERT INTO PostType VALUES(3, 'Fanfiction')
INSERT INTO PostType VALUES(4, 'Plot')


INSERT INTO DeletedStatus VALUES(1, 'Default')
INSERT INTO DeletedStatus VALUES(2, 'Removed')
INSERT INTO DeletedStatus VALUES(3, 'TempRemove')


INSERT INTO PostStatus VALUES(1, 'In-progress')
INSERT INTO PostStatus VALUES(2, 'Finished')
INSERT INTO PostStatus VALUES(3, 'Paused')
INSERT INTO PostStatus VALUES(4, 'Dropped')


INSERT INTO RatedAs VALUES(1, 'E - Everyone')
INSERT INTO RatedAs VALUES(2, 'T - 13+')
INSERT INTO RatedAs VALUES(3, 'M - 15+')
INSERT INTO RatedAs VALUES(4, 'A - 18+')
INSERT INTO RatedAs VALUES(5, 'X - Disturbing')


INSERT INTO Authority VALUES('Developer', 'DEV')
INSERT INTO Authority VALUES('Admin', 'ADMIN')
INSERT INTO Authority VALUES('Moderator', 'MOD')


INSERT INTO InventoryItem VALUES('bronze', 'Bronze', 5)
INSERT INTO InventoryItem VALUES('copper', 'Copper', 7)
INSERT INTO InventoryItem VALUES('iron', 'Iron', 10)
INSERT INTO InventoryItem VALUES('silver', 'Silver', 14)
INSERT INTO InventoryItem VALUES('gold', 'Gold', 19)
INSERT INTO InventoryItem VALUES('platinum', 'Platinum', 25)
INSERT INTO InventoryItem VALUES('diamond', 'Diamond', 32)


INSERT INTO Tag VALUES('Sci-Fi', 0)
INSERT INTO Tag VALUES('Tragedy', 0)
INSERT INTO Tag VALUES('Spiritual', 0)
INSERT INTO Tag VALUES('Mystery', 0)
INSERT INTO Tag VALUES('Parody', 0)
INSERT INTO Tag VALUES('Horror', 0)
INSERT INTO Tag VALUES('Fantasy', 0)
INSERT INTO Tag VALUES('Crime', 0)
INSERT INTO Tag VALUES('Western', 0)
INSERT INTO Tag VALUES('Supernatural', 0)
INSERT INTO Tag VALUES('Poetry', 0)
INSERT INTO Tag VALUES('Adventure', 0)
INSERT INTO Tag VALUES('Humor', 0)
INSERT INTO Tag VALUES('Romance', 0)
INSERT INTO Tag VALUES('Family', 0)
INSERT INTO Tag VALUES('Drama', 0)


/*--------------*/
INSERT INTO ExistingStoryType VALUES(1, 'Movie')
INSERT INTO ExistingStoryType VALUES(2, 'TV Show')
INSERT INTO ExistingStoryType VALUES(3, 'Game')
INSERT INTO ExistingStoryType VALUES(4, 'Book')
INSERT INTO ExistingStoryType VALUES(5, 'Anime/Manga')
INSERT INTO ExistingStoryType VALUES(6, 'Cartoon/Comic')
INSERT INTO ExistingStoryType VALUES(7, 'Other')
/*---*/
INSERT INTO ExistingStory VALUES('Pirates of the Caribbean', 1)
INSERT INTO ExistingStory VALUES('Star Trek', 1)
INSERT INTO ExistingStory VALUES('Avengers', 1)
INSERT INTO ExistingStory VALUES('Thor', 1)
INSERT INTO ExistingStory VALUES('X-Men', 1)
/*---*/
INSERT INTO ExistingStory VALUES('Supernatural', 2)
INSERT INTO ExistingStory VALUES('Twilight', 2)
INSERT INTO ExistingStory VALUES('Doctor Who', 2)
INSERT INTO ExistingStory VALUES('Sherlock', 2)
INSERT INTO ExistingStory VALUES('Merlin', 2)
/*---*/
INSERT INTO ExistingStory VALUES('GTA V', 3)
INSERT INTO ExistingStory VALUES('Mafia I', 3)
INSERT INTO ExistingStory VALUES('Call of Duty MW 2', 3)
INSERT INTO ExistingStory VALUES('Elder Scrolls: Oblivion', 3)
INSERT INTO ExistingStory VALUES('Halo', 3)
/*---*/
INSERT INTO ExistingStory VALUES('Lord of the Rings', 4)
INSERT INTO ExistingStory VALUES('Harry Potter', 4)
INSERT INTO ExistingStory VALUES('Hobbit', 4)
INSERT INTO ExistingStory VALUES('Hunger Games', 4)
/*---*/
INSERT INTO ExistingStory VALUES('Attack on Titan', 5)
INSERT INTO ExistingStory VALUES('Naruto', 5)
INSERT INTO ExistingStory VALUES('DBZ', 5)
INSERT INTO ExistingStory VALUES('One Piece', 5)
INSERT INTO ExistingStory VALUES('Overlord', 5)
INSERT INTO ExistingStory VALUES('Death Note', 5)
/*---*/
INSERT INTO ExistingStory VALUES('Inspector Gadget', 6)
INSERT INTO ExistingStory VALUES('Scooby Doo', 6)
INSERT INTO ExistingStory VALUES('Simpsons', 6)
INSERT INTO ExistingStory VALUES('Caillou', 6)
/*--------------*/



INSERT INTO Language VALUES('EN', 'English');
INSERT INTO Language VALUES('TR', 'Turkish');
INSERT INTO Language VALUES('AF', 'Afrikaans');
INSERT INTO Language VALUES('AM', 'Amharic');
INSERT INTO Language VALUES('AR', 'Arabic');
INSERT INTO Language VALUES('AZ', 'Azerbaijani');
INSERT INTO Language VALUES('BE', 'Belarusian');
INSERT INTO Language VALUES('BG', 'Bulgarian');
INSERT INTO Language VALUES('BN', 'Bengali');
INSERT INTO Language VALUES('BO', 'Tibetan Standard');
INSERT INTO Language VALUES('CA', 'Catalan');
INSERT INTO Language VALUES('CS', 'Czech');
INSERT INTO Language VALUES('CY', 'Welsh');
INSERT INTO Language VALUES('DA', 'Danish');
INSERT INTO Language VALUES('DE', 'German');
INSERT INTO Language VALUES('EE', 'Ewe');
INSERT INTO Language VALUES('EL', 'Greek');
INSERT INTO Language VALUES('EO', 'Esperanto');
INSERT INTO Language VALUES('ES', 'Spanish');
INSERT INTO Language VALUES('ET', 'Estonian');
INSERT INTO Language VALUES('EU', 'Basque');
INSERT INTO Language VALUES('FA', 'Persian');
INSERT INTO Language VALUES('FI', 'Finnish');
INSERT INTO Language VALUES('FO', 'Faroese');
INSERT INTO Language VALUES('FR', 'French');
INSERT INTO Language VALUES('GA', 'Irish');
INSERT INTO Language VALUES('GL', 'Galician');
INSERT INTO Language VALUES('GU', 'Gujarati');
INSERT INTO Language VALUES('HE', 'Hebrew');
INSERT INTO Language VALUES('HI', 'Hindi');
INSERT INTO Language VALUES('HR', 'Croatian');
INSERT INTO Language VALUES('HU', 'Hungarian');
INSERT INTO Language VALUES('HY', 'Armenian');
INSERT INTO Language VALUES('IA', 'Interlingua');
INSERT INTO Language VALUES('ID', 'Indonesian');
INSERT INTO Language VALUES('IS', 'Icelandic');
INSERT INTO Language VALUES('IT', 'Italian');
INSERT INTO Language VALUES('JA', 'Japanese');
INSERT INTO Language VALUES('KA', 'Georgian');
INSERT INTO Language VALUES('KI', 'Kikuyu');
INSERT INTO Language VALUES('KM', 'Khmer');
INSERT INTO Language VALUES('KN', 'Kannada');
INSERT INTO Language VALUES('KO', 'Korean');
INSERT INTO Language VALUES('LG', 'Ganda');
INSERT INTO Language VALUES('LO', 'Lao');
INSERT INTO Language VALUES('LT', 'Lithuanian');
INSERT INTO Language VALUES('LV', 'Latvian');
INSERT INTO Language VALUES('MK', 'Macedonian');
INSERT INTO Language VALUES('ML', 'Malayalam');
INSERT INTO Language VALUES('MR', 'Marathi');
INSERT INTO Language VALUES('MS', 'Malay');
INSERT INTO Language VALUES('MT', 'Maltese');
INSERT INTO Language VALUES('MY', 'Burmese');
INSERT INTO Language VALUES('NB', 'Norwegian Bokmal');
INSERT INTO Language VALUES('NE', 'Nepali');
INSERT INTO Language VALUES('NL', 'Dutch');
INSERT INTO Language VALUES('NN', 'Norwegian Nynorsk');
INSERT INTO Language VALUES('NO', 'Norwegian');
INSERT INTO Language VALUES('OR', 'Oriya');
INSERT INTO Language VALUES('PL', 'Polish');
INSERT INTO Language VALUES('PT', 'Portuguese');
INSERT INTO Language VALUES('RM', 'Romansh');
INSERT INTO Language VALUES('RO', 'Romanian');
INSERT INTO Language VALUES('RU', 'Russian');
INSERT INTO Language VALUES('SE', 'Northern Sami');
INSERT INTO Language VALUES('SK', 'Slovak');
INSERT INTO Language VALUES('SL', 'Slovene');
INSERT INTO Language VALUES('SN', 'Shona');
INSERT INTO Language VALUES('SQ', 'Albanian');
INSERT INTO Language VALUES('SR', 'Serbian');
INSERT INTO Language VALUES('SV', 'Swedish');
INSERT INTO Language VALUES('TA', 'Tamil');
INSERT INTO Language VALUES('TE', 'Telugu');
INSERT INTO Language VALUES('TH', 'Thai');
INSERT INTO Language VALUES('TI', 'Tigrinya');
INSERT INTO Language VALUES('TL', 'Tagalog');
INSERT INTO Language VALUES('UK', 'Ukrainian');
INSERT INTO Language VALUES('UR', 'Urdu');
INSERT INTO Language VALUES('VI', 'Vietnamese');
INSERT INTO Language VALUES('ZH-CN', 'Chinese Simplified');
INSERT INTO Language VALUES('ZH-TW', 'Chinese Traditional');










/*
INSERT INTO Language VALUES('EN', 'ENGLISH')
INSERT INTO Language VALUES('TR', 'TURKISH')
INSERT INTO Language VALUES('AF', 'AFRIKAANS')
INSERT INTO Language VALUES('AM', 'AMHARIC')
INSERT INTO Language VALUES('AR', 'ARABIC')
INSERT INTO Language VALUES('AZ', 'AZERBAIJANI')
INSERT INTO Language VALUES('BE', 'BELARUSIAN')
INSERT INTO Language VALUES('BG', 'BULGARIAN')
INSERT INTO Language VALUES('BN', 'BENGALI')
INSERT INTO Language VALUES('BO', 'TIBETAN STANDARD')
INSERT INTO Language VALUES('CA', 'CATALAN')
INSERT INTO Language VALUES('CS', 'CZECH')
INSERT INTO Language VALUES('CY', 'WELSH')
INSERT INTO Language VALUES('DA', 'DANISH')
INSERT INTO Language VALUES('DE', 'GERMAN')
INSERT INTO Language VALUES('EE', 'EWE')
INSERT INTO Language VALUES('EL', 'GREEK')
INSERT INTO Language VALUES('EO', 'ESPERANTO')
INSERT INTO Language VALUES('ES', 'SPANISH')
INSERT INTO Language VALUES('ET', 'ESTONIAN')
INSERT INTO Language VALUES('EU', 'BASQUE')
INSERT INTO Language VALUES('FA', 'PERSIAN')
INSERT INTO Language VALUES('FI', 'FINNISH')
INSERT INTO Language VALUES('FO', 'FAROESE')
INSERT INTO Language VALUES('FR', 'FRENCH')
INSERT INTO Language VALUES('GA', 'IRISH')
INSERT INTO Language VALUES('GL', 'GALICIAN')
INSERT INTO Language VALUES('GU', 'GUJARATI')
INSERT INTO Language VALUES('HE', 'HEBREW')
INSERT INTO Language VALUES('HI', 'HINDI')
INSERT INTO Language VALUES('HR', 'CROATIAN')
INSERT INTO Language VALUES('HU', 'HUNGARIAN')
INSERT INTO Language VALUES('HY', 'ARMENIAN')
INSERT INTO Language VALUES('IA', 'INTERLINGUA')
INSERT INTO Language VALUES('ID', 'INDONESIAN')
INSERT INTO Language VALUES('IS', 'ICELANDIC')
INSERT INTO Language VALUES('IT', 'ITALIAN')
INSERT INTO Language VALUES('JA', 'JAPANESE')
INSERT INTO Language VALUES('KA', 'GEORGIAN')
INSERT INTO Language VALUES('KI', 'KIKUYU')
INSERT INTO Language VALUES('KM', 'KHMER')
INSERT INTO Language VALUES('KN', 'KANNADA')
INSERT INTO Language VALUES('KO', 'KOREAN')
INSERT INTO Language VALUES('LG', 'GANDA')
INSERT INTO Language VALUES('LO', 'LAO')
INSERT INTO Language VALUES('LT', 'LITHUANIAN')
INSERT INTO Language VALUES('LV', 'LATVIAN')
INSERT INTO Language VALUES('MK', 'MACEDONIAN')
INSERT INTO Language VALUES('ML', 'MALAYALAM')
INSERT INTO Language VALUES('MR', 'MARATHI')
INSERT INTO Language VALUES('MS', 'MALAY')
INSERT INTO Language VALUES('MT', 'MALTESE')
INSERT INTO Language VALUES('MY', 'BURMESE')
INSERT INTO Language VALUES('NB', 'NORWEGIAN BOKMAL')
INSERT INTO Language VALUES('NE', 'NEPALI')
INSERT INTO Language VALUES('NL', 'DUTCH')
INSERT INTO Language VALUES('NN', 'NORWEGIAN NYNORSK')
INSERT INTO Language VALUES('NO', 'NORWEGIAN')
INSERT INTO Language VALUES('OR', 'ORIYA')
INSERT INTO Language VALUES('PL', 'POLISH')
INSERT INTO Language VALUES('PT', 'PORTUGUESE')
INSERT INTO Language VALUES('RM', 'ROMANSH')
INSERT INTO Language VALUES('RO', 'ROMANIAN')
INSERT INTO Language VALUES('RU', 'RUSSIAN')
INSERT INTO Language VALUES('SE', 'NORTHERN SAMI')
INSERT INTO Language VALUES('SK', 'SLOVAK')
INSERT INTO Language VALUES('SL', 'SLOVENE')
INSERT INTO Language VALUES('SN', 'SHONA')
INSERT INTO Language VALUES('SQ', 'ALBANIAN')
INSERT INTO Language VALUES('SR', 'SERBIAN')
INSERT INTO Language VALUES('SV', 'SWEDISH')
INSERT INTO Language VALUES('TA', 'TAMIL')
INSERT INTO Language VALUES('TE', 'TELUGU')
INSERT INTO Language VALUES('TH', 'THAI')
INSERT INTO Language VALUES('TI', 'TIGRINYA')
INSERT INTO Language VALUES('TL', 'TAGALOG')
INSERT INTO Language VALUES('UK', 'UKRAINIAN')
INSERT INTO Language VALUES('UR', 'URDU')
INSERT INTO Language VALUES('VI', 'VIETNAMESE')
INSERT INTO Language VALUES('ZH-CN', 'CHINESE SIMPLIFIED')
INSERT INTO Language VALUES('ZH-TW', 'CHINESE TRADITIONAL')
*/