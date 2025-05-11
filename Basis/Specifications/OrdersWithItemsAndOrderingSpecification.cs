using Basis.Entities.OrderClasses;

namespace Basis.Specifications
{
    public class OrdersWithItemsAndOrderingSpecification : BaseSpecification<Order>
    {
        // list of orders
        public OrdersWithItemsAndOrderingSpecification(string email) : base(o => o.BuyerEmail == email)
        {
            // eager load order items and shipping option (they are a part of the order entity)
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.ShippingOption);
            AddOrderByDescending(o => o.OrderDate);
        }

        // get individual order
        public OrdersWithItemsAndOrderingSpecification(int id, string email) 
            : base(o => o.Id == id && o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.ShippingOption);
        }
    }
}