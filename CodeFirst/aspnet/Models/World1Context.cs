using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace aspnet.Models
{
    public partial class World1Context : DbContext
    {
        public World1Context()
        {
        }

        public World1Context(DbContextOptions<World1Context> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
  optionsBuilder.UseMySql("server=localhost;database=world1;user=root;pwd=mySql;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {}
    }
}
