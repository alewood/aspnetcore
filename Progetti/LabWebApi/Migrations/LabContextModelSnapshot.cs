﻿// <auto-generated />
using System;
using LabWebApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace labwebapi.Migrations
{
    [DbContext(typeof(LabContext))]
    partial class LabContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("LabWebApi.Models.DettaglioPrenotazione", b =>
                {
                    b.Property<string>("IdStrumento");

                    b.Property<int>("IdPrenotazione");

                    b.Property<string>("PosizioneUtilizzo");

                    b.Property<int?>("PrenotazioneID");

                    b.Property<string>("StrumentoID");

                    b.Property<DateTime>("dataFine");

                    b.Property<DateTime>("dataInizio");

                    b.HasKey("IdStrumento", "IdPrenotazione");

                    b.HasIndex("PrenotazioneID");

                    b.HasIndex("StrumentoID");

                    b.ToTable("DettaglioPrenotazione");
                });

            modelBuilder.Entity("LabWebApi.Models.Prenotazione", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("UtenteId");

                    b.HasKey("ID");

                    b.HasIndex("UtenteId");

                    b.ToTable("Prenotazione");
                });

            modelBuilder.Entity("LabWebApi.Models.Strumento", b =>
                {
                    b.Property<string>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Delicato");

                    b.Property<string>("Descrizione");

                    b.Property<string>("ImgPath");

                    b.Property<string>("Marca");

                    b.Property<string>("Modello");

                    b.Property<DateTime>("Nascita");

                    b.Property<string>("Nome");

                    b.Property<string>("PDFPath");

                    b.Property<string>("PartId");

                    b.Property<string>("Posizione");

                    b.Property<bool>("Prenotabile");

                    b.Property<string>("SerialId");

                    b.Property<DateTime>("TTL");

                    b.Property<int>("numManutenzioni");

                    b.HasKey("ID");

                    b.ToTable("Strumento");
                });

            modelBuilder.Entity("LabWebApi.Models.StrumentoProvvisorio", b =>
                {
                    b.Property<string>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Delicato");

                    b.Property<string>("Descrizione");

                    b.Property<string>("ImgPath");

                    b.Property<string>("Marca");

                    b.Property<string>("Modello");

                    b.Property<DateTime>("Nascita");

                    b.Property<string>("Nome");

                    b.Property<string>("PDFPath");

                    b.Property<string>("PartId");

                    b.Property<string>("Posizione");

                    b.Property<bool>("Prenotabile");

                    b.Property<string>("SerialId");

                    b.Property<DateTime?>("TTL");

                    b.Property<int>("numManutenzioni");

                    b.HasKey("ID");

                    b.ToTable("StrumentoProvvisorio");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityUser");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128);

                    b.Property<string>("Name")
                        .HasMaxLength(128);

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("LabWebApi.Models.Utente", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityUser");

                    b.Property<bool>("AbilitatoAlleNotifiche");

                    b.Property<string>("Group");

                    b.Property<bool>("Rimosso");

                    b.HasDiscriminator().HasValue("Utente");
                });

            modelBuilder.Entity("LabWebApi.Models.DettaglioPrenotazione", b =>
                {
                    b.HasOne("LabWebApi.Models.Prenotazione", "Prenotazione")
                        .WithMany("Strumenti")
                        .HasForeignKey("PrenotazioneID");

                    b.HasOne("LabWebApi.Models.Strumento", "Strumento")
                        .WithMany()
                        .HasForeignKey("StrumentoID");
                });

            modelBuilder.Entity("LabWebApi.Models.Prenotazione", b =>
                {
                    b.HasOne("LabWebApi.Models.Utente", "Utente")
                        .WithMany("Prenotazioni")
                        .HasForeignKey("UtenteId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
