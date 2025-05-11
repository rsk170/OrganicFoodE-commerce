using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Basis.Entities.OrderClasses;

namespace Basis.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(string buyerEmail, int ShippingOption, string basketId, Address ShippingAddress);
        Task<IReadOnlyList<Order>> GetOrderForUserAsync(string buyerEmail);
        Task<Order> GetOrderByIdAsync(int id, string buyerEmail);
        Task<IReadOnlyList<ShippingOption>> GetShippingOptionsAsync();
    }
}