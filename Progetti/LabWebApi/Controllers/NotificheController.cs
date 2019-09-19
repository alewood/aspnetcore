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

          IEnumerable<Strumento> strumenti=  _context.Strumento.Where(s=>(s.Status==1)) .ToList();
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
     public async Task<IActionResult> AbilitaNotifiche(string id){
         Utente user= await _userManager.FindByIdAsync(id);
         user.AbilitatoAlleNotifiche=true;
          await _userManager.UpdateAsync(user);
        return Ok();

     }


[HttpGet]
[Authorize]
[Route("prenotazioni")]
public async Task<ICollection<DettaglioPrenotazione>> GetPrenotazioniAttiveVicine(){
    var prenotazioni=  await _context.DettaglioPrenotazione
    .Include(dp=>dp.Prenotazione.Utente)
    .Include(dp=>dp.Strumento)
    .Where(dp=> (dp.dataFine>=DateTime.Now.AddDays(this.GiornoLavorativoPrecedente(dp.dataFine)))&& dp.dataFine<=DateTime.Now.AddDays(2))
    .OrderByDescending(dp=>dp.dataFine)
    .ToListAsync();
    return prenotazioni;

}
public int GiornoLavorativoPrecedente(DateTime data)
{
    if(data.DayOfWeek==DayOfWeek.Friday)
    return -4;
    else if(data.DayOfWeek==DayOfWeek.Saturday)
    return -3;
    else
    return -2;
}
[HttpGet]
[Authorize(Roles="Admin,UtenteAutorizzato")]
[Route("delicate")]
public async Task<ICollection<DettaglioPrenotazione>> GetPrenotazioniDelicate()
{
    return await _context.DettaglioPrenotazione
     .Include(dp=>dp.Prenotazione.Utente)
     .Include(dp=> dp.Strumento)
     .Where(dp=>!dp.Checked).ToListAsync();
}
 [HttpPut("{idStr}/{idPre}")]
[Authorize(Roles="Admin,UtenteAutorizzato")]
public async Task<IActionResult> AuthorizeDelicata(string idStr,int idPre)
{
    var dettaglio=  _context.DettaglioPrenotazione.Where(dp=>dp.IdStrumento==idStr&&dp.IdPrenotazione==idPre).ToList().FirstOrDefault();
    if( !(await checkPrenotazioniStrumento(idStr,idPre,dettaglio.dataInizio,dettaglio.dataFine)))
       return BadRequest();
    dettaglio.Checked=true;
   _context.DettaglioPrenotazione.Update(dettaglio);
  await _context.SaveChangesAsync();
   return Ok();


}
      public  async Task<bool> checkPrenotazioniStrumento(string idStrumento, int idPrenotazione,DateTime inizio,DateTime fine){
            var result=true;
            ICollection<DettaglioPrenotazione> prenotazioni= await _context.DettaglioPrenotazione.Where(d=>d.IdStrumento==idStrumento&&d.IdPrenotazione!=idPrenotazione&& d.Checked).ToListAsync();
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



    }
}