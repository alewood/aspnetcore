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
    [Route("api/bi")]
    [ApiController]
    public class BIDataController
    {
          private readonly LabContext _context;
         public BIDataController(LabContext context)
        {
            _context = context;

        
        }

        [HttpGet]
        [Authorize]

        public async Task<Object> GetTop3()
        {
           var result=  _context.DettaglioPrenotazione
           .Include(dp=> dp.Strumento)
           .Include(dp=>dp.Prenotazione)
           .ThenInclude(p=>p.Utente)
           .OrderByDescending(dp=>dp.dataFine);
           var map= new  Dictionary<string,int>();
           await result.ForEachAsync(dp=>{ 
           if(!map.ContainsKey(dp.IdStrumento))
              map[dp.IdStrumento]=0;
              map[dp.IdStrumento]++;
           });
           var top3= map.OrderByDescending(e=>e.Value).Take(3);
           var top3ID= new List<string>();
            foreach (var c in top3)
                top3ID.Add(c.Key);
               
        return result.Where(dp=> top3ID.Contains(dp.IdStrumento) ).ToList();
        }
        [HttpGet]
        [Authorize]
        [Route("strumenti")]
        public async Task<IEnumerable<Strumento>> GetStrumenti(){
            return  await _context.Strumento.ToListAsync();

        }
          [HttpGet("{id}")]
          [Authorize] 
          public async Task<IEnumerable<DettaglioPrenotazione>> GetPrenotazioniPerStrumento(string id)
          {
              var result=  await _context.DettaglioPrenotazione
              .Where(dp=>dp.IdStrumento==id)
              .Include(dp=>dp.Strumento)
              .Include(dp=> dp.Prenotazione)
              .ThenInclude(p=>p.Utente)
              .ToListAsync();

              var map =new Dictionary<string,int>();
            result.ForEach(dp=>{
                var group=dp.Prenotazione.Utente.Group;
                 if(!map.ContainsKey(group))
                   map[group]=0;
                   map[group]++;    
            });
              var top3= map.OrderByDescending(e=>e.Value).Take(3);
           var top3Group= new List<string>();
            foreach (var c in top3)
                top3Group.Add(c.Key);    
                   return result.Where(dp=>top3Group.Contains(dp.Prenotazione.Utente.Group))
                   .Where(dp=>(dp.dataInizio>=DateTime.Now.AddMonths(-12)&& dp.dataInizio<=DateTime.Now))
                   .ToList();
                   

          }
       
    }
}