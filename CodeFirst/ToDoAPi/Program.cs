using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using TodoApi.Models;
using Microsoft.Extensions.DependencyInjection;
using MySql.Data.EntityFrameworkCore;

namespace ToDoAPi
{
    public class Program
    {
        public static void Main(string[] args)
        {      var host=  CreateWebHostBuilder(args).Build();
              using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
            using(var context=services.GetRequiredService<TodoContext>()){
                context.Database.EnsureCreated();
            }
            
           host.Run();
        }
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
