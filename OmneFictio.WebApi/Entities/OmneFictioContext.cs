﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace OmneFictio.WebApi.Entities
{
    public partial class OmneFictioContext : DbContext
    {
        public OmneFictioContext()
        {
        }

        public OmneFictioContext(DbContextOptions<OmneFictioContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<AccountIP> AccountIPs { get; set; } = null!;
        public virtual DbSet<AccountThemeSelections_MM> AccountThemeSelections_MMs { get; set; } = null!;
        public virtual DbSet<Authority> Authorities { get; set; } = null!;
        public virtual DbSet<Chapter> Chapters { get; set; } = null!;
        public virtual DbSet<ChatMessage> ChatMessages { get; set; } = null!;
        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<DeletedStatus> DeletedStatuses { get; set; } = null!;
        public virtual DbSet<ExistingStory> ExistingStories { get; set; } = null!;
        public virtual DbSet<ExistingStoryType> ExistingStoryTypes { get; set; } = null!;
        public virtual DbSet<FollowedUser> FollowedUsers { get; set; } = null!;
        public virtual DbSet<InventoryItem> InventoryItems { get; set; } = null!;
        public virtual DbSet<Language> Languages { get; set; } = null!;
        public virtual DbSet<Post> Posts { get; set; } = null!;
        public virtual DbSet<PostGift> PostGifts { get; set; } = null!;
        public virtual DbSet<PostStatus> PostStatuses { get; set; } = null!;
        public virtual DbSet<PostType> PostTypes { get; set; } = null!;
        public virtual DbSet<Preference> Preferences { get; set; } = null!;
        public virtual DbSet<Rate> Rates { get; set; } = null!;
        public virtual DbSet<RatedA> RatedAs { get; set; } = null!;
        public virtual DbSet<Reply> Replies { get; set; } = null!;
        public virtual DbSet<Request> Requests { get; set; } = null!;
        public virtual DbSet<SavedPost> SavedPosts { get; set; } = null!;
        public virtual DbSet<Tag> Tags { get; set; } = null!;
        public virtual DbSet<Theme> Themes { get; set; } = null!;
        public virtual DbSet<Vote> Votes { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-42J9V9H;Database=OmneFictio;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("Account");

                entity.HasIndex(e => e.username, "UQ__Account__F3DBC572F5B16987")
                    .IsUnique();

                entity.Property(e => e.deletedStatusId).HasDefaultValueSql("((1))");

                entity.Property(e => e.displayName)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.email)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.externalId)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.externalType)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('Native')");

                entity.Property(e => e.profilePic)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('user_no_photo.png')");

                entity.Property(e => e.pw)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.selfDesc).IsUnicode(false);

                entity.Property(e => e.username)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.HasOne(d => d.deletedStatus)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.deletedStatusId)
                    .HasConstraintName("FK_AccountDeletedstatus");

                entity.HasMany(d => d.authorities)
                    .WithMany(p => p.accounts)
                    .UsingEntity<Dictionary<string, object>>(
                        "AccountAuthorities_MM",
                        l => l.HasOne<Authority>().WithMany().HasForeignKey("authorityId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_AccountAuthoritiesMM_Authority"),
                        r => r.HasOne<Account>().WithMany().HasForeignKey("accountId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_AccountAuthoritiesMM_Account"),
                        j =>
                        {
                            j.HasKey("accountId", "authorityId").HasName("PK_AccountAuthoritiesMM");

                            j.ToTable("AccountAuthorities_MM");
                        });

                entity.HasMany(d => d.inventoryItems)
                    .WithMany(p => p.accounts)
                    .UsingEntity<Dictionary<string, object>>(
                        "AccountInventory_MM",
                        l => l.HasOne<InventoryItem>().WithMany().HasForeignKey("inventoryItemId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_AccountInventoryMM_InventoryItem"),
                        r => r.HasOne<Account>().WithMany().HasForeignKey("accountId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_AccountInventoryMM_Account"),
                        j =>
                        {
                            j.HasKey("accountId", "inventoryItemId").HasName("PK_AccountInventoryMM");

                            j.ToTable("AccountInventory_MM");
                        });
            });

            modelBuilder.Entity<AccountIP>(entity =>
            {
                entity.Property(e => e.body)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.account)
                    .WithMany(p => p.AccountIPs)
                    .HasForeignKey(d => d.accountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AccountIPsAccount");
            });

            modelBuilder.Entity<AccountThemeSelections_MM>(entity =>
            {
                entity.HasKey(e => new { e.accountId, e.themeId })
                    .HasName("PK_AccountThemeSelectionsMM");

                entity.ToTable("AccountThemeSelections_MM");

                entity.Property(e => e.themeSelected).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.account)
                    .WithMany(p => p.AccountThemeSelections_MMs)
                    .HasForeignKey(d => d.accountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AccountThemeSelectionsMM_Account");

                entity.HasOne(d => d.theme)
                    .WithMany(p => p.AccountThemeSelections_MMs)
                    .HasForeignKey(d => d.themeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AccountThemeSelectionsMM_Theme");
            });

            modelBuilder.Entity<Authority>(entity =>
            {
                entity.ToTable("Authority");

                entity.HasIndex(e => e.code, "UQ__Authorit__357D4CF986FB10D6")
                    .IsUnique();

                entity.Property(e => e.body)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.code)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Chapter>(entity =>
            {
                entity.ToTable("Chapter");

                entity.Property(e => e.authorNoteLater).IsUnicode(false);

                entity.Property(e => e.authorNotePrior).IsUnicode(false);

                entity.Property(e => e.body).IsUnicode(false);

                entity.Property(e => e.deletedStatusId).HasDefaultValueSql("((1))");

                entity.Property(e => e.publishDate).HasColumnType("smalldatetime");

                entity.Property(e => e.title)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.updateDate).HasColumnType("smalldatetime");

                entity.HasOne(d => d.deletedStatus)
                    .WithMany(p => p.Chapters)
                    .HasForeignKey(d => d.deletedStatusId)
                    .HasConstraintName("FK_ChapterDeletedstatus");

                entity.HasOne(d => d.post)
                    .WithMany(p => p.Chapters)
                    .HasForeignKey(d => d.postId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChapterPost");
            });

            modelBuilder.Entity<ChatMessage>(entity =>
            {
                entity.ToTable("ChatMessage");

                entity.Property(e => e.body).IsUnicode(false);

                entity.Property(e => e.sentDate).HasColumnType("smalldatetime");

                entity.HasOne(d => d.account)
                    .WithMany(p => p.ChatMessageaccounts)
                    .HasForeignKey(d => d.accountId)
                    .HasConstraintName("FK_ChatMessageAccount");

                entity.HasOne(d => d.targetAccount)
                    .WithMany(p => p.ChatMessagetargetAccounts)
                    .HasForeignKey(d => d.targetAccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChatMessageTarget");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("Comment");

                entity.Property(e => e.body).IsUnicode(false);

                entity.Property(e => e.deletedStatusId).HasDefaultValueSql("((1))");

                entity.Property(e => e.publishDate).HasColumnType("smalldatetime");

                entity.Property(e => e.updateDate).HasColumnType("smalldatetime");

                entity.HasOne(d => d.account)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.accountId)
                    .HasConstraintName("FK_CommentAccount");

                entity.HasOne(d => d.deletedStatus)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.deletedStatusId)
                    .HasConstraintName("FK_CommentDeletedstatus");

                entity.HasOne(d => d.targetChapter)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.targetChapterId)
                    .HasConstraintName("FK_CommentChapter");

                entity.HasOne(d => d.targetPost)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.targetPostId)
                    .HasConstraintName("FK_CommentPost");
            });

            modelBuilder.Entity<DeletedStatus>(entity =>
            {
                entity.ToTable("DeletedStatus");

                entity.Property(e => e.body)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ExistingStory>(entity =>
            {
                entity.ToTable("ExistingStory");

                entity.Property(e => e.body)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.storyType)
                    .WithMany(p => p.ExistingStories)
                    .HasForeignKey(d => d.storyTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EStoryEStorytype");
            });

            modelBuilder.Entity<ExistingStoryType>(entity =>
            {
                entity.ToTable("ExistingStoryType");

                entity.Property(e => e.id).ValueGeneratedNever();

                entity.Property(e => e.body)
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<FollowedUser>(entity =>
            {
                entity.ToTable("FollowedUser");

                entity.HasOne(d => d.account)
                    .WithMany(p => p.FollowedUseraccounts)
                    .HasForeignKey(d => d.accountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FolloweduserAccount");

                entity.HasOne(d => d.targetAccount)
                    .WithMany(p => p.FollowedUsertargetAccounts)
                    .HasForeignKey(d => d.targetAccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FolloweduserAccount_target");
            });

            modelBuilder.Entity<InventoryItem>(entity =>
            {
                entity.ToTable("InventoryItem");

                entity.HasIndex(e => e.code, "UQ__Inventor__357D4CF95ED6A79B")
                    .IsUnique();

                entity.Property(e => e.body)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.code)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Language>(entity =>
            {
                entity.ToTable("Language");

                entity.HasIndex(e => e.lanCode, "UQ__Language__6F6B672D2CC03E2B")
                    .IsUnique();

                entity.Property(e => e.body).HasMaxLength(140);

                entity.Property(e => e.lanCode).HasMaxLength(15);
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("Post");

                entity.Property(e => e.coverImage).IsUnicode(false);

                entity.Property(e => e.deletedStatusId).HasDefaultValueSql("((1))");

                entity.Property(e => e.postDescription).IsUnicode(false);

                entity.Property(e => e.postStatusId).HasDefaultValueSql("((1))");

                entity.Property(e => e.postTypeId).HasDefaultValueSql("((1))");

                entity.Property(e => e.publishDate).HasColumnType("smalldatetime");

                entity.Property(e => e.ratedAsId).HasDefaultValueSql("((1))");

                entity.Property(e => e.title)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.updateDate).HasColumnType("smalldatetime");

                entity.HasOne(d => d.account)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.accountId)
                    .HasConstraintName("FK_PostAccount");

                entity.HasOne(d => d.deletedStatus)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.deletedStatusId)
                    .HasConstraintName("FK_PostDeletedstatus");

                entity.HasOne(d => d.language)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.languageId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PostLanguage");

                entity.HasOne(d => d.postStatus)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.postStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PostPoststatus");

                entity.HasOne(d => d.postType)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.postTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PostPosttype");

                entity.HasOne(d => d.ratedAs)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.ratedAsId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PostRatedas");

                entity.HasMany(d => d.existingStories)
                    .WithMany(p => p.posts)
                    .UsingEntity<Dictionary<string, object>>(
                        "FanfictionOf_MM",
                        l => l.HasOne<ExistingStory>().WithMany().HasForeignKey("existingStoryId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_FanfictionOfMM_EStory"),
                        r => r.HasOne<Post>().WithMany().HasForeignKey("postId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_FanfictionOfMM_Post"),
                        j =>
                        {
                            j.HasKey("postId", "existingStoryId").HasName("PK_FanfictionOfMM");

                            j.ToTable("FanfictionOf_MM");
                        });

                entity.HasMany(d => d.tags)
                    .WithMany(p => p.posts)
                    .UsingEntity<Dictionary<string, object>>(
                        "PostTags_MM",
                        l => l.HasOne<Tag>().WithMany().HasForeignKey("tagId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_PostTagsMM_Tag"),
                        r => r.HasOne<Post>().WithMany().HasForeignKey("postId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_PostTagsMM_Post"),
                        j =>
                        {
                            j.HasKey("postId", "tagId").HasName("PK_PostTagsMM");

                            j.ToTable("PostTags_MM");
                        });
            });

            modelBuilder.Entity<PostGift>(entity =>
            {
                entity.ToTable("PostGift");

                entity.Property(e => e.sentDate).HasColumnType("smalldatetime");

                entity.HasOne(d => d.account)
                    .WithMany(p => p.PostGifts)
                    .HasForeignKey(d => d.accountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PostGiftAccount");

                entity.HasOne(d => d.inventoryItem)
                    .WithMany(p => p.PostGifts)
                    .HasForeignKey(d => d.inventoryItemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PostGiftItem");

                entity.HasOne(d => d.targetPost)
                    .WithMany(p => p.PostGifts)
                    .HasForeignKey(d => d.targetPostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PostGiftPost");
            });

            modelBuilder.Entity<PostStatus>(entity =>
            {
                entity.ToTable("PostStatus");

                entity.Property(e => e.body)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PostType>(entity =>
            {
                entity.ToTable("PostType");

                entity.Property(e => e.body)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Preference>(entity =>
            {
                entity.ToTable("Preference");

                entity.Property(e => e.accountCardMode).HasDefaultValueSql("((1))");

                entity.Property(e => e.allowAdultContent).HasDefaultValueSql("((0))");

                entity.Property(e => e.postsMasonryDesign).HasDefaultValueSql("((1))");

                entity.HasOne(d => d.account)
                    .WithMany(p => p.Preferences)
                    .HasForeignKey(d => d.accountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PreferenceAccount");

                entity.HasOne(d => d.prefLanguage)
                    .WithMany(p => p.PreferenceprefLanguages)
                    .HasForeignKey(d => d.prefLanguageId)
                    .HasConstraintName("FK_PreferenceLanguage");

                entity.HasOne(d => d.prefLanguageId_2Navigation)
                    .WithMany(p => p.PreferenceprefLanguageId_2Navigations)
                    .HasForeignKey(d => d.prefLanguageId_2)
                    .HasConstraintName("FK_PreferenceLanguage_2");
            });

            modelBuilder.Entity<Rate>(entity =>
            {
                entity.ToTable("Rate");

                entity.HasOne(d => d.account)
                    .WithMany(p => p.Rates)
                    .HasForeignKey(d => d.accountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RateAccount");

                entity.HasOne(d => d.post)
                    .WithMany(p => p.Rates)
                    .HasForeignKey(d => d.postId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RatePost");
            });

            modelBuilder.Entity<RatedA>(entity =>
            {
                entity.Property(e => e.id).ValueGeneratedNever();

                entity.Property(e => e.body)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Reply>(entity =>
            {
                entity.ToTable("Reply");

                entity.Property(e => e.body).IsUnicode(false);

                entity.Property(e => e.deletedStatusId).HasDefaultValueSql("((1))");

                entity.Property(e => e.publishDate).HasColumnType("smalldatetime");

                entity.Property(e => e.updateDate).HasColumnType("smalldatetime");

                entity.HasOne(d => d.account)
                    .WithMany(p => p.Replies)
                    .HasForeignKey(d => d.accountId)
                    .HasConstraintName("FK_ReplyAccount");

                entity.HasOne(d => d.comment)
                    .WithMany(p => p.Replies)
                    .HasForeignKey(d => d.commentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ReplyComment");

                entity.HasOne(d => d.deletedStatus)
                    .WithMany(p => p.Replies)
                    .HasForeignKey(d => d.deletedStatusId)
                    .HasConstraintName("FK_ReplyDeletedstatus");
            });

            modelBuilder.Entity<Request>(entity =>
            {
                entity.ToTable("Request");

                entity.Property(e => e.body).IsUnicode(false);

                entity.Property(e => e.deletedStatusId).HasDefaultValueSql("((1))");

                entity.Property(e => e.publishDate).HasColumnType("smalldatetime");

                entity.Property(e => e.title)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.account)
                    .WithMany(p => p.Requests)
                    .HasForeignKey(d => d.accountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RequestAccount");

                entity.HasOne(d => d.deletedStatus)
                    .WithMany(p => p.Requests)
                    .HasForeignKey(d => d.deletedStatusId)
                    .HasConstraintName("FK_RequestDeletedstatus");
            });

            modelBuilder.Entity<SavedPost>(entity =>
            {
                entity.ToTable("SavedPost");

                entity.Property(e => e.saveDate).HasColumnType("smalldatetime");

                entity.HasOne(d => d.account)
                    .WithMany(p => p.SavedPosts)
                    .HasForeignKey(d => d.accountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SavedpostAccount");

                entity.HasOne(d => d.targetPost)
                    .WithMany(p => p.SavedPosts)
                    .HasForeignKey(d => d.targetPostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SavedpostPost");
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.ToTable("Tag");

                entity.HasIndex(e => e.body, "UQ__Tag__5525AE91D35D8C0F")
                    .IsUnique();

                entity.Property(e => e.body)
                    .HasMaxLength(60)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Theme>(entity =>
            {
                entity.ToTable("Theme");

                entity.HasIndex(e => e.code, "UQ__Theme__357D4CF981620ECC")
                    .IsUnique();

                entity.Property(e => e.code)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.themeDescription).IsUnicode(false);

                entity.Property(e => e.title)
                    .HasMaxLength(60)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Vote>(entity =>
            {
                entity.ToTable("Vote");

                entity.HasOne(d => d.account)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.accountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_VoteAccount");

                entity.HasOne(d => d.targetChapter)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.targetChapterId)
                    .HasConstraintName("FK_VoteChapter");

                entity.HasOne(d => d.targetComment)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.targetCommentId)
                    .HasConstraintName("FK_VoteComment");

                entity.HasOne(d => d.targetPost)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.targetPostId)
                    .HasConstraintName("FK_VotePost");

                entity.HasOne(d => d.targetReply)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.targetReplyId)
                    .HasConstraintName("FK_VoteReply");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
