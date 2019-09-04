using Microsoft.AspNetCore.Mvc;
using LabWebApi.Models;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;
using System;
using LabWebApi.Helpers;
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
[HttpGet("{pageIndex:int}/{pageSize:int}")]
[Authorize(Roles="Admin,UtenteBase,UtenteAutorizzato")]
public async Task< Object> GetStrumenti(int i,int pageSize)
{
   var data=await _context.Strumento.ToListAsync();
   var page=new PaginatedResponse<Strumento>(data,i,pageSize);
   var totalCount=page.Total;
   var totalPages=Math.Ceiling((double)totalCount/pageSize);
   return (new{
          Page=page,
          TotalPages=totalPages
      });
}

[HttpGet("{id}")]
[Authorize(Roles="Admin,UtenteBase,UtenteAutorizzato")]
public async Task<ActionResult<Strumento>> GetStrumento(string id)
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
public async Task<ActionResult> PostStrumento([FromBody]JObject data)
{
    var desc=data["Descrizione"].ToObject<string>();
    var strumento=data["Strumento"].ToObject<Strumento>();
    strumento.Prenotabile=true;
    strumento.Descrizione=desc;
    var s= new Strumento();
        s.Descrizione=strumento.Descrizione;
        s.Prenotabile=strumento.Prenotabile;
        s.ID=strumento.ID;
        s.Nome=strumento.Nome;
        s.Marca=strumento.Marca;
        s.Modello=strumento.Modello;
        s.Posizione=strumento.Posizione;
        s.TTL=strumento.TTL;
         if(strumento.PDFPath!=null)
         s.PDFPath=strumento.PDFPath;
      if(strumento.ImgPath!=null)
         s.ImgPath=strumento.ImgPath;
     
   
    _context.Strumento.Add(strumento);
    await _context.SaveChangesAsync();
    return Ok();
}


[HttpPut("{id}")]
[Authorize(Roles="Admin,UtenteAutorizzato")]
public async Task<IActionResult> PutStrumento(string id,[FromBody]JObject data)
{
    
    var strumento=data["Strumento"].ToObject<Strumento>();
    var desc=data["Descrizione"].ToObject<string>();
    var s= _context.Strumento.Find(id);
    if(strumento.Nome!=""&&strumento.Nome!=null)
       s.Nome=strumento.Nome;
    if(strumento.Marca!=""&&strumento.Marca!=null)
     s.Marca=strumento.Marca;
    if(strumento.Modello!=""&&strumento.Modello!=null)
     s.Modello=strumento.Modello;
     if(desc!=null)
     s.Descrizione=desc;
    if(strumento.Posizione!=""&&strumento.Posizione!=null)
      s.Posizione=strumento.Posizione;
    if(strumento.PDFPath!=null)
     s.PDFPath=strumento.PDFPath;
    if(strumento.TTL!=new DateTime(2001,1,1)|| strumento.TTL!=null)
     s.TTL=strumento.TTL;
    if(strumento.ImgPath!=null)
     s.ImgPath=strumento.ImgPath;
    
    _context.Strumento.Update(s);
    await _context.SaveChangesAsync();

    return Ok();
}
[HttpDelete("{id}")]
[Authorize(Roles="Admin,UtenteAutorizzato")]
public async Task<IActionResult> DeleteStrumento(string id)
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