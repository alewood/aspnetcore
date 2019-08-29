using Microsoft.AspNetCore.Mvc;
using LabWebApi.Models;
using System.IO;
using System.Net.Http.Headers;
using System;
using System.Collections.Generic;
namespace LabWebApi.Controllers
{
    [Route("api/parse")]
    [ApiController]
    
 public class TextParseController:ControllerBase
 {
  public TextParseController()
  {
      
  }

 [HttpPost, DisableRequestSizeLimit]
 public Object ParseText(){
     string descrizione="";
    try
    {
        var file = Request.Form.Files[0];
        var folderName = Path.Combine("Resources", "Files");
        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
 
        if (file.Length > 0)
        {
            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fullPath = Path.Combine(pathToSave, fileName);
            var dbPath = Path.Combine(folderName, fileName);
 
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            

             using (StreamReader sr = new StreamReader(fullPath)) 
            {
               
               descrizione=sr.ReadToEnd();
            }
            
          System.IO.File.Delete(fullPath);
        }
          return (new{text=descrizione});
    }
        catch (Exception ex)
    {
        Console.WriteLine(ex);
        return StatusCode(500, "Internal server error");
    }

 }

 
 
 }

}