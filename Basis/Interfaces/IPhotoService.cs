using System.Threading.Tasks;
using Basis.Entities;
using Microsoft.AspNetCore.Http;

namespace Basis.Interfaces
{
    public interface IPhotoService
    {
        Task<Photo> SaveToDiskAsync(IFormFile photo);
        void DeleteFromDisk(Photo photo);
    }
}