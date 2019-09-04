using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using LabWebApi.Helpers;
using LabWebApi.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Web;
namespace LabWebApi.Controllers{
    
    [Route("api/dettaglio")]
    [ApiController]
    public class DettaglioPrenotazioneController: ControllerBase{
   private readonly LabContext _context;
      private readonly UserManager<Utente> _userManager;
      public DettaglioPrenotazioneController(LabContext context,UserManager<Utente> userManager)
      {
          _context=context;
          _userManager=userManager;
      }
      [HttpPut("{idStr}/{idPre}")]
      [Authorize(Roles="Admin,UtenteAutorizzato")]
      public async Task<IActionResult> putDettaglio(string idStr,int idPre,[FromBody]JObject data)
      {
           string UserID = User.Claims.First(c =>c.Type=="UserID" ).Value;
          Utente user= await _userManager.FindByIdAsync(UserID);
           var roles= await _userManager.GetRolesAsync(user);
           if(roles.FirstOrDefault()=="UtenteAutorizzato"){
               if(!user.AbilitatoAlleNotifiche)
                 return null;
           }
           var dataFine=data["DataFine"].ToObject<DateTime>();
           var dettaglio=  _context.DettaglioPrenotazione.Where(dp=>dp.IdStrumento==idStr&&dp.IdPrenotazione==idPre).ToList().FirstOrDefault();
           if(await this.checkPrenotazioniStrumento(idStr,idPre,dettaglio.dataInizio,dataFine)){
                 dettaglio.dataFine=dataFine;
               _context.DettaglioPrenotazione.Update(dettaglio);
               _context.SaveChanges();
               return Ok();}
           else{
              
            return BadRequest();
           }
           

           
             
      }
       public  async Task<bool> checkPrenotazioniStrumento(string idStrumento, int idPrenotazione,DateTime inizio,DateTime fine){
            var result=true;
            ICollection<DettaglioPrenotazione> prenotazioni= await _context.DettaglioPrenotazione.Where(d=>d.IdStrumento==idStrumento&&d.IdPrenotazione!=idPrenotazione).ToListAsync();
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
