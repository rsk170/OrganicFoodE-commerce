using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Basis.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace DataAccess.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "User",
                        Email = "user@test.com",
                        UserName = "user@test.com",
                        Address = new Address
                        {
                            FirstName = "John",
                            LastName = "Doe",
                            Street = "10 The Street",
                            City = "London",
                            Country = "United Kingdom",
                            Postcode = "7AF"
                        }
                    },
                    new AppUser
                    {
                        DisplayName = "Admin",
                        Email = "admin@test.com",
                        UserName = "admin@test.com"
                    }
                };

                var roles = new List<AppRole>
                {
                    new AppRole {Name = "Admin"},
                    new AppRole {Name = "Member"}
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, "Member");
                    if (user.Email == "admin@test.com") await userManager.AddToRoleAsync(user, "Admin");
                }
            }
        }
    }
}