using Microsoft.AspNetCore.Identity;
using OfficeOpenXml;
using System.Linq;
using System;
using System.IO;
using System.Text;
using LabWebApi.Helpers;
using LabWebApi.Email;
namespace LabWebApi.Models{
public static class DataSeeder{

    public static void SeedData(UserManager<Utente> userManager,RoleManager<IdentityRole> roleManager,string excelPath,LabContext context,IEmailService emailService,string email)
    {
         
          SeedRoles(roleManager);
          SeedUsers(userManager);
          SeedStrumenti(excelPath,context);
         // TTLHelper.CheckTTL(context,email,emailService);

    }
    public static void SeedUsers(UserManager<Utente> userManager)
    {
        if(userManager.FindByNameAsync("admin").Result ==null)
        {
            Utente admin= new Utente();
            admin.UserName="admin";
            admin.Email="ale.wood@stud.uniroma3.it";
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
    if(context.Strumento.Count()==0){
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
                        var days=(double)worksheet.Cells[row,5].Value;
                        s.TTL=DateTime.Today.AddDays(days);
                    context.Strumento.Add(s);
                    Console.WriteLine(s.Nome);


                 
 
                     
 
                    
                }
                context.SaveChanges();
           
        }
    }
   
    }
}
}