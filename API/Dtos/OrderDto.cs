using System.Data;

namespace API.Dtos
{
    public class OrderDto
    {
        public string BasketId {get; set;}
        public int ShippingOptionId {get; set;}
        public AddressDto ShippingAddress {get; set; }
    }
}