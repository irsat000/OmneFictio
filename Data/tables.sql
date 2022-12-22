
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
    lanCode NVARCHAR(15) NOT NULL UNIQUE,
    body NVARCHAR(140) NOT NULL
)
CREATE TABLE Tag(
    id INT PRIMARY KEY IDENTITY(1,1),
    body VARCHAR(60) NOT NULL UNIQUE,
    userGenerated BIT NOT NULL
)
CREATE TABLE Authority(
    id INT PRIMARY KEY IDENTITY(1,1),
    code VARCHAR(100) NOT NULL UNIQUE,
    body VARCHAR(100) NOT NULL
)
CREATE TABLE InventoryItem(
    id INT PRIMARY KEY IDENTITY(1,1),
    code VARCHAR(20) NOT NULL UNIQUE,
    body VARCHAR(250) NOT NULL,
    itemValue INT NOT NULL
)
CREATE TABLE Theme(
    id INT PRIMARY KEY IDENTITY(1,1),
    code VARCHAR(10) NOT NULL UNIQUE,
    title VARCHAR(60) NOT NULL,
    themeDescription VARCHAR(MAX) NOT NULL
    /*colors*/
)
CREATE TABLE ExistingStory(
    id INT PRIMARY KEY IDENTITY(1,1),
    body VARCHAR(250) NOT NULL,
    storyTypeId INT NOT NULL,
    CONSTRAINT FK_EStoryEStorytype FOREIGN KEY (storyTypeId) REFERENCES ExistingStoryType(id)
)

/*--------------------MAIN TABLES-------------------------------------*/

CREATE TABLE Account(
    id INT PRIMARY KEY IDENTITY(1,1),
    externalId VARCHAR(64) NULL,
    externalType VARCHAR(25) NOT NULL DEFAULT 'Native',
    username VARCHAR(60) NOT NULL UNIQUE,
    pw VARCHAR(100) NOT NULL,
    email VARCHAR(250) NOT NULL,
    emailValid BIT NOT NULL DEFAULT 0,
    displayName VARCHAR(60) NULL,
    profilePic VARCHAR(150) NULL DEFAULT 'user_no_photo.png',
    selfDesc VARCHAR(MAX) NULL,
    gold INT NOT NULL DEFAULT 0,
    deletedStatusId TINYINT NULL DEFAULT 1,
    CONSTRAINT FK_AccountDeletedstatus FOREIGN KEY (deletedStatusId) REFERENCES DeletedStatus(id)
)

CREATE TABLE Preference(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT NOT NULL,
    allowAdultContent BIT NULL DEFAULT 0,
    accountCardMode TINYINT NULL DEFAULT 1,
    postsMasonryDesign BIT NULL DEFAULT 1,
    prefLanguageId INT NULL,
    prefLanguageId_2 INT NULL,
    CONSTRAINT FK_PreferenceAccount FOREIGN KEY (accountId) REFERENCES Account(id),
    CONSTRAINT FK_PreferenceLanguage FOREIGN KEY (prefLanguageId) REFERENCES Language(id),
    CONSTRAINT FK_PreferenceLanguage_2 FOREIGN KEY (prefLanguageId_2) REFERENCES Language(id)
    /*I will add preferences about the index page. Like showing top posts or something else.*/
)

CREATE TABLE Post(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT NULL,
    title VARCHAR(250) NOT NULL,
    postDescription VARCHAR(MAX) NOT NULL,
    coverImage VARCHAR(MAX) NULL,
    publishDate SMALLDATETIME NOT NULL,
    updateDate SMALLDATETIME NOT NULL,
    deletedStatusId TINYINT NULL DEFAULT 1,
    postStatusId TINYINT NOT NULL DEFAULT 1,
    postTypeId TINYINT NOT NULL DEFAULT 1,
    ratedAsId INT NOT NULL DEFAULT 1,
    languageId INT NOT NULL,
    isPublished BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_PostDeletedstatus FOREIGN KEY (deletedStatusId) REFERENCES DeletedStatus(id),
    CONSTRAINT FK_PostPoststatus FOREIGN KEY (postStatusId) REFERENCES PostStatus(id),
    CONSTRAINT FK_PostPosttype FOREIGN KEY (postTypeId) REFERENCES PostType(id),
    CONSTRAINT FK_PostLanguage FOREIGN KEY (languageId) REFERENCES Language(id),
    CONSTRAINT FK_PostAccount FOREIGN KEY (accountId) REFERENCES Account(id),
    CONSTRAINT FK_PostRatedas FOREIGN KEY (ratedAsId) REFERENCES RatedAs(id)
)

CREATE TABLE Chapter(
    id INT PRIMARY KEY IDENTITY(1,1),
    title VARCHAR(250) NOT NULL,
    postId INT NOT NULL,
    body VARCHAR(MAX) NOT NULL,
    authorNotePrior VARCHAR(MAX) NULL,
    authorNoteLater VARCHAR(MAX) NULL,
    chapterIndex INT NOT NULL,
    publishDate SMALLDATETIME NOT NULL,
    updateDate SMALLDATETIME NOT NULL,
    isPublished BIT NOT NULL DEFAULT 0,
    deletedStatusId TINYINT NULL DEFAULT 1,
    CONSTRAINT FK_ChapterPost FOREIGN KEY (postId) REFERENCES Post(id),
    CONSTRAINT FK_ChapterDeletedstatus FOREIGN KEY (deletedStatusId) REFERENCES DeletedStatus(id)
)

CREATE TABLE Comment(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT NULL,
    body VARCHAR(MAX) NOT NULL,
    publishDate SMALLDATETIME NOT NULL,
    updateDate SMALLDATETIME NOT NULL,
    targetPostId INT NULL,
    targetChapterId INT NULL,
    deletedStatusId TINYINT NULL DEFAULT 1,
    CONSTRAINT FK_CommentPost FOREIGN KEY (targetPostId) REFERENCES Post(id),
    CONSTRAINT FK_CommentChapter FOREIGN KEY (targetChapterId) REFERENCES Chapter(id),
    CONSTRAINT FK_CommentAccount FOREIGN KEY (accountId) REFERENCES Account(id),
    CONSTRAINT FK_CommentDeletedstatus FOREIGN KEY (deletedStatusId) REFERENCES DeletedStatus(id)
)

CREATE TABLE Reply(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT NULL,
    commentId INT NOT NULL,
    body VARCHAR(MAX) NOT NULL,
    publishDate SMALLDATETIME NOT NULL,
    updateDate SMALLDATETIME NOT NULL,
    deletedStatusId TINYINT NULL DEFAULT 1,
    CONSTRAINT FK_ReplyAccount FOREIGN KEY (accountId) REFERENCES Account(id),
    CONSTRAINT FK_ReplyComment FOREIGN KEY (commentId) REFERENCES Comment(id),
    CONSTRAINT FK_ReplyDeletedstatus FOREIGN KEY (deletedStatusId) REFERENCES DeletedStatus(id)
)

--Not complete
CREATE TABLE Request(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT NOT NULL,
    title VARCHAR(250) NOT NULL,
    body VARCHAR(MAX) NOT NULL,
    publishDate SMALLDATETIME NOT NULL,
    deletedStatusId TINYINT NULL DEFAULT 1,
    CONSTRAINT FK_RequestAccount FOREIGN KEY (accountId) REFERENCES Account(id),
    CONSTRAINT FK_RequestDeletedstatus FOREIGN KEY (deletedStatusId) REFERENCES DeletedStatus(id)
)


/*---------------------MANY TO MANY------------------------------*/


CREATE TABLE Rate(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT NOT NULL,
    postId INT NOT NULL,
    body FLOAT NOT NULL CHECK (body BETWEEN 1 AND 10),
    CONSTRAINT FK_RateAccount FOREIGN KEY (accountId) REFERENCES Account(id),
    CONSTRAINT FK_RatePost FOREIGN KEY (postId) REFERENCES Post(id)
)

CREATE TABLE Vote(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT NOT NULL,
    body BIT NOT NULL,
    targetPostId INT NULL,
    targetChapterId INT NULL,
    targetCommentId INT NULL,
    targetReplyId INT NULL,
    CONSTRAINT FK_VotePost FOREIGN KEY (targetPostId) REFERENCES Post(id),
    CONSTRAINT FK_VoteChapter FOREIGN KEY (targetChapterId) REFERENCES Chapter(id),
    CONSTRAINT FK_VoteComment FOREIGN KEY (targetCommentId) REFERENCES Comment(id),
    CONSTRAINT FK_VoteReply FOREIGN KEY (targetReplyId) REFERENCES Reply(id),
    CONSTRAINT FK_VoteAccount FOREIGN KEY (accountId) REFERENCES Account(id)
)

CREATE TABLE ChatMessage(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT NULL,
    targetAccountId INT NOT NULL,
    body VARCHAR(MAX) NOT NULL,
    sentDate SMALLDATETIME NOT NULL,
    CONSTRAINT FK_ChatMessageAccount FOREIGN KEY (accountId) REFERENCES Account(id),
    CONSTRAINT FK_ChatMessageTarget FOREIGN KEY (targetAccountId) REFERENCES Account(id)
)

CREATE TABLE SavedPost(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT NOT NULL,
    targetPostId INT NOT NULL,
    saveDate SMALLDATETIME NOT NULL,
    CONSTRAINT FK_SavedpostPost FOREIGN KEY (targetPostId) REFERENCES Post(id),
    CONSTRAINT FK_SavedpostAccount FOREIGN KEY (accountId) REFERENCES Account(id)
)

CREATE TABLE FollowedUser(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT NOT NULL,
    targetAccountId INT NOT NULL,
    CONSTRAINT FK_FolloweduserAccount_target FOREIGN KEY (targetAccountId) REFERENCES Account(id),
    CONSTRAINT FK_FolloweduserAccount FOREIGN KEY (accountId) REFERENCES Account(id)
)

CREATE TABLE PostGift(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT NOT NULL,
    targetPostId INT NOT NULL,
    inventoryItemId INT NOT NULL,
    sentDate SMALLDATETIME NOT NULL,
    CONSTRAINT FK_PostGiftAccount FOREIGN KEY (accountId) REFERENCES Account(id),
    CONSTRAINT FK_PostGiftPost FOREIGN KEY (targetPostId) REFERENCES Post(id),
    CONSTRAINT FK_PostGiftItem FOREIGN KEY (inventoryItemId) REFERENCES InventoryItem(id)
)

CREATE TABLE AccountIPs(
    id INT PRIMARY KEY IDENTITY(1,1),
    accountId INT NOT NULL,
    body VARCHAR(50) NOT NULL
    CONSTRAINT FK_AccountIPsAccount FOREIGN KEY (accountId) REFERENCES Account(id)
)


------------------------------------------
------------------------------------------
------------------------------------------
------------------------------------------


CREATE TABLE PostTags_MM(
    postId INT NOT NULL,
    tagId INT NOT NULL,
    CONSTRAINT [PK_PostTagsMM] PRIMARY KEY ([postId], [tagId]),
    CONSTRAINT FK_PostTagsMM_Post FOREIGN KEY (postId) REFERENCES Post(id),
    CONSTRAINT FK_PostTagsMM_Tag FOREIGN KEY (tagId) REFERENCES Tag(id)
)
CREATE TABLE FanfictionOf_MM(
    postId INT NOT NULL,
    existingStoryId INT NOT NULL,
    CONSTRAINT [PK_FanfictionOfMM] PRIMARY KEY ([postId], [existingStoryId]),
    CONSTRAINT FK_FanfictionOfMM_Post FOREIGN KEY (postId) REFERENCES Post(id),
    CONSTRAINT FK_FanfictionOfMM_EStory FOREIGN KEY (existingStoryId) REFERENCES ExistingStory(id)
)

CREATE TABLE AccountAuthorities_MM(
    accountId INT NOT NULL,
    authorityId INT NOT NULL,
    CONSTRAINT [PK_AccountAuthoritiesMM] PRIMARY KEY ([accountId], [authorityId]),
    CONSTRAINT FK_AccountAuthoritiesMM_Account FOREIGN KEY (accountId) REFERENCES Account(id),
    CONSTRAINT FK_AccountAuthoritiesMM_Authority FOREIGN KEY (authorityId) REFERENCES Authority(id)
)
CREATE TABLE AccountInventory_MM(
    accountId INT NOT NULL,
    inventoryItemId INT NOT NULL,
    CONSTRAINT [PK_AccountInventoryMM] PRIMARY KEY ([accountId], [inventoryItemId]),
    CONSTRAINT FK_AccountInventoryMM_Account FOREIGN KEY (accountId) REFERENCES Account(id),
    CONSTRAINT FK_AccountInventoryMM_InventoryItem FOREIGN KEY (inventoryItemId) REFERENCES InventoryItem(id)
)
CREATE TABLE AccountThemeSelections_MM(
    accountId INT NOT NULL,
    themeId INT NOT NULL,
    themeSelected BIT NULL DEFAULT 0
    CONSTRAINT [PK_AccountThemeSelectionsMM] PRIMARY KEY ([accountId], [themeId]),
    CONSTRAINT FK_AccountThemeSelectionsMM_Account FOREIGN KEY (accountId) REFERENCES Account(id),
    CONSTRAINT FK_AccountThemeSelectionsMM_Theme FOREIGN KEY (themeId) REFERENCES Theme(id)
)


-------------

/*
CREATE TABLE Post_Tag(
    postId INT NOT NULL,
    tagId INT NOT NULL,
    CONSTRAINT [PK_PostTag] PRIMARY KEY ([postId], [tagId]),
    CONSTRAINT FK_PostTag_Post FOREIGN KEY (postId) REFERENCES Post(id),
    CONSTRAINT FK_PostTag_Tag FOREIGN KEY (tagId) REFERENCES Tag(id)
)
CREATE TABLE Post_EStory(
    postId INT NOT NULL,
    existingStoryId INT NOT NULL,
    CONSTRAINT [PK_PostEStory] PRIMARY KEY ([postId], [existingStoryId]),
    CONSTRAINT FK_PostEStory_Post FOREIGN KEY (postId) REFERENCES Post(id),
    CONSTRAINT FK_PostEStory_EStory FOREIGN KEY (existingStoryId) REFERENCES ExistingStory(id)
)

CREATE TABLE Account_Authority(
    accountId INT NOT NULL,
    authorityId INT NOT NULL,
    CONSTRAINT [PK_AccountAuthority] PRIMARY KEY ([accountId], [authorityId]),
    CONSTRAINT FK_AccountAuthority_Account FOREIGN KEY (accountId) REFERENCES Account(id),
    CONSTRAINT FK_AccountAuthority_Authority FOREIGN KEY (authorityId) REFERENCES Authority(id)
)
CREATE TABLE Account_IP(
    accountId INT NOT NULL,
    ipId INT NOT NULL,
    CONSTRAINT [PK_AccountIP] PRIMARY KEY ([accountId], [ipId]),
    CONSTRAINT FK_AccountIP_Account FOREIGN KEY (accountId) REFERENCES Account(id),
    CONSTRAINT FK_AccountIP_IP FOREIGN KEY (ipId) REFERENCES IP(id)
)
CREATE TABLE Account_Inventory(
    accountId INT NOT NULL,
    inventoryItemId INT NOT NULL,
    CONSTRAINT [PK_AccountInventory] PRIMARY KEY ([accountId], [inventoryItemId]),
    CONSTRAINT FK_AccountInventory_Account FOREIGN KEY (accountId) REFERENCES Account(id),
    CONSTRAINT FK_AccountInventory_InventoryItem FOREIGN KEY (inventoryItemId) REFERENCES InventoryItem(id)
)
CREATE TABLE Account_Theme{
    accountId INT NOT NULL,
    themeId INT NOT NULL,
    CONSTRAINT [PK_AccountTheme] PRIMARY KEY ([accountId], [themeId]),
    CONSTRAINT FK_AccountTheme_Account FOREIGN KEY (accountId) REFERENCES Account(id),
    CONSTRAINT FK_AccountTheme_Theme FOREIGN KEY (themeId) REFERENCES Theme(id)
}
*/