using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace exp
{
    public class Utente
    {
    [Key]
   [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ID { get; set; }
    public string Nome { get; set; }
    public string Cognome { get; set; }
    public string Username { get; set; }   
    public string Password { get; set; }
    public virtual ICollection<Prenotazione> Prenotazioni { get; set; }
        
    }
    public class Strumento{
        [Key]
       [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ID { get; set; }
    public string Nome { get; set; }
    public string Descrizione { get; set; }
    public string Marca { get; set; }   
    public string Modello{ get; set; }
    public virtual ICollection<DettaglioPrenotazione> Prenotazioni { get; set; }

    }
    public class Prenotazione{
        [Key]
       [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ID { get; set; }
    public virtual Utente Utente {get;set;}
    public virtual ICollection<DettaglioPrenotazione> Strumenti { get; set; }
    }
    public class DettaglioPrenotazione{
        public int IdStrumento{get;set;}
         public int IdPrenotazione{get;set;}
        public virtual Strumento Strumento{get;set;}
        public virtual Prenotazione Prenotazione{get;set;}
        public DateTime dataInizio { get; set; }
        public DateTime dataFine { get; set; }   
        
    }

}