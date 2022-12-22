USE OmneFictio

GO
CREATE TRIGGER DeletedStatus_OnDelete ON DeletedStatus FOR DELETE
AS
BEGIN
    DECLARE @Id AS INT;
    SET @Id = (SELECT id FROM deleted);

    UPDATE Account SET deletedStatusId = NULL WHERE deletedStatusId = @Id;
    UPDATE Post SET deletedStatusId = NULL WHERE deletedStatusId = @Id;
    UPDATE Chapter SET deletedStatusId = NULL WHERE deletedStatusId = @Id;
    UPDATE Comment SET deletedStatusId = NULL WHERE deletedStatusId = @Id;
    UPDATE Reply SET deletedStatusId = NULL WHERE deletedStatusId = @Id;
    UPDATE Request SET deletedStatusId = NULL WHERE deletedStatusId = @Id;
END

GO
CREATE TRIGGER DeletedStatus_OnUpdate ON DeletedStatus AFTER UPDATE
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM DELETED WHERE id <> (SELECT id FROM INSERTED))
    BEGIN
        RETURN
    END
    DECLARE @OldId AS INT;
    SET @OldId = (SELECT id FROM deleted);
    DECLARE @NewId AS INT;
    SET @NewId = (SELECT id FROM inserted);

    UPDATE Account SET deletedStatusId = @NewId WHERE deletedStatusId = @OldId;
    UPDATE Post SET deletedStatusId = @NewId WHERE deletedStatusId = @OldId;
    UPDATE Chapter SET deletedStatusId = @NewId WHERE deletedStatusId = @OldId;
    UPDATE Comment SET deletedStatusId = @NewId WHERE deletedStatusId = @OldId;
    UPDATE Reply SET deletedStatusId = @NewId WHERE deletedStatusId = @OldId;
    UPDATE Request SET deletedStatusId = @NewId WHERE deletedStatusId = @OldId;
END

--------------------------------------------------------------------

/*There shouldn't be a delete trigger for this*/
GO
CREATE TRIGGER PostType_OnUpdate ON PostType AFTER UPDATE
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM DELETED WHERE id <> (SELECT id FROM INSERTED))
    BEGIN
        RETURN
    END
    DECLARE @OldId AS INT;
    SET @OldId = (SELECT id FROM deleted);
    DECLARE @NewId AS INT;
    SET @NewId = (SELECT id FROM inserted);
    
    UPDATE Post SET postTypeId = @NewId WHERE postTypeId = @OldId;
END

--------------------------------------------------------------------

/*There shouldn't be a delete trigger for this*/
GO
CREATE TRIGGER PostStatus_OnUpdate ON PostStatus AFTER UPDATE
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM DELETED WHERE id <> (SELECT id FROM INSERTED))
    BEGIN
        RETURN
    END
    DECLARE @OldId AS INT;
    SET @OldId = (SELECT id FROM deleted);
    DECLARE @NewId AS INT;
    SET @NewId = (SELECT id FROM inserted);
    
    UPDATE Post SET postStatusId = @NewId WHERE postStatusId = @OldId;
END

--------------------------------------------------------------------

/*There shouldn't be a delete trigger for this*/
GO
CREATE TRIGGER RatedAs_OnUpdate ON RatedAs AFTER UPDATE
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM DELETED WHERE id <> (SELECT id FROM INSERTED))
    BEGIN
        RETURN
    END
    DECLARE @OldId AS INT;
    SET @OldId = (SELECT id FROM deleted);
    DECLARE @NewId AS INT;
    SET @NewId = (SELECT id FROM inserted);
    
    UPDATE Post SET ratedAsId = @NewId WHERE ratedAsId = @OldId;
END

--------------------------------------------------------------------

/*There shouldn't be a delete trigger for this*/
GO
CREATE TRIGGER ExistingStoryType_OnUpdate ON ExistingStoryType AFTER UPDATE
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM DELETED WHERE id <> (SELECT id FROM INSERTED))
    BEGIN
        RETURN
    END
    DECLARE @OldId AS INT;
    SET @OldId = (SELECT id FROM deleted);
    DECLARE @NewId AS INT;
    SET @NewId = (SELECT id FROM inserted);
    
    UPDATE ExistingStory SET storyTypeId = @NewId WHERE storyTypeId = @OldId;
END



--------------------------------------------------------------------
--------------------------------------------------------------------
--------------------------------------------------------------------



GO
CREATE TRIGGER Language_OnDelete ON Language FOR DELETE
AS
BEGIN
    DECLARE @Id AS INT;
    SET @Id = (SELECT id FROM deleted);
    
    UPDATE Preference SET prefLanguageId = NULL WHERE prefLanguageId = @Id;
    UPDATE Preference SET prefLanguageId_2 = NULL WHERE prefLanguageId_2 = @Id;
    UPDATE Post SET languageId = NULL WHERE languageId = @Id;
END

GO
CREATE TRIGGER Language_OnUpdate ON Language AFTER UPDATE
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM DELETED WHERE id <> (SELECT id FROM INSERTED))
    BEGIN
        RETURN
    END
    DECLARE @OldId AS INT;
    SET @OldId = (SELECT id FROM deleted);
    DECLARE @NewId AS INT;
    SET @NewId = (SELECT id FROM inserted);
    
    UPDATE Preference SET prefLanguageId = @NewId WHERE prefLanguageId = @OldId;
    UPDATE Preference SET prefLanguageId_2 = @NewId WHERE prefLanguageId_2 = @OldId;
    UPDATE Post SET languageId = @NewId WHERE languageId = @OldId;
END

--------------------------------------------------------------------

GO
CREATE TRIGGER Tag_OnDelete ON Tag FOR DELETE
AS
BEGIN
    DECLARE @Id AS INT;
    SET @Id = (SELECT id FROM deleted);

    DELETE FROM PostTags_MM WHERE tagId = @Id;
END

GO
CREATE TRIGGER Tag_OnUpdate ON Tag AFTER UPDATE
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM DELETED WHERE id <> (SELECT id FROM INSERTED))
    BEGIN
        RETURN
    END
    DECLARE @OldId AS INT;
    SET @OldId = (SELECT id FROM deleted);
    DECLARE @NewId AS INT;
    SET @NewId = (SELECT id FROM inserted);
    
    UPDATE PostTags_MM SET tagId = @NewId WHERE tagId = @OldId;
END

--------------------------------------------------------------------

GO
CREATE TRIGGER Authority_OnDelete ON Authority FOR DELETE
AS
BEGIN
    DECLARE @Id AS INT;
    SET @Id = (SELECT id FROM deleted);
    
    DELETE FROM AccountAuthorities_MM WHERE authorityId = @Id;
END

GO
CREATE TRIGGER Authority_OnUpdate ON Authority AFTER UPDATE
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM DELETED WHERE id <> (SELECT id FROM INSERTED))
    BEGIN
        RETURN
    END
    DECLARE @OldId AS INT;
    SET @OldId = (SELECT id FROM deleted);
    DECLARE @NewId AS INT;
    SET @NewId = (SELECT id FROM inserted);
    
    UPDATE AccountAuthorities_MM SET authorityId = @NewId WHERE authorityId = @OldId;
END

--------------------------------------------------------------------

GO
CREATE TRIGGER InventoryItem_OnDelete ON InventoryItem FOR DELETE
AS
BEGIN
    DECLARE @Id AS INT;
    SET @Id = (SELECT id FROM deleted);

    DELETE FROM PostGift WHERE inventoryItemId = @Id;
    DELETE FROM AccountInventory_MM WHERE inventoryItemId = @Id;
END

GO
CREATE TRIGGER InventoryItem_OnUpdate ON InventoryItem AFTER UPDATE
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM DELETED WHERE id <> (SELECT id FROM INSERTED))
    BEGIN
        RETURN
    END
    DECLARE @OldId AS INT;
    SET @OldId = (SELECT id FROM deleted);
    DECLARE @NewId AS INT;
    SET @NewId = (SELECT id FROM inserted);
    
    UPDATE PostGift SET inventoryItemId = @NewId WHERE inventoryItemId = @OldId;
    UPDATE AccountInventory_MM SET inventoryItemId = @NewId WHERE inventoryItemId = @OldId;
END

--------------------------------------------------------------------

GO
CREATE TRIGGER Theme_OnDelete ON Theme FOR DELETE
AS
BEGIN
    DECLARE @Id AS INT;
    SET @Id = (SELECT id FROM deleted);
    
    DELETE FROM AccountThemeSelections_MM WHERE themeId = @Id;
END

GO
CREATE TRIGGER Theme_OnUpdate ON Theme AFTER UPDATE
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM DELETED WHERE id <> (SELECT id FROM INSERTED))
    BEGIN
        RETURN
    END
    DECLARE @OldId AS INT;
    SET @OldId = (SELECT id FROM deleted);
    DECLARE @NewId AS INT;
    SET @NewId = (SELECT id FROM inserted);
    
    UPDATE AccountThemeSelections_MM SET themeId = @NewId WHERE themeId = @OldId;
END

--------------------------------------------------------------------

GO
CREATE TRIGGER ExistingStory_OnDelete ON ExistingStory FOR DELETE
AS
BEGIN
    DECLARE @Id AS INT;
    SET @Id = (SELECT id FROM deleted);
    
    DELETE FROM FanfictionOf_MM WHERE existingStoryId = @Id;
END

GO
CREATE TRIGGER ExistingStory_OnUpdate ON ExistingStory AFTER UPDATE
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM DELETED WHERE id <> (SELECT id FROM INSERTED))
    BEGIN
        RETURN
    END
    DECLARE @OldId AS INT;
    SET @OldId = (SELECT id FROM deleted);
    DECLARE @NewId AS INT;
    SET @NewId = (SELECT id FROM inserted);
    
    UPDATE FanfictionOf_MM SET existingStoryId = @NewId WHERE existingStoryId = @OldId;
END




--------------------------------------------------------------------
--------------------------------------------------------------------
--------------------------------------------------------------------




GO
CREATE TRIGGER Account_OnDelete ON Account FOR DELETE
AS
BEGIN
    DECLARE @Id AS INT;
    SET @Id = (SELECT id FROM deleted);

    DELETE FROM Rate WHERE accountId = @Id;
    DELETE FROM Vote WHERE accountId = @Id;
    DELETE FROM Rate WHERE accountId = @Id;
    DELETE FROM SavedPost WHERE accountId = @Id;
    DELETE FROM FollowedUser WHERE accountId = @Id;
    DELETE FROM Request WHERE accountId = @Id;
    
    DELETE FROM AccountAuthorities_MM WHERE accountId = @Id;
    DELETE FROM AccountIPs WHERE accountId = @Id;
    DELETE FROM AccountInventory_MM WHERE accountId = @Id;

    DELETE FROM Preference WHERE accountId = @Id;
    UPDATE Post SET accountId = NULL WHERE accountId = @Id;
    UPDATE Comment SET accountId = NULL WHERE accountId = @Id;
    UPDATE Reply SET accountId = NULL WHERE accountId = @Id;
    UPDATE ChatMessage SET accountId = NULL WHERE accountId = @Id;
END

GO
CREATE TRIGGER Account_OnUpdate ON Account AFTER UPDATE
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM DELETED WHERE id <> (SELECT id FROM INSERTED))
    BEGIN
        RETURN
    END
    DECLARE @OldId AS INT;
    SET @OldId = (SELECT id FROM deleted);
    DECLARE @NewId AS INT;
    SET @NewId = (SELECT id FROM inserted);

    UPDATE Rate SET accountId = @NewId WHERE accountId = @OldId;
    UPDATE Vote SET accountId = @NewId WHERE accountId = @OldId;
    UPDATE SavedPost SET accountId = @NewId WHERE accountId = @OldId;
    UPDATE FollowedUser SET accountId = @NewId WHERE accountId = @OldId;
    UPDATE Request SET accountId = @NewId WHERE accountId = @OldId;
    
    UPDATE AccountAuthorities_MM SET accountId = @NewId WHERE accountId = @OldId;
    UPDATE AccountIPs SET accountId = @NewId WHERE accountId = @OldId;
    UPDATE AccountInventory_MM SET accountId = @NewId WHERE accountId = @OldId;

    UPDATE Preference SET accountId = @NewId WHERE accountId = @OldId;
    UPDATE Post SET accountId = @NewId WHERE accountId = @OldId;
    UPDATE Comment SET accountId = @NewId WHERE accountId = @OldId;
    UPDATE Reply SET accountId = @NewId WHERE accountId = @OldId;
    UPDATE ChatMessage SET accountId = @NewId WHERE accountId = @OldId;
END
--Preferences will not be deleted or updated
--------------------------------------------------------------------

GO
CREATE TRIGGER Post_OnDelete ON Post FOR DELETE
AS
BEGIN
    DECLARE @Id AS INT;
    SET @Id = (SELECT id FROM deleted);
    
    DELETE FROM Chapter WHERE postId = @Id;
    DELETE FROM Comment WHERE targetPostId = @Id;
    DELETE FROM Rate WHERE postId = @Id;
    DELETE FROM Vote WHERE targetPostId = @Id;
    DELETE FROM SavedPost WHERE targetPostId = @Id;
    DELETE FROM PostGift WHERE targetPostId = @Id;
    DELETE FROM PostTags_MM WHERE postId = @Id;
    DELETE FROM FanfictionOf_MM WHERE postId = @Id;
END

GO
CREATE TRIGGER Post_OnUpdate ON Post AFTER UPDATE
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM DELETED WHERE id <> (SELECT id FROM INSERTED))
    BEGIN
        RETURN
    END
    DECLARE @OldId AS INT;
    SET @OldId = (SELECT id FROM deleted);
    DECLARE @NewId AS INT;
    SET @NewId = (SELECT id FROM inserted);
    
    UPDATE Chapter SET postId = @NewId WHERE postId = @OldId;
    UPDATE Comment SET targetPostId = @NewId WHERE targetPostId = @OldId;
    UPDATE Rate SET postId = @NewId WHERE postId = @OldId;
    UPDATE Vote SET targetPostId = @NewId WHERE targetPostId = @OldId;
    UPDATE SavedPost SET targetPostId = @NewId WHERE targetPostId = @OldId;
    UPDATE PostGift SET targetPostId = @NewId WHERE targetPostId = @OldId;
    UPDATE PostTags_MM SET postId = @NewId WHERE postId = @OldId;
    UPDATE FanfictionOf_MM SET postId = @NewId WHERE postId = @OldId;
END

--------------------------------------------------------------------

GO
CREATE TRIGGER Chapter_OnDelete ON Chapter FOR DELETE
AS
BEGIN
    DECLARE @Id AS INT;
    SET @Id = (SELECT id FROM deleted);
    
    DELETE FROM Comment WHERE targetChapterId = @Id;
    DELETE FROM Vote WHERE targetChapterId = @Id;
END

GO
CREATE TRIGGER Chapter_OnUpdate ON Chapter AFTER UPDATE
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM DELETED WHERE id <> (SELECT id FROM INSERTED))
    BEGIN
        RETURN
    END
    DECLARE @OldId AS INT;
    SET @OldId = (SELECT id FROM deleted);
    DECLARE @NewId AS INT;
    SET @NewId = (SELECT id FROM inserted);
    
    UPDATE Comment SET targetChapterId = @NewId WHERE targetChapterId = @OldId;
    UPDATE Vote SET targetChapterId = @NewId WHERE targetChapterId = @OldId;
END

--------------------------------------------------------------------

GO
CREATE TRIGGER Comment_OnDelete ON Comment FOR DELETE
AS
BEGIN
    DECLARE @Id AS INT;
    SET @Id = (SELECT id FROM deleted);
    
    DELETE FROM Reply WHERE commentId = @Id;
    DELETE FROM Vote WHERE targetCommentId = @Id;
END

GO
CREATE TRIGGER Comment_OnUpdate ON Comment AFTER UPDATE
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM DELETED WHERE id <> (SELECT id FROM INSERTED))
    BEGIN
        RETURN
    END
    DECLARE @OldId AS INT;
    SET @OldId = (SELECT id FROM deleted);
    DECLARE @NewId AS INT;
    SET @NewId = (SELECT id FROM inserted);
    
    UPDATE Reply SET commentId = @NewId WHERE commentId = @OldId;
    UPDATE Vote SET targetCommentId = @NewId WHERE targetCommentId = @OldId;
END

--------------------------------------------------------------------

GO
CREATE TRIGGER Reply_OnDelete ON Reply FOR DELETE
AS
BEGIN
    DECLARE @Id AS INT;
    SET @Id = (SELECT id FROM deleted);
    
    DELETE FROM Vote WHERE targetReplyId = @Id;
END

GO
CREATE TRIGGER Reply_OnUpdate ON Reply AFTER UPDATE
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM DELETED WHERE id <> (SELECT id FROM INSERTED))
    BEGIN
        RETURN
    END
    DECLARE @OldId AS INT;
    SET @OldId = (SELECT id FROM deleted);
    DECLARE @NewId AS INT;
    SET @NewId = (SELECT id FROM inserted);
    
    UPDATE Vote SET targetReplyId = @NewId WHERE targetReplyId = @OldId;
END