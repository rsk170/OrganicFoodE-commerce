using API.Dtos;
using AutoMapper;
using Basis.Entities;
using Basis.Entities.Identity;
using Basis.Entities.OrderClasses;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //explicitly tell AutoMapper what to be returned form the properties 
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
                .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());

            CreateMap<Basis.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<BasketDto, Basket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<ProductCreateDto, Product>();
            CreateMap<Photo, PhotoToReturnDto>()
                .ForMember(d => d.PictureUrl, 
                    o => o.MapFrom<PhotoUrlResolver>());
            // mapping to the address in the order classes (not in identity)
            CreateMap<AddressDto, Basis.Entities.OrderClasses.Address>();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(s => s.ShippingOption, s => s.MapFrom(o => o.ShippingOption.ShortName))
                .ForMember(s => s.ShippingPrice, s => s.MapFrom(o => o.ShippingOption.Price));
            CreateMap<OrderItem, OrderItemDto>()
            .ForMember(d => d.ProductId, d => d.MapFrom(s => s.ItemOrdered.ProductItemId))
            .ForMember(d => d.ProductName, d => d.MapFrom(s => s.ItemOrdered.ProductName))
            .ForMember(d => d.PictureUrl, d => d.MapFrom(s => s.ItemOrdered.PictureUrl))
            .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
        }
    }
}