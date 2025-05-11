using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Basis.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class UserManagerExtensions
    {
        // get the user with their address instead of injecting the context into the account controller
        public static async Task<AppUser> FindByUserByClaimsPrincipleWithAddressAsync(this UserManager<AppUser> input, ClaimsPrincipal user)
        {
            // get the email from the claims 
            var email = user?.Claims?.FirstOrDefault(x=> x.Type == ClaimTypes.Email)?
            .Value;

            return await input.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
        }

        public static async Task<AppUser> FindByEmailFromClaimsPrinciple(this UserManager<AppUser> input,
        ClaimsPrincipal user)
        {
            var email = user?.Claims?.FirstOrDefault(x=> x.Type == ClaimTypes.Email)?
            .Value;

            return await input.Users.SingleOrDefaultAsync(x => x.Email == email);
        }
    }
}