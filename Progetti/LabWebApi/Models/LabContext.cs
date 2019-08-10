
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace LabWebApi.Models
{
    public class LabContext: IdentityDbContext
    {
       
        public DbSet<Utente> Utente{ get; set; }
        
        public DbSet<StrumentoProvvisorio> StrumentoProvvisorio{get;set;}
        public DbSet<Strumento> Strumento { get; set; }
        public DbSet<Prenotazione> Prenotazione { get; set; }
        public DbSet<DettaglioPrenotazione> DettaglioPrenotazione { get; set; }
        public LabContext(DbContextOptions<LabContext> options) : base(options)
        {
        }
     protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<Strumento>(entity =>
      {
        entity.HasKey(s => s.ID);
      });
       modelBuilder.Entity<Prenotazione>(entity =>
      {
        entity.HasKey(p => p.ID);
        entity.HasOne(p => p.Utente).WithMany(u => u.Prenotazioni);
      });

 modelBuilder.Entity<DettaglioPrenotazione>(entity =>
      {
        entity.HasKey(e=> new{e.IdStrumento,e.IdPrenotazione});
        entity.HasOne(e =>e.Strumento).WithMany(s=> s.Prenotazioni);
        entity.HasOne(e=> e.Prenotazione).WithMany(p => p.Strumenti);
      });
       modelBuilder.Entity<StrumentoProvvisorio>(entity =>
      {
        entity.HasKey(s => s.ID);
      });
      

    }
        
    }
}