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
        [HttpGet]
        [Authorize(Roles="Admin,UtenteBase,UtenteAutorizzato")]
        public IEnumerable<DettaglioPrenotazione> getCart(){
            return SessionHelper.GetObjectFromJson<ICollection<DettaglioPrenotazione>>(HttpContext.Session,"cart");
        }
        [HttpPost]
        [Authorize(Roles="Admin,UtenteBase,UtenteAutorizzato")]
        public IActionResult postCart([FromBody]JObject data) {
            var cart=SessionHelper.GetObjectFromJson<ICollection<DettaglioPrenotazione>>(HttpContext.Session,"cart");
               if(cart==null)
               cart=new List<DettaglioPrenotazione>();
               var dettaglio= new DettaglioPrenotazione();
               dettaglio.IdStrumento=data["IdStrumento"].ToObject<int>();
               dettaglio.dataInizio=data["DataInizio"].ToObject<DateTime>();
               dettaglio.dataFine=data["DataFine"].ToObject<DateTime>();
               if(cart.All(d=>!(d.IdStrumento==dettaglio.IdStrumento)))
               cart.Add(dettaglio);
               SessionHelper.SetObjectAsJson(HttpContext.Session,"cart",cart);
          return Ok(cart);
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