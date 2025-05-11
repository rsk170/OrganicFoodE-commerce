using System.Threading.Tasks;
using Basis.Entities.Identity;

namespace Basis.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}