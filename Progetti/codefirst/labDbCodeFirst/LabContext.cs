using Microsoft.EntityFrameworkCore;
using MySql.Data.EntityFrameworkCore.Extensions;
namespace labdbcodefirst
{
    public class LabContext: DbContext
    {
       
        public DbSet<Utente> Utente{ get; set; }

        public DbSet<Strumento> Strumento { get; set; }
        public DbSet<Prenotazione> Prenotazione { get; set; }
        public DbSet<DettaglioPrenotazione> DettaglioPrenotazione { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseMySQL("server=localhost;database=lab;user=root;password=mySql");
    }
     protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<Utente>(entity =>
      {
        entity.HasKey(e => e.ID);
        entity.Property(e => e.Nome).IsRequired();
      });

      modelBuilder.Entity<Strumento>(entity =>
      {
        entity.HasKey(s => s.ID);
      });
       modelBuilder.Entity<Prenotazione>(entity =>
      {
        entity.HasKey(p => p.ID);
        entity.HasOne(p => p.Utente).WithMany(u=> u.Prenotazioni);
      });

 modelBuilder.Entity<DettaglioPrenotazione>(entity =>
      {
        entity.HasKey(e=> new{e.IdStrumento,e.IdPrenotazione});
        entity.HasOne(e =>e.Strumento).WithMany(s => s.Prenotazioni);
        entity.HasOne(e=> e.Prenotazione).WithMany(p => p.Strumenti);
      });
      

    }
        
    }
}