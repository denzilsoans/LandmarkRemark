using Microsoft.EntityFrameworkCore;
using LandmarkRemark.Entities;
using System.Text;

namespace LandmarkRemark.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Remark>(eb =>
            {
                eb.Property(b => b.Latitude).HasColumnType("decimal(38, 20)");
                eb.Property(b => b.Longitude).HasColumnType("decimal(38, 20)");
            });
        }


        public DbSet<User> Users { get; set; }

        public DbSet<Remark> Remark { get; set; }
    }
}