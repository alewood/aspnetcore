using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using LabWebApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System;
using System.IO;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Http;
using LabWebApi.Email;
using LabWebApi.Helpers;
namespace LabWebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
              services.Configure<ApplicationSettings>(Configuration.GetSection("ApplicationSettings"));
              services.AddDbContext<LabContext>(options =>
        options.UseMySql("server=localhost;database=labwebapi;user=root;password=mySql"));
            services.AddDefaultIdentity<Utente>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<LabContext>();
            services.Configure<IdentityOptions>( options =>
            options.Password.RequireDigit= false);
            services.AddCors();
            
            services.AddDistributedMemoryCache();
            services.AddSession();
            var key= Encoding.UTF8.GetBytes(Configuration["ApplicationSettings:JWT_secret"].ToString());
            services.AddAuthentication( x =>{
            x.DefaultAuthenticateScheme=JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme=JwtBearerDefaults.AuthenticationScheme;
            x.DefaultScheme=JwtBearerDefaults.AuthenticationScheme;})
            .AddJwtBearer(x =>{
                x.RequireHttpsMetadata=false;
                x.TokenValidationParameters= new TokenValidationParameters{
                    ValidateIssuerSigningKey=true,
                    IssuerSigningKey= new SymmetricSecurityKey(key),
                    ValidateIssuer= false,
                    ValidateAudience=false,
                    ClockSkew= TimeSpan.Zero
                };
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2).AddJsonOptions(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
             services.AddSingleton<IEmailConfiguration>(Configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>());
            services.AddTransient<IEmailService, EmailService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,UserManager<Utente> userManager,RoleManager<IdentityRole> roleManager,LabContext context,IEmailService emailService)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
             app.UseStaticFiles(new StaticFileOptions()
    {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
        RequestPath = new PathString("/Resources")
    });
            app.UseCors(builder =>
            builder.WithOrigins(Configuration["ApplicationSettings:Client_Url"].ToString())
            .AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            app.UseAuthentication();
            var path= @Configuration["Excel:Strumenti"].ToString();
            var email=Configuration["AdminEmail"].ToString();
            DataSeeder.SeedData(userManager,roleManager,path,context,emailService,email);
             app.UseSession();
            app.UseMvc();
           
        }
    }
}
