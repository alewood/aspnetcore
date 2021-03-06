using Microsoft.AspNetCore.Mvc;
using LabWebApi.Models;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Identity;
namespace LabWebApi.Controllers{
    
    [Route("api/strumentiManutenzione")]
    [ApiController]
    public class StrumentiManutenzioneController: ControllerBase{
      private readonly LabContext _context;
       private readonly UserManager<Utente> _userManager;
      public StrumentiManutenzioneController(LabContext context,UserManager<Utente> userManager)
      {
          _context=context;
          _userManager=userManager;

      }
      [HttpGet]
      [Authorize(Roles="Admin,UtenteAutorizzato")]
      public async Task<ActionResult<IEnumerable<Strumento>>> GetStrumentiManutenzione(){
          string UserID = User.Claims.First(c =>c.Type=="UserID" ).Value;
          Utente user= await _userManager.FindByIdAsync(UserID);
           var roles= await _userManager.GetRolesAsync(user);
           if(roles.FirstOrDefault()=="UtenteAutorizzato"){
               if(!user.AbilitatoAlleNotifiche)
                 return null;
           }
          return await _context.Strumento.Where(s=>(s.Status==0||s.Status==2)) .ToListAsync();
    }
    [HttpDelete("{id}")]
[Authorize(Roles="Admin,UtenteAutorizzato")]
public async Task<IActionResult> AbilitaStrumento(string id)
{
    var strumento =  _context.Strumento.Find(id);

    if (strumento == null)
    {
        return NotFound();
    }
    if(strumento.Status==0){
  var newTtl= strumento.TTL.AddYears(1);
  strumento.TTL=newTtl;
    }

   strumento.Status=1;
 
    _context.Strumento.Update(strumento);
     await _context.SaveChangesAsync();
   

    return Ok();
}
}
}