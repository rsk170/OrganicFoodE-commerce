using System;
using System.Collections.Generic;

namespace Basis.Entities.OrderClasses
{
    public class Order : BaseEntity
    {
        public Order()
        {
        }

        public Order(IReadOnlyList<OrderItem> orderItems, string buyerEmail, Address shippingAddress, ShippingOption shippingOption, decimal subtotal)
        {
            BuyerEmail = buyerEmail;
            ShippingAddress = shippingAddress;
            ShippingOption = shippingOption;
            OrderItems = orderItems;
            Subtotal = subtotal;
        }

        public string BuyerEmail { get; set; }
        public DateTimeOffset OrderDate {get; set; } = DateTimeOffset.Now;
        public Address ShippingAddress { get; set; }
        public ShippingOption ShippingOption { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public decimal Subtotal { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string PaymentIntentId { get; set; }

        public decimal GetTotal() {
            return Subtotal + ShippingOption.Price;
        }
    }
}