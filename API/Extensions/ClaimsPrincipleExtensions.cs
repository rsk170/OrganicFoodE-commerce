using System.Linq;
using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        // return the email of the currently logged in user from their claims 
        public static string RetrieveEmailFromPrincipal(this ClaimsPrincipal user)
        {
            return user?.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
        }
    }
}