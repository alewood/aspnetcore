using Microsoft.EntityFrameworkCore;
using MySql.Data.EntityFrameworkCore;
namespace TodoApi.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }
            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
      optionsBuilder.UseMySQL("server=localhost;database=todo;user=root;password=mySql");
    }
     protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<TodoItem>(entity =>
      {
        entity.HasKey(e => e.Id);
        entity.Property(e => e.Name).IsRequired();
      });}

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}