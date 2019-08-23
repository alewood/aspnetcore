using Microsoft.AspNetCore.Mvc;
using LabWebApi.Models;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using System;
namespace LabWebApi.Controllers{
    
    [Route("api/notifiche")]
    [ApiController]
    public class NotificheController: ControllerBase{
      private readonly LabContext _context;
      private readonly UserManager<Utente> _userManager;
      public NotificheController(LabContext context,UserManager<Utente> userManager)
      {
          _context=context;
          _userManager=userManager;
      }
[HttpGet]
[Authorize(Roles="Admin,UtenteAutorizzato")]
  public async Task<ICollection<Strumento>> CheckTTL()
      {
          string UserID = User.Claims.First(c =>c.Type=="UserID" ).Value;
          Utente user= await _userManager.FindByIdAsync(UserID);
           var roles= await _userManager.GetRolesAsync(user);
           if(roles.FirstOrDefault()=="UtenteAutorizzato"){
               if(!user.AbilitatoAlleNotifiche)
                 return null;
           }

          IEnumerable<Strumento> strumenti=  _context.Strumento.Where(s=>(s.Prenotabile)) .ToList();
          ICollection<Strumento> strumentiLowTTL= new List<Strumento>();

          foreach (var s in strumenti)
          {
              if(s.TTL!=new DateTime()){
              if(DateTime.Today>= s.TTL.AddDays(-5)){
                  var TTL= DateTime.Today- s.TTL;
                  strumentiLowTTL.Add(s);
              }}
              
          }
          return strumentiLowTTL;
      }

     [HttpPut("{id}")]
     [Authorize(Roles="Admin")]
     public async Task<IActionResult> abilitaNotifiche(string id){
         Utente user= await _userManager.FindByIdAsync(id);
         user.AbilitatoAlleNotifiche=true;
          await _userManager.UpdateAsync(user);
        return Ok();

     }
    }
}