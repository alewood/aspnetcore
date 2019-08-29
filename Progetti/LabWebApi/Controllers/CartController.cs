using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using LabWebApi.Helpers;
using LabWebApi.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Web;
namespace LabWebApi.Controllers
{
     [Route("api/cart")]
    [ApiController]
    public class CartController :ControllerBase
    {
         private readonly LabContext _context;
         public CartController(LabContext context)
        {
            _context = context;

        
        }
        public  async Task<bool> checkPrenotazioniStrumento(int idStrumento,DateTime inizio,DateTime fine){
            var result=true;
            ICollection<DettaglioPrenotazione> prenotazioni= await _context.DettaglioPrenotazione.Where(d=>d.IdStrumento==idStrumento).ToListAsync();
            if(fine.CompareTo(inizio)<0)
            return false;
            foreach (var d in prenotazioni)
            {
              if(inizio.CompareTo(d.dataInizio)<0){
              if(fine.CompareTo(d.dataInizio)>0){
                 result=false;
                 break;}
                   if(fine.Equals(d.dataFine)||fine.Equals(d.dataInizio)){
                      result=false;
                     break;}}
                 else if(inizio.CompareTo(d.dataFine)<0){
                      if(fine.CompareTo(d.dataFine)>0){
                      result=false;
                      break;}
                      if(fine.Equals(d.dataFine)||fine.Equals(d.dataInizio)){
                      result=false;
                     break;}

                 }
                 else if(inizio.Equals(d.dataInizio)||inizio.Equals(d.dataFine)){
                     result=false;
                     break;

                 }
                 else if(fine.Equals(d.dataFine)||fine.Equals(d.dataInizio)){
                      result=false;
                     break;
                 }

                  
            }
            return result;
        }

        [HttpGet] 
        [Authorize(Roles="Admin,UtenteBase,UtenteAutorizzato")]
        public IEnumerable<DettaglioPrenotazione> getCart(){
            return SessionHelper.GetObjectFromJson<ICollection<DettaglioPrenotazione>>(HttpContext.Session,"cart");
        }
        [HttpPost]
        [Authorize(Roles="Admin,UtenteBase,UtenteAutorizzato")]
        public async Task<IActionResult> postCart([FromBody]JObject data) {
            var idStrumento=data["IdStrumento"].ToObject<int>();
            var inizio=data["DataInizio"].ToObject<DateTime>().Date;
            var fine=data["DataFine"].ToObject<DateTime>().Date;
            if(await checkPrenotazioniStrumento(idStrumento,inizio,fine)){
            var cart=SessionHelper.GetObjectFromJson<ICollection<DettaglioPrenotazione>>(HttpContext.Session,"cart");
               
               if(cart==null)
               cart=new List<DettaglioPrenotazione>();
               var dettaglio= new DettaglioPrenotazione();
               dettaglio.IdStrumento=idStrumento;
               dettaglio.dataInizio=inizio;
               dettaglio.dataFine=fine;
               if(cart.All(d=>!(d.IdStrumento==dettaglio.IdStrumento)))
               cart.Add(dettaglio);
               SessionHelper.SetObjectAsJson(HttpContext.Session,"cart",cart);
          return Ok();
            }
            else{
                return BadRequest();
            }
        }
        [HttpDelete("{id}")]
        [Authorize(Roles="Admin,UtenteBase,UtenteAutorizzato")]
        public IActionResult rimuoviPrenotazioneStrumento(int id){
           
            var cart=SessionHelper.GetObjectFromJson<ICollection<DettaglioPrenotazione>>(HttpContext.Session,"cart");
          var cart2=new List<DettaglioPrenotazione>();
          foreach (var item in cart)
          {
              if(item.IdStrumento!=id)
              cart2.Add(item);
              
          }
        
            SessionHelper.SetObjectAsJson(HttpContext.Session,"cart",cart2);
            return Ok(cart);
            
        }

        


        
    }
}