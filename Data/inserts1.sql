USE OmneFictio
GO

INSERT INTO PostType VALUES(1, 'Story')
INSERT INTO PostType VALUES(2, 'Scenario')
INSERT INTO PostType VALUES(3, 'Fanfiction')
INSERT INTO PostType VALUES(4, 'Plot')


INSERT INTO DeletedStatus VALUES(1, 'Default')
INSERT INTO DeletedStatus VALUES(2, 'Temporary Removal')
INSERT INTO DeletedStatus VALUES(3, 'Removed')


INSERT INTO PostStatus VALUES(1, 'In-progress')
INSERT INTO PostStatus VALUES(2, 'Pause')
INSERT INTO PostStatus VALUES(3, 'Dropped')
INSERT INTO PostStatus VALUES(4, 'Finished')


INSERT INTO RatedAs VALUES(1, 'E - Everyone')
INSERT INTO RatedAs VALUES(2, 'T - 13+')
INSERT INTO RatedAs VALUES(3, 'M - 15+')
INSERT INTO RatedAs VALUES(4, 'A - 18+')


INSERT INTO Authority VALUES('Admin')
INSERT INTO Authority VALUES('Moderator')
INSERT INTO Authority VALUES('a45Bl3Kw7S$!3D2g')
INSERT INTO Authority VALUES('X!xv#cJ1*@Lh3S3f')
INSERT INTO Authority VALUES('$G^3z53M6s&u8O7v')
INSERT INTO Authority VALUES('*Q5e1i6X9!##$Ypw')


INSERT INTO InventoryItem VALUES('Bronz')
INSERT INTO InventoryItem VALUES('Iron')
INSERT INTO InventoryItem VALUES('Silver')
INSERT INTO InventoryItem VALUES('Gold')
INSERT INTO InventoryItem VALUES('Platinum')


INSERT INTO Tag VALUES('Sci-Fi')
INSERT INTO Tag VALUES('Tragedy')
INSERT INTO Tag VALUES('Spiritual')
INSERT INTO Tag VALUES('Mystery')
INSERT INTO Tag VALUES('Parody')
INSERT INTO Tag VALUES('Horror')
INSERT INTO Tag VALUES('Fantasy')
INSERT INTO Tag VALUES('Crime')
INSERT INTO Tag VALUES('Western')
INSERT INTO Tag VALUES('Supernatural')
INSERT INTO Tag VALUES('Poetry')
INSERT INTO Tag VALUES('Adventure')
INSERT INTO Tag VALUES('Humor')
INSERT INTO Tag VALUES('Romance')
INSERT INTO Tag VALUES('Family')
INSERT INTO Tag VALUES('Drama')


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