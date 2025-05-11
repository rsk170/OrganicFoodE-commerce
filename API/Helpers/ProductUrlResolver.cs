using System.Linq;
using API.Dtos;
using AutoMapper;
using Basis.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    //uses a value resolver so that we can map from the picture url to API adrress + pic url
    public class ProductUrlResolver : IValueResolver<Product, ProductToReturnDto, string>
    {
        private readonly IConfiguration _config;
        public ProductUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
        {
            var photo = source.Photos.FirstOrDefault(x => x.IsMain);

            if (photo != null)
            {
                return _config["ApiUrl"] + photo.PictureUrl;
            }

            return _config["ApiUrl"] + "images/products/placeholder.png";
        }
    }
}