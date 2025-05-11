using System;
using System.Text.Json;
using System.Threading.Tasks;
using Basis.Entities;
using Basis.Interfaces;
using StackExchange.Redis;

namespace DataAccess.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _database;
        public BasketRepository(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            return await _database.KeyDeleteAsync(basketId); 
        }

        public async Task<Basket> GetBasketAsync(string basketId)
        {
            var data = await _database.StringGetAsync(basketId);
            return data.IsNullOrEmpty ? null  : JsonSerializer.Deserialize<Basket>(data);
        }

        public  async Task<Basket> UpdateBasketAsync(Basket basket)
        {
            // replace the existing string with the new version 
            var created = await _database.StringSetAsync(basket.Id, 
            JsonSerializer.Serialize(basket), TimeSpan.FromDays(30));

            if(!created) return null;

            return await GetBasketAsync(basket.Id);
        }
    }
}