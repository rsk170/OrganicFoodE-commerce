using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Basis.Entities;
using Basis.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepo;
        private readonly IMapper _mapper;
        public BasketController(IBasketRepository basketRepo, IMapper mapper)
        {
            _mapper = mapper;
            _basketRepo = basketRepo;
        }

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasketById(string id)
        {
            var basket = await _basketRepo.GetBasketAsync(id);
            return Ok(basket ?? new Basket(id));
        }

        [HttpPost]
        public async Task<ActionResult<Basket>> UpdateBasket(BasketDto basket)
        {
            var customerBasket = _mapper.Map<BasketDto, Basket>(basket);
            var updatedBasket = await _basketRepo.UpdateBasketAsync(customerBasket);
            return Ok(updatedBasket);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {
            await _basketRepo.DeleteBasketAsync(id);
        }
    }
}