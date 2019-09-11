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
[Authorize(Roles="Admin,UtenteAutorizzato")]
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
[Authorize(Roles="UtenteBase ")]
public async Task<ActionResult> PostStrumentoProvvisorio([FromBody]JObject data)
{
    var desc=data["Descrizione"].ToObject<string>();
    var strumento=data["Strumento"].ToObject<Strumento>();
    strumento.Prenotabile=true;
    strumento.Descrizione=desc;
    var s= new StrumentoProvvisorio();
        s.PartId=strumento.PartId;
        s.SerialId=strumento.SerialId;
        s.Descrizione=strumento.Descrizione;
        s.Prenotabile=strumento.Prenotabile;
        s.Nome=strumento.Nome;
        s.Marca=strumento.Marca;
        s.Modello=strumento.Modello;
        s.Posizione=strumento.Posizione;
        s.TTL=strumento.TTL;
         if(strumento.PDFPath!=null)
         s.PDFPath=strumento.PDFPath;
      if(strumento.ImgPath!=null)
         s.ImgPath=strumento.ImgPath;
   _context.StrumentoProvvisorio.Add(s);
    await _context.SaveChangesAsync();
    return Ok();
}
[HttpPost]
[Authorize]
[Route("conferma")]
public async Task<ActionResult> ConfermaProv([FromBody]JObject data)
{
    var part=data["PartID"].ToObject<string>();
        var serial=data["SerialID"].ToObject<string>();
    if( checkPartSerial(part,serial)){
   Strumento str= new Strumento();
    str.PartId=part;
        str.SerialId=serial;
       str.Nome=data["Nome"].ToObject<string>();
       str.Marca=data["Marca"].ToObject<string>();
       str.Modello=data["Modello"].ToObject<string>();
       str.Descrizione=data["Descrizione"].ToObject<string>();
        str.Posizione=data["Posizione"].ToObject<string>();;
        str.Prenotabile=data["Prenotabile"].ToObject<bool>();
        str.TTL=data["TTL"].ToObject<DateTime>();
    _context.Strumento.Add(str);
     await _context.SaveChangesAsync();
    StrumentoProvvisorio strProv=_context.StrumentoProvvisorio.Find(data["Id"].ToObject<string>());
   _context.StrumentoProvvisorio.Remove(strProv);
   await _context.SaveChangesAsync();
  return Ok();}
  else{
      return BadRequest();
  }

}
[HttpDelete("{id}")]
[Authorize(Roles="Admin,UtenteAutorizzato")]
public async Task<IActionResult> DeleteStrumentoProvvisorio(string id)
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
public bool checkPartSerial(string part,string serial)
{
    var strumenti= _context.Strumento.Where(s=>s.PartId==part && s.SerialId==serial).ToList();
    return strumenti.Count==0;

}
    }
}