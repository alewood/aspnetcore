using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
namespace LabWebApi.Models
{
    public class Utente :IdentityUser
    {
        public string Group{get;set;}
        public bool AbilitatoAlleNotifiche{get;set;}
        public bool Rimosso{get;set;}

   
    

    public virtual ICollection<Prenotazione> Prenotazioni {get;set;}

        
    }
    public class Strumento{
        [Key]
       [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string ID { get; set; }
    public string PartId{get;set;}
    public string SerialId{get;set;}
    public string Nome { get; set; }
    public string Descrizione { get; set; }
    public string Marca { get; set; }   
    public string Modello{ get; set; }
    public string PDFPath { get; set; }  
    public int Status{get;set;}

    public string ImgPath{get;set;}
     public DateTime TTL{get;set;}
     public string Posizione{get;set;}
     public DateTime Nascita{get;set;}
     public int numManutenzioni{get;set;}
     public bool Delicato{get;set;}
     
   

    }
       public class StrumentoProvvisorio{
        [Key]
       [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string ID { get; set; }
    public string PartId{get;set;}
    public string SerialId{get;set;}
    public string Nome { get; set; }
     public string Descrizione { get; set; }
    public string Marca { get; set; }   
    public string Modello{ get; set; }
    public string PDFPath { get; set; }  
     public int  Status{get;set;}
     public string ImgPath{get;set;}
     public DateTime? TTL{get;set;}
       public string Posizione{get;set;}
         public DateTime Nascita{get;set;}
           public int numManutenzioni{get;set;}
     public bool Delicato{get;set;}

    
     
       }
    
    public class Prenotazione{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ID { get; set; }
    public virtual Utente Utente {get;set;}
    public virtual ICollection<DettaglioPrenotazione> Strumenti { get; set; }
    }
   
    public class DettaglioPrenotazione{
        public string IdStrumento{get;set;}
         public int IdPrenotazione{get;set;}
        public virtual Strumento Strumento{get;set;}
        public virtual Prenotazione Prenotazione{get;set;}
        public DateTime dataInizio { get; set; }
        public DateTime dataFine { get; set; }   
        public string PosizioneUtilizzo{get;set;}
        public bool Checked{get;set;}
        public int OreUtilizzo{get;set;}
        public string Reparto{get;set;}
        public string Progetto{get;set;}
        public string PosizioneRiconsegna{get;set;}

        
    }

}