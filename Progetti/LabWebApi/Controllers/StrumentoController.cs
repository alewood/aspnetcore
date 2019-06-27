using Microsoft.AspNetCore.Mvc;
using LabWebApi.Models;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace LabWebApi.Controllers

{
    [Route("api/strumento")]
    [ApiController]
    public class StrumentoController:ControllerBase
    {
        
         private readonly LabContext _context;
         public StrumentoController(LabContext context)
        {
            _context = context;

             if (_context.Strumento.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                _context.Strumento.Add(new Strumento { Nome = "Strumento1" });
                _context.SaveChanges();
            }
        }
[HttpGet]
public async Task<ActionResult<IEnumerable<Strumento>>> GetStrumenti()
{
    return await _context.Strumento.ToListAsync();
}
[HttpGet("{id}")]
public async Task<ActionResult<Strumento>> GetStrumento(int id)
{
    var strumento = await _context.Strumento.FindAsync(id);

    if (strumento == null)
    {
        return NotFound();
    }

    return strumento;
}
[HttpPost]
public async Task<ActionResult<Utente>> PostStrumento(Strumento strumento)
{
    _context.Strumento.Add(strumento);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetStrumento), new { id = strumento.ID }, strumento);
}
[HttpPut("{id}")]
public async Task<IActionResult> PutStrumento(int id,Strumento strumento)
{
    if (id != strumento.ID)
    {
        return BadRequest();
    }

    _context.Entry(strumento).State = EntityState.Modified;
    await _context.SaveChangesAsync();

    return NoContent();
}
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteStrumento(int id)
{
    var strumento = await _context.Strumento.FindAsync(id);

    if (strumento == null)
    {
        return NotFound();
    }

    _context.Strumento.Remove(strumento);
    await _context.SaveChangesAsync();

    return NoContent();
}
    }
        
    
}