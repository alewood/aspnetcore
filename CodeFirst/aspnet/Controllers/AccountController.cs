
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using aspnet.Models;

namespace aspnet.Controllers
{
    public class AccountController :Controller
    {
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
          public IActionResult Login(LoginViewModel model)
        {
            if(ModelState.IsValid){

                
            }
            return View();
        }
    }
}