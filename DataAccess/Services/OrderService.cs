using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Security.Policy;
using System.Threading.Tasks;
using Basis.Entities;
using Basis.Entities.OrderClasses;
using Basis.Interfaces;
using Basis.Specifications;

namespace DataAccess.Services
{
    public class OrderService : IOrderService
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IUnitOfWork _unitOfWork;
        public OrderService(IBasketRepository basketRepository, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _basketRepository = basketRepository;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int shippingOptionId, string basketId, Address shippingAddress)
        {
            // get the baksket from the basket repo
            var basket = await _basketRepository.GetBasketAsync(basketId);

            // get the items from the product repo
            // don't trust the prices from the client but check with the database 
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                // creates a new generic repository for product (in _repositories hashtables)
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.Photos.FirstOrDefault(x => x.IsMain)?.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            // get the shipping option from repo
            // generate a new repo for shipping option
            var shippingOption = await _unitOfWork.Repository<ShippingOption>().GetByIdAsync(shippingOptionId);

            // calculate the subtotal - the items * quantity
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            //create order 
            // another repository added to _repositories 
            var order = new Order(items, buyerEmail, shippingAddress, shippingOption, subtotal);
            _unitOfWork.Repository<Order>().Add(order);

            // save order to the db
            var result = await _unitOfWork.Complete();

            // if nothing has been saved in the db
            if (result <= 0) return null;

            // if order is saved => delete the basket 
            await _basketRepository.DeleteBasketAsync(basketId);
            
            // return the order
            return order;
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrderForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);

            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }

        public async Task<IReadOnlyList<ShippingOption>> GetShippingOptionsAsync()
        {
            return await _unitOfWork.Repository<ShippingOption>().ListAllAsync();
        }
    }
}