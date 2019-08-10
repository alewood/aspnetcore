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
    [Route("api/strumentoProv")]
    [ApiController]
    public class StrumentoProvvisorioController:ControllerBase
    {
         private readonly LabContext _context;
         public StrumentoProvvisorioController(LabContext context)
        {
            _context = context;

        
        }
 
 [HttpGet]
[Authorize(Roles="Admin")]
public async Task<ActionResult<IEnumerable<StrumentoProvvisorio>>> GetStrumentiProvvisori()
{
    return await _context.StrumentoProvvisorio.ToListAsync();
}
[HttpGet("{id}")]
[Authorize(Roles="Admin")]
public async Task<ActionResult<StrumentoProvvisorio>> GetStrumentoProvvisorio(int id)
{
    var strumento = await _context.StrumentoProvvisorio.FindAsync(id);

    if (strumento == null)
    {
        return NotFound();
    }

    return strumento;
}
[HttpPost]
[Authorize(Roles="UtenteAutorizzato")]
public async Task<ActionResult> PostStrumentoProvvisorio(StrumentoProvvisorio strumento)
{
   var result= _context.StrumentoProvvisorio.Add(strumento);
    await _context.SaveChangesAsync();
    return Ok();
}
[HttpPost]
[Authorize]
[Route("conferma")]
public async Task<ActionResult> ConfermaProv([FromBody]JObject data)
{
   Strumento str= new Strumento();
       str.Nome=data["Nome"].ToObject<string>();
       str.Marca=data["Marca"].ToObject<string>();
       str.Modello=data["Modello"].ToObject<string>();
       str.Descrizione=data["Descrizione"].ToObject<string>();
   _context.Strumento.Add(str);
   StrumentoProvvisorio strProv=_context.StrumentoProvvisorio.Find(data["Id"].ToObject<int>());
  _context.StrumentoProvvisorio.Remove(strProv);
   await _context.SaveChangesAsync();
  return Ok();

}
[HttpDelete("{id}")]
[Authorize(Roles="Admin,UtenteAutorizzato")]
public async Task<IActionResult> DeleteStrumentoProvvisorio(int id)
{
    var strumento = await _context.StrumentoProvvisorio.FindAsync(id);

    if (strumento == null)
    {
        return NotFound();
    }

    _context.StrumentoProvvisorio.Remove(strumento);
    await _context.SaveChangesAsync();

    return Ok();
}
    }
}