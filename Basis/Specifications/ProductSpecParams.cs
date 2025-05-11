namespace Basis.Specifications
{
    //the paramaeters for the product controller, when we get a list of products 
    public class ProductSpecParams
    {
        private const int MaxPageSize = 50; 

        //return the first page by default
        public int PageIndex {get; set;} = 1; 

        //client can override it and choose anything < 50
        private int _pageSize = 6; 

        public int PageSize 
        {
            get => _pageSize; 
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;  //even if > 50 is chosen, it will return 50 
        }

        public int? BrandId { get; set; }
        public int? TypeId { get; set; }
        public string Sort { get; set; }
        private string _search { get; set; }
        public string Search 
        { 
            get => _search; 
            set =>  _search = value.ToLower();
        }
    }
}
