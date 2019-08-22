using Microsoft.EntityFrameworkCore;
using LabWebApi.Models;
using LabWebApi.Email;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;
namespace LabWebApi.Helpers
{
    public static class TTLHelper{
      
      public static ICollection<Strumento> CheckTTL(LabContext context)
      {
          IEnumerable<Strumento> strumenti=  context.Strumento.ToList();
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