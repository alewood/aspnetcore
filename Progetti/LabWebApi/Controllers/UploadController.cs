using Microsoft.AspNetCore.Mvc;
using LabWebApi.Models;
using System.IO;
using System.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;
namespace LabWebApi.Controllers

{
    [Route("api/upload")]
    [ApiController]
    public class UploadController:ControllerBase
    {
        
         private readonly LabContext _context;
         public UploadController(LabContext context)
        {
            _context = context;

        
        }
[HttpPost, DisableRequestSizeLimit]
public IActionResult Upload()
{
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
 
            return Ok(new { dbPath });
        }
        else
        {
            return BadRequest();
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex);
        return StatusCode(500, "Internal server error");
    }
}
    }
}