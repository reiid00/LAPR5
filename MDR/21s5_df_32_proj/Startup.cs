using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _21s5_df_32_proj.Infrastructure;
using _21s5_df_32_proj.Infrastructure.EstadosHumor;
using _21s5_df_32_proj.Infrastructure.Pedidos;
using _21s5_df_32_proj.Infrastructure.Relations;
using _21s5_df_32_proj.Infrastructure.Utilizadores;
using _21s5_df_32_proj.Infrastructure.Shared;
using _21s5_df_32_proj.Infrastructure.Tags;
using _21s5_df_32_proj.Domain.Shared;
using _21s5_df_32_proj.Domain.EstadosHumor;
using _21s5_df_32_proj.Domain.Pedidos;
using _21s5_df_32_proj.Domain.Relations;
using _21s5_df_32_proj.Domain.Utilizadores;
using _21s5_df_32_proj.Domain.Tags;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors;



namespace _21s5_df_32_proj
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
            services.AddDbContext<_21s5_df_32_projDbContext>(opt =>
                opt.UseSqlServer(Configuration.GetConnectionString("21s5df32"))
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            ConfigureMyServices(services);
            
            services.AddCors(options =>
            {
                options.AddPolicy("http://localhost:4200",
                builder =>
                {
                    // Not a permanent solution, but just trying to isolate the problem
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });
            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();


            app.UseCors(option => option.AllowAnyOrigin());;

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork,UnitOfWork>();

            services.AddTransient<IRelationRepository,RelationRepository>();
            services.AddTransient<RelationService>();

            services.AddTransient<IUtilizadorRepository,UtilizadorRepository>();
            services.AddTransient<UtilizadorService>();

            services.AddTransient<IPedidoRepository,PedidoRepository>();
            services.AddTransient<PedidoService>();

            services.AddTransient<IEstadoHumorRepository,EstadoHumorRepository>();
            services.AddTransient<EstadoHumorService>();

            services.AddTransient<ITagRepository,TagRepository>();
            services.AddTransient<TagService>();
        }
    }
}
