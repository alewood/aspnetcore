
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using LabWebApi.Models;
using Microsoft.Extensions.DependencyInjection;
namespace LabWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
           var host=CreateWebHostBuilder(args).Build();
           using (var scope= host.Services.CreateScope()){
               using(var context= scope.ServiceProvider.GetRequiredService<LabContext>()){
                  
               }
           }
           host.Run();
           
        }
        

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
