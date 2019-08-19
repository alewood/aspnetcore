using Microsoft.EntityFrameworkCore;
using LabWebApi.Models;
using LabWebApi.Email;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Identity;
using System.Linq;
namespace LabWebApi.Helpers
{
    public static class TTLHelper{
      
      public async static void CheckTTL(LabContext context,string  email,IEmailService emailService)
      {
          IEnumerable<Strumento> strumenti= await context.Strumento.ToListAsync();
          foreach (var s in strumenti)
          {
              if(s.TTL!=new DateTime()){
              if(DateTime.Today>= s.TTL.AddDays(-5)){
                  string message="Lo Strumento avente ID:"+s.ID+",\n dovrà andare in manuntenzione in 5 giorni o meno";
                   EmailTest.Send("admin",email,"TTL Strumento",message,emailService);

              }}
          }
      }

    }

}