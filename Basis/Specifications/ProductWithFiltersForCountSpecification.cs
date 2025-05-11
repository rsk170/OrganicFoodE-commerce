using Basis.Entities;

namespace Basis.Specifications
{
    //get the count of items to populate in the pagination class 
    public class ProductWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecification(ProductSpecParams productParams)
              : base(x => 
                (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower()
                .Contains(productParams.Search)) && 
                (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
                (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
            )
        {

        }
    }
}