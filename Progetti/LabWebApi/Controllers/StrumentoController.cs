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
[HttpGet("{pageIndex:int}/{pageSize:int}/{filter}/{search}")]
[Authorize(Roles="Admin,UtenteBase,UtenteAutorizzato")]
public async Task< Object> GetStrumenti(int i,int pageSize,string filter,string search)
{

   var data=await _context.Strumento.ToListAsync();
     if(filter=="nome")
        data= data.Where(s=>s.Nome.ToLower().Contains(search.ToLower())).ToList();

    
    else if(filter=="descrizione")
    data= data.Where(s=>s.Descrizione.ToLower().Contains(search.ToLower())).ToList();

    
    else if(filter=="partId")
    data= data.Where(s=>s.PartId.ToLower().Contains(search.ToLower())).ToList();

    
    else if(filter=="serialId")
    data= data.Where(s=>s.SerialId.ToLower().Contains(search.ToLower())).ToList();

    
    else if(filter=="marca")
    data= data.Where(s=>s.Marca.ToLower().Contains(search.ToLower())).ToList();

    
    else if(filter=="modello")
    data= data.Where(s=>s.Modello.ToLower().Contains(search.ToLower())).ToList();
   var page=new PaginatedResponse<Strumento>(data,i,pageSize);
   var totalCount=page.Total;
   var totalPages=Math.Ceiling((double)totalCount/pageSize);
   return (new{
          Page=page,
          TotalPages=totalPages
      });
}
[HttpGet("{pageIndex:int}/{pageSize:int}/{filter1}/{search1}/{filter2}/{search2}")]
[Authorize(Roles="Admin,UtenteBase,UtenteAutorizzato")]
public async Task< Object> GetStrumenti(int i,int pageSize,string filter1,string search1,string filter2,string search2)
{
    
    var data=await _context.Strumento.ToListAsync();
    if(filter1=="nome")
        data= data.Where(s=>s.Nome.ToLower().Contains(search1.ToLower())).ToList();

    
    else if(filter1=="descrizione")
    data= data.Where(s=>s.Descrizione.ToLower().Contains(search1.ToLower())).ToList();

    
    else if(filter1=="partId")
    data= data.Where(s=>s.PartId.ToLower().Contains(search1.ToLower())).ToList();

    
    else if(filter1=="serialId")
    data= data.Where(s=>s.SerialId.ToLower().Contains(search1.ToLower())).ToList();

    
    else if(filter1=="marca")
    data= data.Where(s=>s.Marca.ToLower().Contains(search1.ToLower())).ToList();

    
    else if(filter1=="modello")
    data= data.Where(s=>s.Modello.ToLower().Contains(search1.ToLower())).ToList();

      if(filter2=="nome")
        data= data.Where(s=>s.Nome.ToLower().Contains(search2.ToLower())).ToList();

    
    else if(filter2=="descrizione")
    data= data.Where(s=>s.Descrizione.ToLower().Contains(search2.ToLower())).ToList();

    
    else if(filter2=="partId")
    data= data.Where(s=>s.PartId.ToLower().Contains(search2.ToLower())).ToList();

    
    else if(filter2=="serialId")
    data= data.Where(s=>s.SerialId.ToLower().Contains(search2.ToLower())).ToList();

    
    else if(filter2=="marca")
    data= data.Where(s=>s.Marca.ToLower().Contains(search2.ToLower())).ToList();

    
    else if(filter2=="modello")
    data= data.Where(s=>s.Modello.ToLower().Contains(search2.ToLower())).ToList();



    


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
    strumento.Status=1;
    strumento.Descrizione=desc;
    var s= new Strumento();
        s.PartId=strumento.PartId;
        s.SerialId=strumento.SerialId;
        s.Descrizione=strumento.Descrizione;
        s.Status=strumento.Status;
        s.Nome=strumento.Nome;
        s.Marca=strumento.Marca;
        s.Modello=strumento.Modello;
        s.Posizione=strumento.Posizione;
        s.TTL=strumento.TTL;
        s.Delicato=strumento.Delicato;
         if(strumento.PDFPath!=null)
         s.PDFPath=strumento.PDFPath;
      if(strumento.ImgPath!=null)
         s.ImgPath=strumento.ImgPath;
         s.numManutenzioni=0;
     
   
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
     s.Status=strumento.Status;
    _context.Strumento.Update(s);
    await _context.SaveChangesAsync();

    return Ok();
}
[HttpDelete("{id}/{status}")]
[Authorize(Roles="Admin,UtenteAutorizzato")]
public async Task<IActionResult> DeleteStrumento(string id,int status)
{
    var strumento = await _context.Strumento.FindAsync(id);

    if (strumento == null)
    {
        return NotFound();
    }

   
   strumento.Status=status;
   if(status==0)
   strumento.numManutenzioni++;
    _context.Strumento.Update(strumento);
     await _context.SaveChangesAsync();

    return Ok();
}

    }
        
    
}