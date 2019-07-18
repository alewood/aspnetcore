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
        if(user!=null && await _userManager.CheckPasswordAsync(user,data["Password"].ToObject<string>()))
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
            return Ok( new{token});

        }
        else 
        return BadRequest(new {message= "Username or Password is Incorrect"});
        
    }
    [HttpPost]
    [Authorize(Roles="Admin")]
    [Route("register")]
    public async Task<Object> PostUtente([FromBody]JObject data)
    {
        var user= new Utente(){
            UserName= data["Username"].ToObject<string>(),
            Email=data["Email"].ToObject<string>(),
            FullName=data["FullName"].ToObject<string>()
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
     [HttpGet]
    [Authorize]
      public async Task<Object> GetUserProfile() 
      {
          string UserID = User.Claims.First(c =>c.Type=="UserID" ).Value;
          var user=  await _userManager.FindByIdAsync(UserID);
          return new 
          {
              user.FullName,
              user.Email,
              user.UserName
          };
      }
       [HttpGet]
    [Authorize(Roles="Admin")]
    [Route("tutti")]
      public  IEnumerable<Utente> GetUtenti(){
          return  _userManager.Users.ToList();
      } 
    }
    
}
