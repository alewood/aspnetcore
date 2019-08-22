using Microsoft.AspNetCore.Mvc;
using LabWebApi.Models;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;
using System;
namespace LabWebApi.Controllers{
    
    [Route("api/strumentiManutenzione")]
    [ApiController]
    public class StrumentiManutenzioneController: ControllerBase{
      private readonly LabContext _context;
      public StrumentiManutenzioneController(LabContext context)
      {
          _context=context;

      }
      [HttpGet]
      [Authorize(Roles="Admin,UtenteAutorizzato")]
      public async Task<ActionResult<IEnumerable<Strumento>>> GetStrumentiManutenzione(){
          return await _context.Strumento.Where(s=>!(s.Prenotabile)) .ToListAsync();
    }
}
}