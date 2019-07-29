using Microsoft.AspNetCore.Identity;
using OfficeOpenXml;
using System.Linq;
using System;
using System.IO;
using System.Text;
namespace LabWebApi.Models{
public static class DataSeeder{

    public static void SeedData(UserManager<Utente> userManager,RoleManager<IdentityRole> roleManager,string excelPath,LabContext context)
    {
         
          SeedRoles(roleManager);
          SeedUsers(userManager);
          SeedStrumenti(excelPath,context);

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
    public static void SeedStrumenti(/*"@" in front of string before passing it as argument */string excelPath,LabContext context){
    var filePath = @"C:\Users\Alexa\Desktop\StrumentiProva.xlsx";
            FileInfo file = new FileInfo(filePath);
 
            using (ExcelPackage package = new ExcelPackage(file))
            {
               
                ExcelWorksheet worksheet = package.Workbook.Worksheets.FirstOrDefault();
                int rowCount = worksheet.Dimension.Rows;
                for (int row = 2; row <= rowCount; row++)
                {
                    Strumento s= new Strumento();
                        s.Nome=worksheet.Cells[row, 1].Value.ToString();
                        s.Descrizione=worksheet.Cells[row, 2].Value.ToString();
                        s.Marca=worksheet.Cells[row, 3].Value.ToString();
                        s.Modello=worksheet.Cells[row, 4].Value.ToString();
                    
                    context.Strumento.Add(s);
                    Console.WriteLine(s.Nome);


                 
 
                     
 
                    
                }
                context.SaveChanges();
           
        }
   
    }
}
}