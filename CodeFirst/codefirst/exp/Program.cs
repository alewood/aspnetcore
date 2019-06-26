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
           var strumento1 = new Strumento
        {
          Nome = "Penna",
          Descrizione = "scrive",
          Marca = "Bic",
          Modello ="P12"

        };
        context.Strumento.Add(strumento1);

       var utente= new Utente
        {
          Nome = "Marco",
          Cognome="Rossi"
        };
        context.Utente.Add(utente);
        var prenotazione=new Prenotazione
        {
            Utente= utente
 };

        context.Prenotazione.Add(prenotazione);
         context.SaveChanges();// otherwise it will save a negative temporary id on DettaglioPrenotazione
       context.DettaglioPrenotazione.Add(new DettaglioPrenotazione
       {
           IdPrenotazione=prenotazione.ID,
           IdStrumento=strumento.ID,
           Prenotazione=prenotazione,
           Strumento=strumento,
           dataFine=new DateTime(2008, 6, 1, 7, 47, 0),
           dataInizio=new DateTime(2008, 6, 1, 0, 0, 0),

       });
           context.DettaglioPrenotazione.Add(new DettaglioPrenotazione
       {
           IdPrenotazione=prenotazione.ID,
           IdStrumento=strumento1.ID,
           Prenotazione=prenotazione,
           Strumento=strumento1,
           dataFine=new DateTime(2007, 6, 1, 7, 47, 0),
           dataInizio=new DateTime(2007, 6, 1, 0, 0, 0),

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
          .Include(d => d.Strumento).Include(d=> d.Prenotazione).Include(p=>p.Prenotazione.Utente);
        foreach(var p in prenotazioni)
        {
          var data = new StringBuilder();
          data.AppendLine($"ID: {p.IdStrumento} {p.IdPrenotazione}");
          data.AppendLine($"Periodo Prenotazione: {p.dataInizio} {p.dataFine}");
          data.AppendLine($"Strumento: {p.Strumento.Nome}  {p.Strumento.Descrizione}  {p.Strumento.Marca}  {p.Strumento.Modello}");
           data.AppendLine($"Utente: {p.Prenotazione.Utente.Nome} {p.Prenotazione.Utente.Cognome}");
          Console.WriteLine(data.ToString());
        }
      }
    }
  }
}