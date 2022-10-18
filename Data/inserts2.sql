USE OmneFictio
GO
/*

INSERT INTO Account(username, pw, email, emailValid, profilePic, selfDesc, gold, allowSexual, allowViolence, deletedStatusId, prefLanguageId)
VALUES('İrşatAkdeniz', '123456asd', 'irsat@gmail.com', 1, default, default, 10000, 1, 1, 1, null)
INSERT INTO Account(username, pw, email, emailValid, profilePic, selfDesc, gold, allowSexual, allowViolence, deletedStatusId, prefLanguageId)
VALUES('DenemeHesap', '123456asd', 'deneme@gmail.com', 1, default, default, 700, 1, 1, 1, null)
INSERT INTO Account(username, pw, email, emailValid, profilePic, selfDesc, gold, allowSexual, allowViolence, deletedStatusId, prefLanguageId)
VALUES('DenemeHesap2', '123456asd', 'deneme2@gmail.com', 1, default, default, 700, 1, 1, 1, null)
*/


INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished, coverImage)
VALUES ('Odin the Omnipotent', 'After his father’s death, Odin was not going to be so peaceful. Old ways died as the new skyfather born.',
'2022-07-24 10:43:10', '2022-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1,
'https://images-na.ssl-images-amazon.com/images/I/71GFREhtqNL.jpg')

INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished, coverImage)
VALUES ('Davy Jones', 'Jones fell in love with the goddess Calypso. He agreed to guide the dead but Calypso was a bi*ch. When he returned from duty, she was not there.',
'2022-04-24 10:43:10', '2022-05-25 10:43:10', 1, 1, 1, 1, 1, 4, 1,
null)

INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished, coverImage)
VALUES ('Auto generated text for posts 1', 'May indulgence difficulty ham can put especially. Bringing remember for supplied her why was confined. Middleton principle did she procuring extensive believing add. Weather adapted prepare oh is calling. These wrong of he which there smile to my front. He fruit oh enjoy it of whose table. Cultivated occasional old her unpleasing unpleasant. At as do be against pasture covered viewing started. Enjoyed me settled mr respect no spirits civilly.',
'2022-05-24 10:43:10', '2022-06-25 10:43:10', 1, 1, 1, 1, 1, 5, 1,
'https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium')

INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished, coverImage)
VALUES ('Auto generated text for posts 2', 'Old education him departure any arranging one prevailed. Their end whole might began her. Behaved the comfort another fifteen eat. Partiality had his themselves ask pianoforte increasing discovered. So mr delay at since place whole above miles. He to observe conduct at detract because.',
'2022-06-24 10:43:10', '2022-07-25 10:43:10', 1, 1, 1, 1, 5, 1,
'https://edit.org/images/cat/book-covers-big-2019101610.jpg')




INSERT INTO Rate(accountId, postId, body) VALUES(4, 13, 2)


INSERT INTO Chapter(title, postId, body, chapterIndex, publishDate, updateDate, isPublished) 
    VALUES('Prologue', 12, 'alsdfkjasd flkajsd', 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10', 1)
INSERT INTO Chapter(title, postId, body, chapterIndex, publishDate, updateDate, isPublished) 
    VALUES('Chapter 1', 12, 'alsdfkjasd flkajsd', 2, '2022-06-24 10:43:10', '2022-06-25 10:43:10', 1)
INSERT INTO Chapter(title, postId, body, chapterIndex, publishDate, updateDate, isPublished) 
    VALUES('Chapter 2', 12, 'alsdfkjasd flkajsd', 3, '2022-06-24 10:43:10', '2022-06-25 10:43:10', 1)
INSERT INTO Chapter(title, postId, body, chapterIndex, publishDate, updateDate, isPublished) 
    VALUES('Chapter 3', 12, 'alsdfkjasd flkajsd', 4, '2022-06-24 10:43:10', '2022-06-25 10:43:10', 1)
INSERT INTO Chapter(title, postId, body, chapterIndex, publishDate, updateDate, isPublished) 
    VALUES('Chapter 4', 12, 'alsdfkjasd flkajsd', 5, '2022-06-24 10:43:10', '2022-06-25 10:43:10', 1)
INSERT INTO Chapter(title, postId, body, chapterIndex, publishDate, updateDate, isPublished) 
    VALUES('Epilogue', 12, 'alsdfkjasd flkajsd', 6, '2022-06-24 10:43:10', '2022-06-25 10:43:10', 1)


INSERT INTO Chapter(title, postId, body, chapterIndex, publishDate, updateDate, isPublished) 
    VALUES('Chapter 1', 15, 'alsdfkjasd flkajsd', 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10', 1)
INSERT INTO Chapter(title, postId, body, chapterIndex, publishDate, updateDate, isPublished) 
    VALUES('Chapter 2', 15, 'alsdfkjasd flkajsd', 2, '2022-06-24 10:43:10', '2022-06-25 10:43:10', 1)
INSERT INTO Chapter(title, postId, body, chapterIndex, publishDate, updateDate, isPublished) 
    VALUES('Chapter 3', 15, 'alsdfkjasd flkajsd', 3, '2022-06-24 10:43:10', '2022-06-25 10:43:10', 1)
INSERT INTO Chapter(title, postId, body, chapterIndex, publishDate, updateDate, isPublished) 
    VALUES('Chapter 4', 15, 'alsdfkjasd flkajsd', 4, '2022-06-24 10:43:10', '2022-06-25 10:43:10', 1)
INSERT INTO Chapter(title, postId, body, chapterIndex, publishDate, updateDate, isPublished) 
    VALUES('Chapter 5', 15, 'alsdfkjasd flkajsd', 5, '2022-06-24 10:43:10', '2022-06-25 10:43:10', 1)


INSERT INTO Comment(accountId, body, deletedStatusId, publishDate, updateDate, targetPostId, targetChapterId)
    VALUES(4, 'This is a comment for post', 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10', 12, null)

INSERT INTO Comment(accountId, body, deletedStatusId, publishDate, updateDate, targetPostId, targetChapterId)
    VALUES(4, 'odins struggles with alcohol are often overshadowed by his wifes decision to drop him off at Chateau Marmont. The couple also spent several hours together and were having their own party together at the Marmont. D.C. was the hottest spot throughout the summer while D.C., a lot of folks knew D.C. from their time at the bar. (Some of us were also on the outside working on the party.)'
    , 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10', 12, null)

INSERT INTO Comment(accountId, body, deletedStatusId, publishDate, updateDate, targetPostId, targetChapterId)
    VALUES(4, 'odins power base and will have a number of advantages over other units in the game. As such, I think that it has the potential to be a pretty effective force to put down during certain situations, but the amount of time required and the degree of precision of the moves to do so make it difficult to beat, especially considering the current state of the game, which is just about out of the question with every competitive tournament that the game is played in.'
    , 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10', 12, null)


INSERT INTO Comment(accountId, body, deletedStatusId, publishDate, updateDate, targetPostId, targetChapterId)
    VALUES(4, 'odins power to open the floodgates for more and more illegal migrants, but what kind of effect would Trumps policies really have? According to some, he could be seen as a "good guy," a man who likes to talk about women and minorities. In the past four years, Trump has signed a slew of executive orders, such as, and even when he signed his first refugee ban, he has been outvoted by Republicans by as little as 5 million voters.'
    , 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10', 12, null)

INSERT INTO Comment(accountId, body, deletedStatusId, publishDate, updateDate, targetPostId, targetChapterId)
    VALUES(4, 'battling with god of thunder". "In the end, however, when the king is brought to trial, his familys money, property and honor are wiped clean, to a extent that it would be unimaginable to return to such an ungovernable environment if those who ruled it were brought to live in hell".'
    , 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10', 12, null)



INSERT INTO Reply(accountId, commentId, body, deletedStatusId, publishDate, updateDate)
    VALUES(4, 1, 'This is a reply for the comment', 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10')
INSERT INTO Reply(accountId, commentId, body, deletedStatusId, publishDate, updateDate)
    VALUES(4, 1, 'This is a reply for the comment 2', 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10')
INSERT INTO Reply(accountId, commentId, body, deletedStatusId, publishDate, updateDate)
    VALUES(4, 1, 'This is a reply for the comment 3', 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10')
INSERT INTO Reply(accountId, commentId, body, deletedStatusId, publishDate, updateDate)
    VALUES(4, 1, 'This is a reply for the comment 4', 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10')
INSERT INTO Reply(accountId, commentId, body, deletedStatusId, publishDate, updateDate)
    VALUES(4, 1, 'This is a reply for the comment 5', 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10')


INSERT INTO Reply(accountId, commentId, body, deletedStatusId, publishDate, updateDate)
    VALUES(4, 2, 'This is a reply for a comment', 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10')


INSERT INTO Reply(accountId, commentId, body, deletedStatusId, publishDate, updateDate)
    VALUES(4, 3, 'This is a reply for a comment 2', 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10')
INSERT INTO Reply(accountId, commentId, body, deletedStatusId, publishDate, updateDate)
    VALUES(4, 3, 'This is a reply for a comment 2', 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10')

    
INSERT INTO Reply(accountId, commentId, body, deletedStatusId, publishDate, updateDate)
    VALUES(4, 5, 'This is a reply for a comment 1', 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10')
INSERT INTO Reply(accountId, commentId, body, deletedStatusId, publishDate, updateDate)
    VALUES(4, 5, 'Too many replies hahaha', 1, '2022-06-24 10:43:10', '2022-06-25 10:43:10')










    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 4', 
'A new high speed rail line from Brussels to Antwerp via on a bridge crossing the canal and also on a tunnel will be constructed in the near future.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 2, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 5', 
'Adopting much of the Belgian ideas about the role of the road network, the British government has announced plans to build a 3-lane motorway between Oxford and London at a cost of over £15bn.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 3, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 6', 
'The happy part is that it is not that bad. I managed to find myself a nice routine. I have some help, and it seems to be doing good. The hard part is fighting my instincts.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 4, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 7', 
'I feel like I should be just finishing up and be on my way to the next phase of the training. I will most likely be there for another two weeks to a month before I go back home. For now, my life is being organized around the process of moving out of the house.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 8', 
'This coming week is a very important one. My girlfriend and I have decided to buy a house. We will be signing a contract with a broker this week, and I will be working on the down payment with them.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 2, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 9', 
'We are both excited about the opportunity to live on our own. It will be different, but we can make it work. I would like to be more of an adult.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 3, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 10', 
'One of my friends at camp told me about a quote that is in a song by the band Sum 41 that seems really relevant to me right now.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 4, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 11', 
'The song is called The Ghost Inside. For now, I will just have to focus on this moment and this place I am in. I have the rest of my life ahead of me. New England Rugby Fest in Boston After a much needed bye week, I finally get to play rugby this Sunday. The game is in Boston, which is nice. I used to go to that tournament every
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 12', 
'The voter wont care if they actually registered correctly, just that they have a sticky card that can be used in future elections. It doesnt mean that the address is where its supposed to be.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 2, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 13', 
'Or maybe it will. Anyhow, on to the actual vote. The front page of the paper had a full page photo of Newt and $5. 00 for each voter that was ready to cast a "vote".
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 3, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 14', 
'It made me mad that I had to pay to vote. I mean, I dont have a problem with paying the poll workers, since its their job, but why do they have to have $5. 00 for each person who wants to vote?
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 4, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 15', 
'Do I need to register? It took me five tries to get the card up, and my ex - husband had to go over the card with me a million times. I dont think Im going to vote for him. Maybe I should.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 16', 
'Anyhow, I filled out my ballot, fed it into the machine, and it counted down. I think it counted for all three of us. Well, thats what it counted for.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 17', 
'Somehow, when I got my ballot, it didnt say my vote, so it was saying Michelles, even though we live in the same house, and I sent it in the same envelope.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 18', 
'She sent me hers in the proper envelope, and it counted for her. Sigh. So now we have to write a letter. I dont know whos going to do the letter - writing, but its a good thing to do.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 19', 
'The only thing is, is I have the three counties, so I have to do it in three different places. Actually, the post office isnt too far away from my house, so it shouldnt be too difficult.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 20', 
'Also, someone at church told me that it wasnt too late to get my absentee ballot in and sent, so Im going to do that. So here we are, in week 8.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 21', 
'I dont have any sponsors for the contest, so I cant post any comments. I did notice something interesting though. One of the blogs has the comments up and another doesnt.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 22', 
'I thought maybe it was a technical thing, like my access was bad, but it looks like I cant see them at all.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 23', 
'It wouldnt be so bad, but they have a link that says theres a few surprises in store if you visit them. Now Ive told myself that Im not going to visit anymore, but the last 3 visits Im on that place website!
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 24', 
'I need to stop before I start doing something dumb. Like look at their website. So if you think you should take on an online shopping challenge, please let me know.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 25', 
'And I wont tell your boyfriends about what youre doing. And you can say its from a blog. Posted by Im a 20 year old college student who goes home every weekend.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 26', 
'I love my family and they make me happy. Im a pretty active person and like to run, travel, dance, eat good food, have fun, and relax. Im not the biggest fan of work and want to have as little of a social life as possible.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 27', 
'Ive been pretty lucky in my life and have a great family and friends. Some people would consider me crazy, but I dont really see it that way. Me and most of my friends are pretty out going.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 28', 
'I always wanted to go to Paris, so I did. I also got to go to Australia and Thailand and was able to really get a glimpse into other cultures. And this summer Ill be going to Hong Kong and Indonesia.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 29', 
'I enjoy shopping and fashion, but Im not the best when it comes to clothes shopping. I have a major shoe problem and also love purses. I have a collection of purses I actually use for multiple different occasions.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)
    
INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 30', 
'Im a hopeless romantic. I want to see the world, and with a lot of hard work and determination, Im hoping to go to Paris this year. Im a carefree person and look for the good in people.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)

INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 31', 
'Mike spoke with the realtor and he said that they will be dropping off a pre - sale contract tomorrow and I just have to get her signature on it, then we are ready to buy the house.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)

INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 32', 
'Apparently all of the credit stuff is looking good and the mortgage people at my current house got another stamp of approval for this new house when I went into them on Monday.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)

INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 33', 
'So there is a good chance that I will not need to refinance my current house and I can close on this house October 14th, after I am paid again at the diner.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)

INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 34', 
'We cant believe that we are going to have a house so soon! I also cant believe that I am just going to leave my current house without taking anything with me to this new house.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)

INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 35', 
'Well, the good news is that I will have some income coming in from the house sale but I am still feeling like a big fat loser. Why cant I ever just be satisfied with what I have?
I will probably have to take my realtors keys with me to this house because she has keys to my house now. This move to the farm is the biggest accomplishment in my life.
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)

INSERT INTO Post(title, postDescription, publishDate, updateDate, deletedStatusId, postStatusId, postTypeId, ratedAsId, languageId, accountId, isPublished)
VALUES ('Auto generated text for posts 36', 
'How long do I have to keep going back and forth? I know its a step in the right direction but I dont really feel like I have accomplished anything yet. I have waited for this day for so long, why do I feel so down?
', '2021-06-24 10:43:10', '2021-07-25 10:43:10', 1, 1, 1, 1, 1, 4, 1)