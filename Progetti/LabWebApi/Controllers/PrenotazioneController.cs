using Microsoft.AspNetCore.Mvc;
using LabWebApi.Models;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using LabWebApi.Helpers;

namespace LabWebApi.Controllers
{
   
    [Route("api/prenotazione")]
    [ApiController]
    public class PrenotazioneController:ControllerBase
    {
          private readonly LabContext _context;
         public PrenotazioneController(LabContext context)
        {
            _context = context;

             if (_context.Prenotazione.Count() == 0)
            {
                 var utente= new Utente
        {
          Nome = "Luigi",
          Cognome="Rossi"
        };
        _context.Utente.Add(utente);
                _context.Prenotazione.Add(new Prenotazione {Utente=utente  });
                _context.SaveChanges();
            }
        }
[HttpGet]
public async Task<ActionResult<IEnumerable<Prenotazione>>> GetPrenotazioni()
{
    return await _context.Prenotazione.ToListAsync();
}
[HttpGet("{id}")]
public async Task<ActionResult<Prenotazione>> GetPrenotazione(int id)
{
    var prenotazione = await _context.Prenotazione.FindAsync(id);

    if (prenotazione == null)
    {
        return NotFound();
    }

    return prenotazione;
}
[HttpPost]
public async Task<ActionResult<Prenotazione>> PostPrenotazione([FromBody]JObject data)
{
    Prenotazione prenotazione=data["prenotazione"].ToObject<Prenotazione>();
    prenotazione.Utente=_context.Utente.Find(data["utenteID"].ToObject<int>());
   ICollection<DettaglioPrenotazione> strumenti=SessionHelper.GetObjectFromJson<ICollection<DettaglioPrenotazione>>(HttpContext.Session,"cart");
   foreach(var d in strumenti){
       var s=_context.Strumento.Find(d.IdStrumento);
       d.Prenotazione=prenotazione;
        d.Strumento=s;
        _context.DettaglioPrenotazione.Add(d);
        await _context.SaveChangesAsync();
   }
   prenotazione.Strumenti=strumenti;
   

   await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetPrenotazione), new { id = prenotazione.ID }, prenotazione);
}
[HttpPut("{id}")]
public async Task<IActionResult> PutPrenotazione(int id,Prenotazione prenotazione)
{
    if (id != prenotazione.ID)
    {
        return BadRequest();
    }

    _context.Entry(prenotazione).State = EntityState.Modified;
    await _context.SaveChangesAsync();

    return NoContent();
}
[HttpDelete("{id}")]
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

        
    }
}