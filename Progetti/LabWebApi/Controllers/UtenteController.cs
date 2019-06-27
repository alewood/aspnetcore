using Microsoft.AspNetCore.Mvc;
using LabWebApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace LabWebApi.Controllers
{
     [Route("api/utente")]
    [ApiController]

    public class UtenteController :ControllerBase
    {
         private readonly LabContext _context;
         public UtenteController(LabContext context)
        {
            _context = context;

             if (_context.Utente.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                _context.Utente.Add(new Utente { Nome = "Utente1" });
                _context.SaveChanges();
            }
        }
[HttpGet]
public async Task<ActionResult<IEnumerable<Utente>>> GetUtenti()
{
    return await _context.Utente.ToListAsync();
}
[HttpGet("{id}")]
public async Task<ActionResult<Utente>> GetUtente(int id)
{
    var utente = await _context.Utente.FindAsync(id);

    if (utente == null)
    {
        return NotFound();
    }

    return utente;
}
[HttpPost]
public async Task<ActionResult<Utente>> PostUtente(Utente utente)
{
    _context.Utente.Add(utente);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetUtente), new { id = utente.ID }, utente);
}
[HttpPut("{id}")]
public async Task<IActionResult> PutUtente(int id, Utente utente)
{
    if (id != utente.ID)
    {
        return BadRequest();
    }

    _context.Entry(utente).State = EntityState.Modified;
    await _context.SaveChangesAsync();

    return NoContent();
}
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteUtente(int id)
{
    var utente = await _context.Utente.FindAsync(id);

    if (utente == null)
    {
        return NotFound();
    }

    _context.Utente.Remove(utente);
    await _context.SaveChangesAsync();

    return NoContent();
}

        
    }
}