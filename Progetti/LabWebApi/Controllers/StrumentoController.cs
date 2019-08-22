using Microsoft.AspNetCore.Mvc;
using LabWebApi.Models;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;
using System;
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
    return await _context.Strumento.Where(s=>s.Prenotabile).ToListAsync();
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
[Authorize(Roles="Admin,UtenteAutorizzato")]
public async Task<ActionResult> PostStrumento(Strumento strumento)
{
    strumento.Prenotabile=true;
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
    var s= _context.Strumento.Find(id);
    if(strumento.Nome!=null)
       s.Nome=strumento.Nome;
    if(strumento.Marca!=null)
     s.Marca=strumento.Marca;
    if(strumento.Modello!=null)
     s.Modello=strumento.Modello;
    if(strumento.PDFPath!=null)
     s.PDFPath=strumento.PDFPath;
    if(strumento.TTL!=null)
     s.TTL=strumento.TTL;
    if(strumento.ImgPath!=null)
     s.ImgPath=strumento.ImgPath;
    
    _context.Strumento.Update(s);
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

   var prenotabile= strumento.Prenotabile;
   strumento.Prenotabile=!prenotabile;
    _context.Strumento.Update(strumento);
     await _context.SaveChangesAsync();
   

    return Ok();
}

    }
        
    
}