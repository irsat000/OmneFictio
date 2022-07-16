﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace OmneFictio.MinApi.Models
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
        public virtual DbSet<Authority> Authorities { get; set; } = null!;
        public virtual DbSet<Chapter> Chapters { get; set; } = null!;
        public virtual DbSet<ChatMessage> ChatMessages { get; set; } = null!;
        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<DeletedStatus> DeletedStatuses { get; set; } = null!;
        public virtual DbSet<ExistingStory> ExistingStories { get; set; } = null!;
        public virtual DbSet<Gift> Gifts { get; set; } = null!;
        public virtual DbSet<GiftItem> GiftItems { get; set; } = null!;
        public virtual DbSet<Ip> Ips { get; set; } = null!;
        public virtual DbSet<Language> Languages { get; set; } = null!;
        public virtual DbSet<Post> Posts { get; set; } = null!;
        public virtual DbSet<PostStatus> PostStatuses { get; set; } = null!;
        public virtual DbSet<PostType> PostTypes { get; set; } = null!;
        public virtual DbSet<Rate> Rates { get; set; } = null!;
        public virtual DbSet<RatedA> RatedAs { get; set; } = null!;
        public virtual DbSet<Reply> Replies { get; set; } = null!;
        public virtual DbSet<StoryType> StoryTypes { get; set; } = null!;
        public virtual DbSet<Tag> Tags { get; set; } = null!;
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

                entity.HasIndex(e => e.Username, "UQ__Account__F3DBC572FA8E9E08")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AllowSexual)
                    .HasColumnName("allowSexual")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.AllowViolence)
                    .HasColumnName("allowViolence")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.DeletedStatusId)
                    .HasColumnName("deletedStatusId")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Email)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.EmailValid)
                    .HasColumnName("emailValid")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Gold)
                    .HasColumnName("gold")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.PrefLanguageId).HasColumnName("prefLanguageId");

                entity.Property(e => e.ProfilePic)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("profilePic")
                    .HasDefaultValueSql("('noppic.jpg')");

                entity.Property(e => e.Pw)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("pw");

                entity.Property(e => e.SelfDesc)
                    .IsUnicode(false)
                    .HasColumnName("selfDesc")
                    .HasDefaultValueSql("('I am lazy because I didnt change my description. Or I dont care enough who knows.')");

                entity.Property(e => e.Username)
                    .HasMaxLength(60)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.HasOne(d => d.DeletedStatus)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.DeletedStatusId)
                    .HasConstraintName("FK_AccountDeletedstatus");

                entity.HasOne(d => d.PrefLanguage)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.PrefLanguageId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_UserLanguage");

                entity.HasMany(d => d.Authorities)
                    .WithMany(p => p.Accounts)
                    .UsingEntity<Dictionary<string, object>>(
                        "AccountAuthority",
                        l => l.HasOne<Authority>().WithMany().HasForeignKey("AuthorityId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_AccountAuthority_Authority"),
                        r => r.HasOne<Account>().WithMany().HasForeignKey("AccountId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_AccountAuthority_Account"),
                        j =>
                        {
                            j.HasKey("AccountId", "AuthorityId").HasName("PK_AccountAuthority");

                            j.ToTable("Account_Authority");

                            j.IndexerProperty<int>("AccountId").HasColumnName("accountId");

                            j.IndexerProperty<int>("AuthorityId").HasColumnName("authorityId");
                        });

                entity.HasMany(d => d.Ips)
                    .WithMany(p => p.Accounts)
                    .UsingEntity<Dictionary<string, object>>(
                        "AccountIp",
                        l => l.HasOne<Ip>().WithMany().HasForeignKey("IpId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_AccountIP_IP"),
                        r => r.HasOne<Account>().WithMany().HasForeignKey("AccountId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_AccountIP_Account"),
                        j =>
                        {
                            j.HasKey("AccountId", "IpId").HasName("PK_AccountIP");

                            j.ToTable("Account_IP");

                            j.IndexerProperty<int>("AccountId").HasColumnName("accountId");

                            j.IndexerProperty<int>("IpId").HasColumnName("ipId");
                        });
            });

            modelBuilder.Entity<Authority>(entity =>
            {
                entity.ToTable("Authority");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Body)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("body");
            });

            modelBuilder.Entity<Chapter>(entity =>
            {
                entity.ToTable("Chapter");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Body)
                    .IsUnicode(false)
                    .HasColumnName("body");

                entity.Property(e => e.ChapterIndex).HasColumnName("chapterIndex");

                entity.Property(e => e.PostId).HasColumnName("postId");

                entity.Property(e => e.PublishDate)
                    .HasColumnType("smalldatetime")
                    .HasColumnName("publishDate");

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("smalldatetime")
                    .HasColumnName("updateDate");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.Chapters)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_ChapterPost");
            });

            modelBuilder.Entity<ChatMessage>(entity =>
            {
                entity.ToTable("ChatMessage");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.Body)
                    .IsUnicode(false)
                    .HasColumnName("body");

                entity.Property(e => e.SentDate)
                    .HasColumnType("smalldatetime")
                    .HasColumnName("sentDate");

                entity.Property(e => e.TargetAccountId).HasColumnName("targetAccountId");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.ChatMessageAccounts)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK_ChatMessageAccount");

                entity.HasOne(d => d.TargetAccount)
                    .WithMany(p => p.ChatMessageTargetAccounts)
                    .HasForeignKey(d => d.TargetAccountId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_ChatMessageTarget");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("Comment");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.Body)
                    .IsUnicode(false)
                    .HasColumnName("body");

                entity.Property(e => e.DeletedStatusId)
                    .HasColumnName("deletedStatusId")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.PublishDate)
                    .HasColumnType("smalldatetime")
                    .HasColumnName("publishDate");

                entity.Property(e => e.TargetChapterId).HasColumnName("targetChapterId");

                entity.Property(e => e.TargetPostId).HasColumnName("targetPostId");

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("smalldatetime")
                    .HasColumnName("updateDate");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_CommentAccount");

                entity.HasOne(d => d.DeletedStatus)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.DeletedStatusId)
                    .HasConstraintName("FK_CommentDeletedstatus");

                entity.HasOne(d => d.TargetChapter)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.TargetChapterId)
                    .HasConstraintName("FK_CommentChapter");

                entity.HasOne(d => d.TargetPost)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.TargetPostId)
                    .HasConstraintName("FK_CommentPost");
            });

            modelBuilder.Entity<DeletedStatus>(entity =>
            {
                entity.ToTable("DeletedStatus");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Body)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("body");
            });

            modelBuilder.Entity<ExistingStory>(entity =>
            {
                entity.ToTable("ExistingStory");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Body)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("body");

                entity.Property(e => e.FirstLetter)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("firstLetter")
                    .IsFixedLength();

                entity.Property(e => e.StoryTypeId).HasColumnName("storyTypeId");

                entity.HasOne(d => d.StoryType)
                    .WithMany(p => p.ExistingStories)
                    .HasForeignKey(d => d.StoryTypeId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_ExistingstoryStorytype");
            });

            modelBuilder.Entity<Gift>(entity =>
            {
                entity.ToTable("Gift");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.GiftItemId).HasColumnName("giftItemId");

                entity.Property(e => e.TargetPostId).HasColumnName("targetPostId");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Gifts)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK_GiftAccount");

                entity.HasOne(d => d.GiftItem)
                    .WithMany(p => p.Gifts)
                    .HasForeignKey(d => d.GiftItemId)
                    .HasConstraintName("FK_GiftGiftitem");

                entity.HasOne(d => d.TargetPost)
                    .WithMany(p => p.Gifts)
                    .HasForeignKey(d => d.TargetPostId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_GiftTargetpost");
            });

            modelBuilder.Entity<GiftItem>(entity =>
            {
                entity.ToTable("GiftItem");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Body)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("body");
            });

            modelBuilder.Entity<Ip>(entity =>
            {
                entity.ToTable("IP");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Body)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("body");
            });

            modelBuilder.Entity<Language>(entity =>
            {
                entity.ToTable("Language");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Body)
                    .HasMaxLength(60)
                    .IsUnicode(false)
                    .HasColumnName("body");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("Post");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.DeletedStatusId)
                    .HasColumnName("deletedStatusId")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.LanguageId).HasColumnName("languageId");

                entity.Property(e => e.PostDescription)
                    .IsUnicode(false)
                    .HasColumnName("postDescription");

                entity.Property(e => e.PostStatusId)
                    .HasColumnName("postStatusId")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.PostTypeId)
                    .HasColumnName("postTypeId")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.PublishDate)
                    .HasColumnType("smalldatetime")
                    .HasColumnName("publishDate");

                entity.Property(e => e.Title)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("title");

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("smalldatetime")
                    .HasColumnName("updateDate");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_PostAccount");

                entity.HasOne(d => d.DeletedStatus)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.DeletedStatusId)
                    .HasConstraintName("FK_PostDeletedstatus");

                entity.HasOne(d => d.Language)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.LanguageId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_PostLanguage");

                entity.HasOne(d => d.PostStatus)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.PostStatusId)
                    .HasConstraintName("FK_PostPoststatus");

                entity.HasOne(d => d.PostType)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.PostTypeId)
                    .HasConstraintName("FK_PostPosttype");

                entity.HasMany(d => d.ExistingStories)
                    .WithMany(p => p.Posts)
                    .UsingEntity<Dictionary<string, object>>(
                        "PostEstory",
                        l => l.HasOne<ExistingStory>().WithMany().HasForeignKey("ExistingStoryId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_PostEStory_EStory"),
                        r => r.HasOne<Post>().WithMany().HasForeignKey("PostId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_PostEStory_Post"),
                        j =>
                        {
                            j.HasKey("PostId", "ExistingStoryId").HasName("PK_PostEStory");

                            j.ToTable("Post_EStory");

                            j.IndexerProperty<int>("PostId").HasColumnName("postId");

                            j.IndexerProperty<int>("ExistingStoryId").HasColumnName("existingStoryId");
                        });

                entity.HasMany(d => d.RatedAs)
                    .WithMany(p => p.Posts)
                    .UsingEntity<Dictionary<string, object>>(
                        "PostRatedA",
                        l => l.HasOne<RatedA>().WithMany().HasForeignKey("RatedAsId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_PostRatedas_RatedAs"),
                        r => r.HasOne<Post>().WithMany().HasForeignKey("PostId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_PostRatedas_Post"),
                        j =>
                        {
                            j.HasKey("PostId", "RatedAsId").HasName("PK_PostRatedAs");

                            j.ToTable("Post_RatedAs");

                            j.IndexerProperty<int>("PostId").HasColumnName("postId");

                            j.IndexerProperty<int>("RatedAsId").HasColumnName("ratedAsId");
                        });

                entity.HasMany(d => d.Tags)
                    .WithMany(p => p.Posts)
                    .UsingEntity<Dictionary<string, object>>(
                        "PostTag",
                        l => l.HasOne<Tag>().WithMany().HasForeignKey("TagId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_PostTag_Tag"),
                        r => r.HasOne<Post>().WithMany().HasForeignKey("PostId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_PostTag_Post"),
                        j =>
                        {
                            j.HasKey("PostId", "TagId").HasName("PK_PostTag");

                            j.ToTable("Post_Tag");

                            j.IndexerProperty<int>("PostId").HasColumnName("postId");

                            j.IndexerProperty<int>("TagId").HasColumnName("tagId");
                        });
            });

            modelBuilder.Entity<PostStatus>(entity =>
            {
                entity.ToTable("PostStatus");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Body)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("body");
            });

            modelBuilder.Entity<PostType>(entity =>
            {
                entity.ToTable("PostType");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Body)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("body");
            });

            modelBuilder.Entity<Rate>(entity =>
            {
                entity.ToTable("Rate");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.PostId).HasColumnName("postId");

                entity.Property(e => e.Rate1).HasColumnName("rate");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Rates)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_RateAccount");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.Rates)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_RatePost");
            });

            modelBuilder.Entity<RatedA>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Body)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("body");
            });

            modelBuilder.Entity<Reply>(entity =>
            {
                entity.ToTable("Reply");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.Body)
                    .IsUnicode(false)
                    .HasColumnName("body");

                entity.Property(e => e.CommentId).HasColumnName("commentId");

                entity.Property(e => e.DeletedStatusId)
                    .HasColumnName("deletedStatusId")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.PublishDate)
                    .HasColumnType("smalldatetime")
                    .HasColumnName("publishDate");

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("smalldatetime")
                    .HasColumnName("updateDate");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Replies)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_ReplyAccount");

                entity.HasOne(d => d.Comment)
                    .WithMany(p => p.Replies)
                    .HasForeignKey(d => d.CommentId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_ReplyComment");

                entity.HasOne(d => d.DeletedStatus)
                    .WithMany(p => p.Replies)
                    .HasForeignKey(d => d.DeletedStatusId)
                    .HasConstraintName("FK_ReplyDeletedstatus");
            });

            modelBuilder.Entity<StoryType>(entity =>
            {
                entity.ToTable("StoryType");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Body)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("body");
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.ToTable("Tag");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Body)
                    .HasMaxLength(60)
                    .IsUnicode(false)
                    .HasColumnName("body");
            });

            modelBuilder.Entity<Vote>(entity =>
            {
                entity.ToTable("Vote");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.TargetChapterId).HasColumnName("targetChapterId");

                entity.Property(e => e.TargetCommentId).HasColumnName("targetCommentId");

                entity.Property(e => e.TargetPostId).HasColumnName("targetPostId");

                entity.Property(e => e.TargetReplyId).HasColumnName("targetReplyId");

                entity.Property(e => e.Vote1).HasColumnName("vote");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_VoteAccount");

                entity.HasOne(d => d.TargetChapter)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.TargetChapterId)
                    .HasConstraintName("FK_VoteChapter");

                entity.HasOne(d => d.TargetComment)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.TargetCommentId)
                    .HasConstraintName("FK_VoteComment");

                entity.HasOne(d => d.TargetPost)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.TargetPostId)
                    .HasConstraintName("FK_VotePost");

                entity.HasOne(d => d.TargetReply)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.TargetReplyId)
                    .HasConstraintName("FK_VoteReply");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
