using BankApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// --- 1. Controller servisleri ---
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// --- 2. Swagger ayarları ---
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "BankApi",
        Version = "v1",
        Description = "BankApi - Kullanıcı giriş ve arama işlemleri için örnek API"
    });

    // 🔧 Aynı isimli modellerin çakışmasını önlemek için:
    c.CustomSchemaIds(type => type.FullName);
});

// --- 3. Veritabanı bağlantısı ---
builder.Services.AddDbContext<BankDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BankDb")));

// --- 4. CORS (Angular frontend erişimi için izin veriyoruz) ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Angular dev server
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Cookie/Token gibi şeylere izin verir
    });
});

var app = builder.Build();

// --- 5. Ortam kontrolü ---
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

    // 🔹 Swagger sadece Development ortamında aktif
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        // 👇 Burayı HTTP profiline göre ayarladık (5058)
        c.SwaggerEndpoint("http://localhost:5058/swagger/v1/swagger.json", "BankApi v1");
        c.RoutePrefix = "swagger";
    });
}

// --- 6. Middleware’ler ---
app.UseCors("AllowAngularApp");

// ⚠️ Geliştirme aşamasında HTTPS bazen sorun çıkarabilir. 
// Eğer sadece HTTP (http://localhost:5058) kullanıyorsan, bu satır kapalı kalmalı.
// app.UseHttpsRedirection();

app.UseAuthorization();

// --- 7. Controller’lar ---
app.MapControllers();

// --- 8. Uygulamayı çalıştır ---
app.Run();
