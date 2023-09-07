using Microsoft.EntityFrameworkCore;
using TnServer.DataBase.Entity;

namespace TnServer.DataBase
{
    public class TnDbContext: DbContext
    {
        public TnDbContext(DbContextOptions<TnDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Subject>()
                .HasMany(p=>p.Questions)
                .WithOne(c => c.Subject)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Question>()
                .HasMany(p=>p.Answers)
                .WithOne(p=>p.Question)
                .OnDelete(DeleteBehavior.Cascade);
        }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Subject> Subjects { get; set; }
    }
}
