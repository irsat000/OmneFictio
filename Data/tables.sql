
USE OmneFictio
GO

/*------------------------------*/

CREATE TABLE PostType(
    id TINYINT PRIMARY KEY,
    body VARCHAR(30) NOT NULL
)
CREATE TABLE DeletedStatus(
    id TINYINT PRIMARY KEY,
    body VARCHAR(20) NOT NULL
)
CREATE TABLE PostStatus(
    id TINYINT PRIMARY KEY,
    body VARCHAR(20) NOT NULL
)
CREATE TABLE RatedAs(
    id INT PRIMARY KEY,
    body VARCHAR(30) NOT NULL
)
CREATE TABLE ExistingStoryType(
    id INT PRIMARY KEY,
    body VARCHAR(250) NOT NULL
)

CREATE TABLE Language(
    id INT PRIMARY KEY IDENTITY(1,1),
    lanCode NVARCHAR(15),
    body NVARCHAR(140) NOT NULL
)
CREATE TABLE Tag(
    id INT PRIMARY KEY IDENTITY(1,1),
    body VARCHAR(60) NOT NULL
)
CREATE TABLE Authority(
    id INT PRIMARY KEY IDENTITY(1,1),
    body VARCHAR(50) NOT NULL
)
CREATE TABLE InventoryItem(
    id INT PRIMARY KEY IDENTITY(1,1),
    body VARCHAR(250) NOT NULL
)
CREATE TABLE ExistingStory(
    id INT PRIMARY KEY IDENTITY(1,1),
    body VARCHAR(250) NOT NULL,
    storyTypeId INT NULL,
    CONSTRAINT FK_EStoryEStorytype FOREIGN KEY (storyTypeId) REFERENCES ExistingStoryType(id) ON DELETE SET NULL
)
CREATE TABLE IP(
    id INT PRIMARY KEY IDENTITY(1,1),
    body VARCHAR(20) NOT NULL
)

/*--------------------MAIN TABLES-------------------------------------*/

CREATE TABLE Account(
    id INT PRIMARY KEY IDENTITY(1,1),
    externalId VARCHAR(64) NULL,
    externalType VARCHAR(25) DEFAULT 'Native' NULL,
    username VARCHAR(60) NOT NULL UNIQUE,
    pw VARCHAR(100) NULL,
    email VARCHAR(250) NOT NULL,
    emailValid BIT DEFAULT 0,
    displayName VARCHAR(60) NULL,
    profilePic VARCHAR(150) DEFAULT 'noppic.webp',
    selfDesc VARCHAR(MAX) DEFAULT 'I am lazy because I didnt change my description or I just dont care enough.',
    gold INT DEFAULT 0,
    allowAdultContent BIT DEFAULT 0,
    deletedStatusId TINYINT DEFAULT 1,
    prefLanguageId INT NULL,
    CONSTRAINT FK_AccountDeletedstatus FOREIGN KEY (deletedStatusId) REFERENCES DeletedStatus(id) ON DELETE SET NULL,
    CONSTRAINT FK_UserLanguage FOREIGN KEY (prefLanguageId) REFERENCES Language(id) ON DELETE SET NULL
)

CREATE TABLE Post(
    id INT PRIMARY KEY IDENTITY(1,1),
    title VARCHAR(250) NOT NULL,
    postDescription VARCHAR(MAX) NOT NULL,
    coverImage VARCHAR(MAX) NULL,
    publishDate SMALLDATETIME NOT NULL,
    updateDate SMALLDATETIME NOT NULL,
    deletedStatusId TINYINT DEFAULT 1,
    postStatusId TINYINT DEFAULT 1,
    postTypeId TINYINT DEFAULT 1,
    ratedAsId INT DEFAULT 1,
    languageId INT NULL,
    accountId INT NULL,
    isPublished BIT DEFAULT 0,
    CONSTRAINT FK_PostDeletedstatus FOREIGN KEY (deletedStatusId) REFERENCES DeletedStatus(id) ON DELETE SET NULL,
    CONSTRAINT FK_PostPoststatus FOREIGN KEY (postStatusId) REFERENCES PostStatus(id) ON DELETE SET NULL,
    CONSTRAINT FK_PostPosttype FOREIGN KEY (postTypeId) REFERENCES PostType(id) ON DELETE SET NULL,
    CONSTRAINT FK_PostLanguage FOREIGN KEY (languageId) REFERENCES Language(id) ON DELETE SET NULL,
    CONSTRAINT FK_PostAccount FOREIGN KEY (accountId) REFERENCES Account(id) ON DELETE SET NULL,
    CONSTRAINT FK_PostRatedas FOREIGN KEY (ratedAsId) REFERENCES RatedAs(id) ON DELETE SET NULL
)

CREATE TABLE Chapter(
    id INT PRIMARY KEY IDENTITY(1,1),
    title VARCHAR(250),
    postId INT NULL,
    body VARCHAR(MAX),
    authorNotePrior VARCHAR(MAX) NULL,
    authorNoteLater VARCHAR(MAX) NULL,
    chapterIndex INT,
    publishDate SMALLDATETIME NOT NULL,
    updateDate SMALLDATETIME NOT NULL,
    isPublished BIT DEFAULT 0,
    deletedStatusId TINYINT DEFAULT 1,
    CONSTRAINT FK_ChapterPost FOREIGN KEY (postId) REFERENCES Post(id) ON DELETE SET NULL,
    CONSTRAINT FK_ChapterDeletedstatus FOREIGN KEY (deletedStatusId) REFERENCES DeletedStatus(id) ON DELETE SET NULL
)


CREATE TABLE Comment(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT NULL,
    body VARCHAR(MAX) NOT NULL,
    deletedStatusId TINYINT DEFAULT 1,
    publishDate SMALLDATETIME NOT NULL,
    updateDate SMALLDATETIME NOT NULL,
    targetPostId INT NULL,
    targetChapterId INT NULL,
    CONSTRAINT FK_CommentPost FOREIGN KEY (targetPostId) REFERENCES Post(id) ON DELETE SET NULL,
    CONSTRAINT FK_CommentChapter FOREIGN KEY (targetChapterId) REFERENCES Chapter(id) ON DELETE SET NULL,
    CONSTRAINT FK_CommentAccount FOREIGN KEY (accountId) REFERENCES Account(id) ON DELETE SET NULL,
    CONSTRAINT FK_CommentDeletedstatus FOREIGN KEY (deletedStatusId) REFERENCES DeletedStatus(id) ON DELETE SET NULL
)

CREATE TABLE Reply(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT NULL,
    commentId INT NULL,
    body VARCHAR(MAX) NOT NULL,
    deletedStatusId TINYINT DEFAULT 1,
    publishDate SMALLDATETIME NOT NULL,
    updateDate SMALLDATETIME NOT NULL,
    CONSTRAINT FK_ReplyAccount FOREIGN KEY (accountId) REFERENCES Account(id) ON DELETE SET NULL,
    CONSTRAINT FK_ReplyComment FOREIGN KEY (commentId) REFERENCES Comment(id) ON DELETE SET NULL,
    CONSTRAINT FK_ReplyDeletedstatus FOREIGN KEY (deletedStatusId) REFERENCES DeletedStatus(id) ON DELETE SET NULL
)

CREATE TABLE Rate(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT NULL,
    postId INT NULL,
    body FLOAT NOT NULL,
    CONSTRAINT FK_RateAccount FOREIGN KEY (accountId) REFERENCES Account(id) ON DELETE SET NULL,
    CONSTRAINT FK_RatePost FOREIGN KEY (postId) REFERENCES Post(id) ON DELETE SET NULL
)

CREATE TABLE Vote(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT NULL,
    body BIT NOT NULL,
    targetPostId INT NULL,
    targetChapterId INT NULL,
    targetCommentId INT NULL,
    targetReplyId INT NULL,
    CONSTRAINT FK_VotePost FOREIGN KEY (targetPostId) REFERENCES Post(id) ON DELETE SET NULL,
    CONSTRAINT FK_VoteChapter FOREIGN KEY (targetChapterId) REFERENCES Chapter(id) ON DELETE SET NULL,
    CONSTRAINT FK_VoteComment FOREIGN KEY (targetCommentId) REFERENCES Comment(id) ON DELETE SET NULL,
    CONSTRAINT FK_VoteReply FOREIGN KEY (targetReplyId) REFERENCES Reply(id) ON DELETE SET NULL,
    CONSTRAINT FK_VoteAccount FOREIGN KEY (accountId) REFERENCES Account(id) ON DELETE SET NULL
)
/*If targets are deleted, this will be cleaned daily with triggers.*/

CREATE TABLE ChatMessage(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT,
    targetAccountId INT NULL,
    body VARCHAR(MAX) NOT NULL,
    sentDate SMALLDATETIME NOT NULL,
    CONSTRAINT FK_ChatMessageAccount FOREIGN KEY (accountId) REFERENCES Account(id),
    CONSTRAINT FK_ChatMessageTarget FOREIGN KEY (targetAccountId) REFERENCES Account(id) ON DELETE SET NULL
)

CREATE TABLE PostGift(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT,
    targetPostId INT,
    itemId INT,
    sentDate SMALLDATETIME NOT NULL,
    CONSTRAINT FK_PostGiftAccount FOREIGN KEY (accountId) REFERENCES Account(id) ON DELETE SET NULL,
    CONSTRAINT FK_PostGiftPost FOREIGN KEY (targetPostId) REFERENCES Post(id) ON DELETE SET NULL,
    CONSTRAINT FK_PostGiftItem FOREIGN KEY (itemId) REFERENCES InventoryItem(id) ON DELETE SET NULL
)

CREATE TABLE Request(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT,
    title VARCHAR(250),
    body VARCHAR(MAX),
    publishDate SMALLDATETIME NOT NULL,
    deletedStatusId TINYINT DEFAULT 1,
    CONSTRAINT FK_RequestAccount FOREIGN KEY (accountId) REFERENCES Account(id) ON DELETE SET NULL,
    CONSTRAINT FK_RequestDeletedstatus FOREIGN KEY (deletedStatusId) REFERENCES DeletedStatus(id) ON DELETE SET NULL
)


/*---------------------PURE MANY TO MANY------------------------------*/

CREATE TABLE Post_Tag(
    postId INT,
    tagId INT,
    CONSTRAINT [PK_PostTag] PRIMARY KEY ([postId], [tagId]),
    CONSTRAINT FK_PostTag_Post FOREIGN KEY (postId) REFERENCES Post(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_PostTag_Tag FOREIGN KEY (tagId) REFERENCES Tag(id) ON DELETE CASCADE ON UPDATE CASCADE
)
CREATE TABLE Post_EStory(
    postId INT,
    existingStoryId INT,
    CONSTRAINT [PK_PostEStory] PRIMARY KEY ([postId], [existingStoryId]),
    CONSTRAINT FK_PostEStory_Post FOREIGN KEY (postId) REFERENCES Post(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_PostEStory_EStory FOREIGN KEY (existingStoryId) REFERENCES ExistingStory(id) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE Account_Authority(
    accountId INT,
    authorityId INT,
    CONSTRAINT [PK_AccountAuthority] PRIMARY KEY ([accountId], [authorityId]),
    CONSTRAINT FK_AccountAuthority_Account FOREIGN KEY (accountId) REFERENCES Account(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_AccountAuthority_Authority FOREIGN KEY (authorityId) REFERENCES Authority(id) ON DELETE CASCADE ON UPDATE CASCADE
)
CREATE TABLE Account_IP(
    accountId INT,
    ipId INT,
    CONSTRAINT [PK_AccountIP] PRIMARY KEY ([accountId], [ipId]),
    CONSTRAINT FK_AccountIP_Account FOREIGN KEY (accountId) REFERENCES Account(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_AccountIP_IP FOREIGN KEY (ipId) REFERENCES IP(id) ON DELETE CASCADE ON UPDATE CASCADE
)
CREATE TABLE Account_Inventory(
    accountId INT,
    inventoryItemId INT,
    CONSTRAINT [PK_AccountInventory] PRIMARY KEY ([accountId], [inventoryItemId]),
    CONSTRAINT FK_AccountInventory_Account FOREIGN KEY (accountId) REFERENCES Account(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_AccountInventory_InventoryItem FOREIGN KEY (inventoryItemId) REFERENCES InventoryItem(id) ON DELETE CASCADE ON UPDATE CASCADE
)
