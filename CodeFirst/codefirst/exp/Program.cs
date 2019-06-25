using Microsoft.EntityFrameworkCore;
using System;
using System.Text;

namespace exp
{
  class Program
  {
    static void Main(string[] args)
    {
      InsertData();
      PrintData();
    }

    private static void InsertData()
    {
      using(var context = new LabContext())
      {
        // Creates the database if not exists
        context.Database.EnsureCreated();

        var strumento = new Strumento
        {
          Nome = "Cacciavite",
          Descrizione = "Avvita",
          Marca = "Philips",
          Modello ="P11"

        };
        context.Strumento.Add(strumento);

       var utente= new Utente
        {
          Nome = "Marco",
        };
        context.Utente.Add(utente);
        var prenotazione=new Prenotazione
        {
            dataFine=new DateTime(2008, 6, 1, 7, 47, 0),
            dataInizio=new DateTime(2008, 6, 1, 0, 0, 0),
            Utente= utente
 };
        context.Prenotazione.Add(prenotazione);
       context.DettaglioPrenotazione.Add(new DettaglioPrenotazione
       {
           Prenotazione=prenotazione,
           Strumento=strumento

       });
        // Saves changes
        context.SaveChanges();
      }
    }

    private static void PrintData()
    {
      using (var context = new LabContext())
      {
        var prenotazioni = context.DettaglioPrenotazione
          .Include(d => d.Strumento).Include(d=> d.Prenotazione);
        foreach(var p in prenotazioni)
        {
          var data = new StringBuilder();
          data.AppendLine($"ID: {p.IdStrumento} {p.IdPrenotazione}");
          data.AppendLine($"Prenotazione: {p.Prenotazione.dataInizio} {p.Prenotazione.dataFine}");
          data.AppendLine($"Strumento: {p.Strumento.Nome}  {p.Strumento.Descrizione}  {p.Strumento.Marca}  {p.Strumento.Modello}");
          Console.WriteLine(data.ToString());
        }
      }
    }
  }
}