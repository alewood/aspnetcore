using Microsoft.AspNetCore.Mvc;
using LabWebApi.Models;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;
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

        
        }
[HttpGet]
[Authorize(Roles="Admin,UtenteBase,UtenteAutorizzato")]
public async Task<ActionResult<IEnumerable<Strumento>>> GetStrumenti()
{
    return await _context.Strumento.ToListAsync();
}

[HttpGet("{id}")]
[Authorize(Roles="Admin,UtenteBase,UtenteAutorizzato")]
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
[Authorize(Roles="Admin")]
public async Task<ActionResult> PostStrumento(Strumento strumento)
{
   var result= _context.Strumento.Add(strumento);
    await _context.SaveChangesAsync();
    return Ok();
}


[HttpPut("{id}")]
[Authorize(Roles="Admin,UtenteAutorizzato")]
public async Task<IActionResult> PutStrumento(int id,Strumento strumento)
{
    if (id != strumento.ID)
    {
        return BadRequest();
    }

    _context.Entry(strumento).State = EntityState.Modified;
    await _context.SaveChangesAsync();

    return Ok();
}
[HttpDelete("{id}")]
[Authorize(Roles="Admin,UtenteAutorizzato")]
public async Task<IActionResult> DeleteStrumento(int id)
{
    var strumento = await _context.Strumento.FindAsync(id);

    if (strumento == null)
    {
        return NotFound();
    }

    _context.Strumento.Remove(strumento);
    await _context.SaveChangesAsync();

    return Ok();
}

    }
        
    
}