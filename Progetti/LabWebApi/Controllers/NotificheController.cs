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
    
    [Route("api/notifiche")]
    [ApiController]
    public class NotificheController: ControllerBase{
      private readonly LabContext _context;
      public NotificheController(LabContext context)
      {
          _context=context;

      }
[HttpGet]
[Authorize(Roles="Admin,UtenteAutorizzato")]
  public ICollection<Strumento> CheckTTL()
      {
          IEnumerable<Strumento> strumenti=  _context.Strumento.Where(s=>(s.Prenotabile)) .ToList();
          ICollection<Strumento> strumentiLowTTL= new List<Strumento>();

          foreach (var s in strumenti)
          {
              if(s.TTL!=new DateTime()){
              if(DateTime.Today>= s.TTL.AddDays(-5)){
                  var TTL= DateTime.Today- s.TTL;
                  strumentiLowTTL.Add(s);
              }}
              
          }
          return strumentiLowTTL;
      }

     
    }
}