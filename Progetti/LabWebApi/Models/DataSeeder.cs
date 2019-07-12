using Microsoft.AspNetCore.Identity;
namespace LabWebApi.Models{
public static class DataSeeder{

    public static void SeedData(UserManager<Utente> userManager,RoleManager<IdentityRole> roleManager)
    {
         
          SeedRoles(roleManager);
           SeedUsers(userManager);

    }
    public static void SeedUsers(UserManager<Utente> userManager)
    {
        if(userManager.FindByNameAsync("admin").Result ==null)
        {
            Utente admin= new Utente();
            admin.UserName="admin";
            IdentityResult result= userManager.CreateAsync(admin,"Password1!").Result;
            if(result.Succeeded)
            {
                userManager.AddToRoleAsync(admin,"Admin").Wait();
            }
            
        }

    }
     public static void SeedRoles(RoleManager<IdentityRole> roleManager)
    {
        if(!roleManager.RoleExistsAsync("UtenteBase").Result)
        {
            IdentityRole role= new IdentityRole();
            role.Name="UtenteBase";
            IdentityResult roleResult= roleManager.CreateAsync(role).Result;
        }
        if(!roleManager.RoleExistsAsync("UtenteAutorizzato").Result)
        {
            IdentityRole role= new IdentityRole();
            role.Name="UtenteAutorizzato";
            IdentityResult roleResult= roleManager.CreateAsync(role).Result;
        }
        if(!roleManager.RoleExistsAsync("Admin").Result)
        {
            IdentityRole role= new IdentityRole();
            role.Name="Admin";
            IdentityResult roleResult= roleManager.CreateAsync(role).Result;
        }
        
    }
}
}