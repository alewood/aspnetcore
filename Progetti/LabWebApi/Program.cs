
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using LabWebApi.Models;
using Microsoft.Extensions.DependencyInjection;
namespace labwebapi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host=  CreateWebHostBuilder(args).Build();
              using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
            using(var context=services.GetRequiredService<LabContext>()){
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
