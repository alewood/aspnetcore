using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using LabWebApi.Helpers;
using LabWebApi.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
        public void postCart(DettaglioPrenotazione dettaglio) {
            var cart=SessionHelper.GetObjectFromJson<ICollection<DettaglioPrenotazione>>(HttpContext.Session,"cart");
               if(cart==null)
               cart=new List<DettaglioPrenotazione>();
               cart.Add(dettaglio);
               SessionHelper.SetObjectAsJson(HttpContext.Session,"cart",cart);
          
        }

        


        
    }
}