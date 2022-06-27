using System;
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
        public virtual DbSet<AccountAuthority> AccountAuthorities { get; set; } = null!;
        public virtual DbSet<AccountIp> AccountIps { get; set; } = null!;
        public virtual DbSet<Authority> Authorities { get; set; } = null!;
        public virtual DbSet<Chapter> Chapters { get; set; } = null!;
        public virtual DbSet<ChatMessage> ChatMessages { get; set; } = null!;
        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<DeletedStatus> DeletedStatuses { get; set; } = null!;
        public virtual DbSet<Gift> Gifts { get; set; } = null!;
        public virtual DbSet<Ip> Ips { get; set; } = null!;
        public virtual DbSet<Language> Languages { get; set; } = null!;
        public virtual DbSet<Post> Posts { get; set; } = null!;
        public virtual DbSet<PostGift> PostGifts { get; set; } = null!;
        public virtual DbSet<PostRatedA> PostRatedAs { get; set; } = null!;
        public virtual DbSet<PostStatus> PostStatuses { get; set; } = null!;
        public virtual DbSet<PostTag> PostTags { get; set; } = null!;
        public virtual DbSet<PostType> PostTypes { get; set; } = null!;
        public virtual DbSet<Rate> Rates { get; set; } = null!;
        public virtual DbSet<RatedA> RatedAs { get; set; } = null!;
        public virtual DbSet<Reply> Replies { get; set; } = null!;
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
            });

            modelBuilder.Entity<AccountAuthority>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Account_Authority");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.AuthorityId).HasColumnName("authorityId");

                entity.HasOne(d => d.Account)
                    .WithMany()
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK_AccountAuthority_Account");

                entity.HasOne(d => d.Authority)
                    .WithMany()
                    .HasForeignKey(d => d.AuthorityId)
                    .HasConstraintName("FK_AccountAuthority_Authority");
            });

            modelBuilder.Entity<AccountIp>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Account_IP");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.IpId).HasColumnName("ipId");

                entity.HasOne(d => d.Account)
                    .WithMany()
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK_AccountIP_Account");

                entity.HasOne(d => d.Ip)
                    .WithMany()
                    .HasForeignKey(d => d.IpId)
                    .HasConstraintName("FK_AccountIP_IP");
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

            modelBuilder.Entity<Gift>(entity =>
            {
                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Body)
                    .HasMaxLength(50)
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
            });

            modelBuilder.Entity<PostGift>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Post_Gifts");

                entity.Property(e => e.GiftId).HasColumnName("giftId");

                entity.Property(e => e.PostId).HasColumnName("postId");

                entity.HasOne(d => d.Gift)
                    .WithMany()
                    .HasForeignKey(d => d.GiftId)
                    .HasConstraintName("FK_PostGifts_Gift");

                entity.HasOne(d => d.Post)
                    .WithMany()
                    .HasForeignKey(d => d.PostId)
                    .HasConstraintName("FK_PostGifts_Post");
            });

            modelBuilder.Entity<PostRatedA>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Post_RatedAs");

                entity.Property(e => e.PostId).HasColumnName("postId");

                entity.Property(e => e.RatedAsId).HasColumnName("ratedAsId");

                entity.HasOne(d => d.Post)
                    .WithMany()
                    .HasForeignKey(d => d.PostId)
                    .HasConstraintName("FK_PostRatedas_Post");

                entity.HasOne(d => d.RatedAs)
                    .WithMany()
                    .HasForeignKey(d => d.RatedAsId)
                    .HasConstraintName("FK_PostRatedas_RatedAs");
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

            modelBuilder.Entity<PostTag>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Post_Tag");

                entity.Property(e => e.PostId).HasColumnName("postId");

                entity.Property(e => e.TagId).HasColumnName("tagId");

                entity.HasOne(d => d.Post)
                    .WithMany()
                    .HasForeignKey(d => d.PostId)
                    .HasConstraintName("FK_PostTag_Post");

                entity.HasOne(d => d.Tag)
                    .WithMany()
                    .HasForeignKey(d => d.TagId)
                    .HasConstraintName("FK_PostTag_Tag");
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
