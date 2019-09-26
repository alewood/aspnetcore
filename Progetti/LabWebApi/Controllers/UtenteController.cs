using Microsoft.AspNetCore.Mvc;
using LabWebApi.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json.Linq;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using System;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using LabWebApi.Helpers;
namespace LabWebApi.Controllers
{
     [Route("api/utente")]
    [ApiController]

    public class UtenteController :ControllerBase
    {
         private UserManager<Utente> _userManager;
         private SignInManager<Utente> _signInManager;
         private readonly ApplicationSettings _appSettings;
         public UtenteController(SignInManager<Utente> signInManager,UserManager<Utente> userManager,IOptions<ApplicationSettings> appSettings)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _appSettings= appSettings.Value;

           
        }
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody]JObject data)
    {
        var user= await _userManager.FindByNameAsync(data["Username"].ToObject<string>());
        if(user!=null && await _userManager.CheckPasswordAsync(user,data["Password"].ToObject<string>())&& !user.Rimosso)
        {
            var role= await _userManager.GetRolesAsync(user);

            IdentityOptions _options= new IdentityOptions();
            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject= new ClaimsIdentity(new Claim[]{
                    new Claim("UserID",user.Id.ToString()),
                    new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
                }),
                Expires= DateTime.UtcNow.AddDays(1),
                SigningCredentials= new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_secret)),SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken= tokenHandler.CreateToken(tokenDescriptor);
            var token= tokenHandler.WriteToken(securityToken);
            return Ok( new{token,sessionId= HttpContext.Session.Id});

        }
        else 
        return BadRequest(new {message= "Username or Password is Incorrect"});
        
    }
    [HttpPost]
    [Authorize(Roles="Admin,UtenteAutorizzato")]
    [Route("register")]
    public async Task<Object> PostUtente([FromBody]JObject data)
    {
        var user= new Utente(){
            UserName= data["Username"].ToObject<string>(),
            Email=data["Email"].ToObject<string>(),
            Group=data["Group"].ToObject<string>(),
            AbilitatoAlleNotifiche=false,
            Rimosso=false
        };

        try
        {
            var result= await _userManager.CreateAsync(user,data["Password"].ToObject<string>());
            await _userManager.AddToRoleAsync(user,data["Role"].ToObject<string>());
            return Ok(result);
            
        }
        catch (Exception ex)
        {
            
            throw ex;
        }

    }
    public async Task<Object> GetUserDetails(Utente user){
       
          var role= await _userManager.GetRolesAsync(user);
          return new 
          {
              id=user.Id,
              group=user.Group,
              email=user.Email,
              userName=user.UserName,
              abilitatoAlleNotifiche=user.AbilitatoAlleNotifiche,
              role=role
          };
    }
     [HttpGet]
    [Authorize]
      public async Task<Object> GetUserProfile() 
      {
          string UserID = User.Claims.First(c =>c.Type=="UserID" ).Value;
         return  await GetUserDetails(await _userManager.FindByIdAsync(UserID));
      }
    [HttpGet("{pageIndex:int}/{pageSize:int}")]
    [Authorize(Roles="Admin,UtenteAutorizzato")]
      public async Task<Object> GetUtenti(int i,int pageSize){
            var userList=_userManager.Users
            .Where(u=>!u.Rimosso && u.UserName!="sudo")
             .ToList();
            ICollection<Object> utenti= new List<Object>();
            foreach (var utente in userList){
             utenti.Add(await this.GetUserDetails(utente));}
            var data= utenti.AsEnumerable();    
             
             var page= new PaginatedResponse<Object>(data,i,pageSize);
             var totalCount=page.Total;
   var totalPages=Math.Ceiling((double)totalCount/pageSize);
   return (new{
          Page=page,
          TotalPages=totalPages
      });

                
            
      } 
       [HttpPut]
       [Authorize]
       public async Task<IActionResult> ChangePassword([FromBody]JObject data){
            string UserID = User.Claims.First(c =>c.Type=="UserID" ).Value;
            var user=  await _userManager.FindByIdAsync(UserID);
            var oldPwd=data["oldPassword"].ToObject<string>();
            var newPwd=data["newPassword"].ToObject<string>();
             if(user!=null && await _userManager.CheckPasswordAsync(user,oldPwd)){
              await _userManager.ChangePasswordAsync(user,oldPwd,newPwd);
               return Ok();
             }
             else
             return BadRequest();




       }
[HttpDelete("{id}")]
[Authorize(Roles="Admin,UtenteAutorizzato")]
public async Task<IActionResult> DeleteUtente(string id)
{
    var utente=await _userManager.FindByIdAsync(id);

    if (utente == null)
    {
        return NotFound();
    }

   utente.Rimosso=true;
    await _userManager.UpdateAsync(utente);
    return Ok();
}
[HttpPut("{id}")]
[Authorize(Roles="Admin")]
public async Task<IActionResult> ResetPasswordUtente(string id,[FromBody]JObject data)
{
    var newPassword= data["Password"].ToObject<string>();
      var utente=await _userManager.FindByIdAsync(id);
      var token= await  _userManager.GeneratePasswordResetTokenAsync(utente);
     await _userManager.ResetPasswordAsync(utente,token,newPassword);
     return Ok();
     

}

    }
    
}
