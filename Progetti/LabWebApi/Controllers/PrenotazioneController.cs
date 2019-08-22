using Microsoft.AspNetCore.Mvc;
using LabWebApi.Models;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using LabWebApi.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System;

namespace LabWebApi.Controllers
{
   
    [Route("api/prenotazione")]
    [ApiController]
    public class PrenotazioneController:ControllerBase
    {
          private readonly LabContext _context;
          private UserManager<Utente> _userManager;
         public PrenotazioneController(LabContext context, UserManager<Utente> userManager)
        {
            _context = context;
            _userManager=userManager;

        }
[HttpGet("{pageIndex:int}/{pageSize:int}")]
[Authorize(Roles="Admin,UtenteBase,UtenteAutorizzato")]
public Object GetPrenotazioni(int pageIndex,int pageSize)
{
   var data= _context.DettaglioPrenotazione.Include(dp=> dp.Strumento).Include(dp=>dp.Prenotazione).ThenInclude(p=>p.Utente).OrderBy(dp=>dp.IdPrenotazione);   
 var page= new PaginatedResponse<DettaglioPrenotazione>(data,pageIndex,pageSize);
 var totalCount=page.Total;
 var totalPages=Math.Ceiling((double)totalCount/pageSize);
      return (new{
          Page=page,
          TotalPages=totalPages
      });
;

   
}
[HttpGet("{id}")]
[Authorize(Roles="Admin,UtenteBase,UtenteAutorizzato")]
public async Task<ActionResult<IEnumerable<DettaglioPrenotazione>>> GetPrenotazione(int id)
{
    var dettagli = await _context.DettaglioPrenotazione.Where(d=> d.IdPrenotazione==id).ToListAsync();

    if (dettagli == null)
    {
        return NotFound();
    }

    return dettagli;
}
[HttpPost]
[Authorize(Roles="Admin,UtenteBase,UtenteAutorizzato")]
public async Task<ActionResult> PostPrenotazione()
{
    Prenotazione prenotazione=new Prenotazione();
    _context.Prenotazione.Add(prenotazione);
    _context.SaveChanges();
    var user= await _userManager.FindByIdAsync(User.Claims.First(c => c.Type=="UserID").Value);
    prenotazione.Utente=user;
   ICollection<DettaglioPrenotazione> strumenti=SessionHelper.GetObjectFromJson<ICollection<DettaglioPrenotazione>>(HttpContext.Session,"cart");
   foreach(var d in strumenti){
       var s=_context.Strumento.Find(d.IdStrumento);
       d.IdPrenotazione=prenotazione.ID;
       d.Prenotazione=prenotazione;
        d.Strumento=s;
        _context.DettaglioPrenotazione.Add(d);
        await _context.SaveChangesAsync();
   }
   prenotazione.Strumenti=strumenti;
   

   await _context.SaveChangesAsync();
   SessionHelper.Reset(HttpContext.Session,"cart");

    return Ok();
}

[HttpDelete("{id}")]
[Authorize(Roles="Admin,UtenteBase,UtenteAutorizzato")]
public async Task<IActionResult> DeletePrenotazione(int id)
{
    var prenotazione = await _context.Prenotazione.FindAsync(id);

    if (prenotazione == null)
    {
        return NotFound();
    }
    var dettagli= await _context.DettaglioPrenotazione.Where(d=>d.IdPrenotazione==prenotazione.ID).ToListAsync();
    if(dettagli!=null){
       foreach(var d in dettagli){
         _context.DettaglioPrenotazione.Remove(d);

       }}
    _context.Prenotazione.Remove(prenotazione);
    await _context.SaveChangesAsync();

    return NoContent();
}

     [HttpGet]
     [Authorize(Roles="Admin,UtenteBase,UtenteAutorizzato")]
     [Route("perUtente")]
    public async Task<ActionResult<IEnumerable<Prenotazione>>> GetPrenotazioniPerUtente()
{
    var userId= User.Claims.First(c =>c.Type=="UserID").Value;
    var user= await _userManager.FindByIdAsync(userId);

    return await _context.Prenotazione.Where(p => p.Utente.Id==(user.Id)).ToListAsync();
}
    }
}