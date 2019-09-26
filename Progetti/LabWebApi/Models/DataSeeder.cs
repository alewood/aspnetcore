using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
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

            admin.Group="TLC";
            IdentityResult result= userManager.CreateAsync(admin,"Password1!").Result;
            
            if(result.Succeeded)
            {
                userManager.AddToRoleAsync(admin,"Admin").Wait();
            }
        }
if(userManager.FindByNameAsync("sudo").Result ==null){
            Utente superUser= new Utente();
            superUser.UserName="sudo";
             IdentityResult result2= userManager.CreateAsync(superUser,"Th4l3s4l3n14Sp4c3").Result;
            
            if(result2.Succeeded)
            {
                userManager.AddToRoleAsync(superUser,"Admin").Wait();
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
                    
                    var PDFPath="";
                    var ImgPath="";
                    Strumento s= new Strumento();
                        s.PartId=worksheet.Cells[row, 1].Value.ToString();
                        s.SerialId=worksheet.Cells[row, 2].Value.ToString();
                        s.Nome=worksheet.Cells[row, 3].Value.ToString();
                        s.Descrizione=worksheet.Cells[row, 4].Value.ToString();
                        s.Marca=worksheet.Cells[row, 5].Value.ToString();
                        s.Modello=worksheet.Cells[row, 6].Value.ToString();
                        s.Posizione=worksheet.Cells[row,7].Value.ToString();
                        if(worksheet.Cells[row,8].Value!=null){
                          PDFPath=@worksheet.Cells[row,8].Value.ToString();
                           s.PDFPath= DataSeeder.Upload(PDFPath);
                        }
                         if(worksheet.Cells[row,9].Value!=null){
                          ImgPath=@worksheet.Cells[row,9].Value.ToString();
                          s.ImgPath= DataSeeder.Upload(ImgPath);
                         }
                         var Date = DateTime.FromOADate((double)worksheet.Cells[row,11].Value);
                         s.Nascita= Date;
                        var ttl=DateTime.FromOADate((double)worksheet.Cells[row,10].Value);
                        s.TTL=ttl;
                      var delicato =worksheet.Cells[row,12].Value.ToString();
                      if(delicato=="true")
                        s.Delicato=true;
                        else
                        s.Delicato=false;
                        s.Status=1;
                    context.Strumento.Add(s);
                }
                context.SaveChanges();
           
        }
    }
   
    }
    public static string Upload(string filePath)
    {
        FileInfo file= new FileInfo(filePath);
        var folderName = Path.Combine("Resources", "Files");
        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
 
        if (file.Length > 0)
        {
            var fileName =file.Name;
            var fullPath = Path.Combine(pathToSave, fileName);
            var dbPath = Path.Combine(folderName, fileName);
            var f= new FileInfo(fullPath);
            if(f!=null)
            file.CopyTo(fullPath,true);
            
 
            return  dbPath;
        }
        else
        {
            return null;
        }


    }
}
}