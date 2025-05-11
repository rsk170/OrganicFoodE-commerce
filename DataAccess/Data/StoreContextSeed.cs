using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Basis.Entities;
using Basis.Entities.OrderClasses;
using Microsoft.Extensions.Logging;

namespace DataAccess.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.ProductBrands.Any())
                {
                    var brandsData =
                        File.ReadAllText("../DataAccess/Data/SeedData/brands.json");

                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);

                    foreach (var item in brands)
                    {
                        context.ProductBrands.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.ProductTypes.Any())
                {
                    var typesData =
                        File.ReadAllText("../DataAccess/Data/SeedData/types.json");

                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);

                    foreach (var item in types)
                    {
                        context.ProductTypes.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    var productsData =
                        File.ReadAllText("../DataAccess/Data/SeedData/products.json");

                    var products = JsonSerializer.Deserialize<List<ProductSeedModel>>(productsData);

                    foreach (var item in products)
                    {
                        var pictureFileName = item.PictureUrl.Substring(16);
                        var product = new Product
                        {
                            Name = item.Name,
                            Description = item.Description,
                            Price = item.Price,
                            ProductBrandId = item.ProductBrandId,
                            ProductTypeId = item.ProductTypeId
                        };
                        product.AddPhoto(item.PictureUrl, pictureFileName);
                        context.Products.Add(product);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.ShippingOptions.Any())
                {
                    var shippingData =
                        File.ReadAllText("../DataAccess/Data/SeedData/delivery.json");

                    var shippingOptions = JsonSerializer.Deserialize<List<ShippingOption>>(shippingData);

                    foreach (var option in shippingOptions)
                    {
                        context.ShippingOptions.Add(option);
                    }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}