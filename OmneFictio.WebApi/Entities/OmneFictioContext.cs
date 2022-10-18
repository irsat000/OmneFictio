using System;
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
        public virtual DbSet<Authority> Authorities { get; set; } = null!;
        public virtual DbSet<Chapter> Chapters { get; set; } = null!;
        public virtual DbSet<ChatMessage> ChatMessages { get; set; } = null!;
        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<DeletedStatus> DeletedStatuses { get; set; } = null!;
        public virtual DbSet<ExistingStory> ExistingStories { get; set; } = null!;
        public virtual DbSet<ExistingStoryType> ExistingStoryTypes { get; set; } = null!;
        public virtual DbSet<IP> IPs { get; set; } = null!;
        public virtual DbSet<InventoryItem> InventoryItems { get; set; } = null!;
        public virtual DbSet<Language> Languages { get; set; } = null!;
        public virtual DbSet<Post> Posts { get; set; } = null!;
        public virtual DbSet<PostGift> PostGifts { get; set; } = null!;
        public virtual DbSet<PostStatus> PostStatuses { get; set; } = null!;
        public virtual DbSet<PostType> PostTypes { get; set; } = null!;
        public virtual DbSet<Rate> Rates { get; set; } = null!;
        public virtual DbSet<RatedA> RatedAs { get; set; } = null!;
        public virtual DbSet<Reply> Replies { get; set; } = null!;
        public virtual DbSet<Request> Requests { get; set; } = null!;
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

                entity.HasIndex(e => e.username, "UQ__Account__F3DBC572E3DF65B8")
                    .IsUnique();

                entity.Property(e => e.allowAdultContent).HasDefaultValueSql("((0))");

                entity.Property(e => e.deletedStatusId).HasDefaultValueSql("((1))");

                entity.Property(e => e.displayName)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.email)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.emailValid).HasDefaultValueSql("((0))");

                entity.Property(e => e.externalId)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.externalType)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('Native')");

                entity.Property(e => e.gold).HasDefaultValueSql("((0))");

                entity.Property(e => e.profilePic)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('noppic.webp')");

                entity.Property(e => e.pw)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.selfDesc)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('I am lazy because I didnt change my description or I just dont care enough.')");

                entity.Property(e => e.username)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.HasOne(d => d.deletedStatus)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.deletedStatusId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_AccountDeletedstatus");

                entity.HasOne(d => d.prefLanguage)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.prefLanguageId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_UserLanguage");

                entity.HasMany(d => d.authorities)
                    .WithMany(p => p.accounts)
                    .UsingEntity<Dictionary<string, object>>(
                        "Account_Authority",
                        l => l.HasOne<Authority>().WithMany().HasForeignKey("authorityId").HasConstraintName("FK_AccountAuthority_Authority"),
                        r => r.HasOne<Account>().WithMany().HasForeignKey("accountId").HasConstraintName("FK_AccountAuthority_Account"),
                        j =>
                        {
                            j.HasKey("accountId", "authorityId").HasName("PK_AccountAuthority");

                            j.ToTable("Account_Authority");
                        });

                entity.HasMany(d => d.inventoryItems)
                    .WithMany(p => p.accounts)
                    .UsingEntity<Dictionary<string, object>>(
                        "Account_Inventory",
                        l => l.HasOne<InventoryItem>().WithMany().HasForeignKey("inventoryItemId").HasConstraintName("FK_AccountInventory_InventoryItem"),
                        r => r.HasOne<Account>().WithMany().HasForeignKey("accountId").HasConstraintName("FK_AccountInventory_Account"),
                        j =>
                        {
                            j.HasKey("accountId", "inventoryItemId").HasName("PK_AccountInventory");

                            j.ToTable("Account_Inventory");
                        });

                entity.HasMany(d => d.ips)
                    .WithMany(p => p.accounts)
                    .UsingEntity<Dictionary<string, object>>(
                        "Account_IP",
                        l => l.HasOne<IP>().WithMany().HasForeignKey("ipId").HasConstraintName("FK_AccountIP_IP"),
                        r => r.HasOne<Account>().WithMany().HasForeignKey("accountId").HasConstraintName("FK_AccountIP_Account"),
                        j =>
                        {
                            j.HasKey("accountId", "ipId").HasName("PK_AccountIP");

                            j.ToTable("Account_IP");
                        });
            });

            modelBuilder.Entity<Authority>(entity =>
            {
                entity.ToTable("Authority");

                entity.Property(e => e.body)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Chapter>(entity =>
            {
                entity.ToTable("Chapter");

                entity.Property(e => e.authorNoteLater).IsUnicode(false);

                entity.Property(e => e.authorNotePrior).IsUnicode(false);

                entity.Property(e => e.body).IsUnicode(false);

                entity.Property(e => e.deletedStatusId).HasDefaultValueSql("((1))");

                entity.Property(e => e.isPublished).HasDefaultValueSql("((0))");

                entity.Property(e => e.publishDate).HasColumnType("smalldatetime");

                entity.Property(e => e.title)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.updateDate).HasColumnType("smalldatetime");

                entity.HasOne(d => d.deletedStatus)
                    .WithMany(p => p.Chapters)
                    .HasForeignKey(d => d.deletedStatusId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_ChapterDeletedstatus");

                entity.HasOne(d => d.post)
                    .WithMany(p => p.Chapters)
                    .HasForeignKey(d => d.postId)
                    .OnDelete(DeleteBehavior.SetNull)
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
                    .OnDelete(DeleteBehavior.SetNull)
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
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_CommentAccount");

                entity.HasOne(d => d.deletedStatus)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.deletedStatusId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_CommentDeletedstatus");

                entity.HasOne(d => d.targetChapter)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.targetChapterId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_CommentChapter");

                entity.HasOne(d => d.targetPost)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.targetPostId)
                    .OnDelete(DeleteBehavior.SetNull)
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
                    .OnDelete(DeleteBehavior.SetNull)
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

            modelBuilder.Entity<IP>(entity =>
            {
                entity.ToTable("IP");

                entity.Property(e => e.body)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<InventoryItem>(entity =>
            {
                entity.ToTable("InventoryItem");

                entity.Property(e => e.body)
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Language>(entity =>
            {
                entity.ToTable("Language");

                entity.Property(e => e.body).HasMaxLength(140);

                entity.Property(e => e.lanCode).HasMaxLength(15);
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("Post");

                entity.Property(e => e.coverImage).IsUnicode(false);

                entity.Property(e => e.deletedStatusId).HasDefaultValueSql("((1))");

                entity.Property(e => e.isPublished).HasDefaultValueSql("((0))");

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
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_PostAccount");

                entity.HasOne(d => d.deletedStatus)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.deletedStatusId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_PostDeletedstatus");

                entity.HasOne(d => d.language)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.languageId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_PostLanguage");

                entity.HasOne(d => d.postStatus)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.postStatusId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_PostPoststatus");

                entity.HasOne(d => d.postType)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.postTypeId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_PostPosttype");

                entity.HasOne(d => d.ratedAs)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.ratedAsId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_PostRatedas");

                entity.HasMany(d => d.existingStories)
                    .WithMany(p => p.posts)
                    .UsingEntity<Dictionary<string, object>>(
                        "Post_EStory",
                        l => l.HasOne<ExistingStory>().WithMany().HasForeignKey("existingStoryId").HasConstraintName("FK_PostEStory_EStory"),
                        r => r.HasOne<Post>().WithMany().HasForeignKey("postId").HasConstraintName("FK_PostEStory_Post"),
                        j =>
                        {
                            j.HasKey("postId", "existingStoryId").HasName("PK_PostEStory");

                            j.ToTable("Post_EStory");
                        });

                entity.HasMany(d => d.tags)
                    .WithMany(p => p.posts)
                    .UsingEntity<Dictionary<string, object>>(
                        "Post_Tag",
                        l => l.HasOne<Tag>().WithMany().HasForeignKey("tagId").HasConstraintName("FK_PostTag_Tag"),
                        r => r.HasOne<Post>().WithMany().HasForeignKey("postId").HasConstraintName("FK_PostTag_Post"),
                        j =>
                        {
                            j.HasKey("postId", "tagId").HasName("PK_PostTag");

                            j.ToTable("Post_Tag");
                        });
            });

            modelBuilder.Entity<PostGift>(entity =>
            {
                entity.ToTable("PostGift");

                entity.Property(e => e.sentDate).HasColumnType("smalldatetime");

                entity.HasOne(d => d.account)
                    .WithMany(p => p.PostGifts)
                    .HasForeignKey(d => d.accountId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_PostGiftAccount");

                entity.HasOne(d => d.item)
                    .WithMany(p => p.PostGifts)
                    .HasForeignKey(d => d.itemId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_PostGiftItem");

                entity.HasOne(d => d.targetPost)
                    .WithMany(p => p.PostGifts)
                    .HasForeignKey(d => d.targetPostId)
                    .OnDelete(DeleteBehavior.SetNull)
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

            modelBuilder.Entity<Rate>(entity =>
            {
                entity.ToTable("Rate");

                entity.HasOne(d => d.account)
                    .WithMany(p => p.Rates)
                    .HasForeignKey(d => d.accountId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_RateAccount");

                entity.HasOne(d => d.post)
                    .WithMany(p => p.Rates)
                    .HasForeignKey(d => d.postId)
                    .OnDelete(DeleteBehavior.SetNull)
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
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_ReplyAccount");

                entity.HasOne(d => d.comment)
                    .WithMany(p => p.Replies)
                    .HasForeignKey(d => d.commentId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_ReplyComment");

                entity.HasOne(d => d.deletedStatus)
                    .WithMany(p => p.Replies)
                    .HasForeignKey(d => d.deletedStatusId)
                    .OnDelete(DeleteBehavior.SetNull)
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
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_RequestAccount");

                entity.HasOne(d => d.deletedStatus)
                    .WithMany(p => p.Requests)
                    .HasForeignKey(d => d.deletedStatusId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_RequestDeletedstatus");
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.ToTable("Tag");

                entity.Property(e => e.body)
                    .HasMaxLength(60)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Vote>(entity =>
            {
                entity.ToTable("Vote");

                entity.HasOne(d => d.account)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.accountId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_VoteAccount");

                entity.HasOne(d => d.targetChapter)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.targetChapterId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_VoteChapter");

                entity.HasOne(d => d.targetComment)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.targetCommentId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_VoteComment");

                entity.HasOne(d => d.targetPost)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.targetPostId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_VotePost");

                entity.HasOne(d => d.targetReply)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.targetReplyId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_VoteReply");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
