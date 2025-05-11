using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Basis.Specifications
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>> Criteria { get; }
        List<Expression<Func<T, object>>> Includes { get; }
        Expression<Func<T, object>> OrderBy {get; }
        Expression<Func<T, object>> OrderByDescending {get; }

        // take a certain amount of products, skip some products, 
        int Take {get; }
        int Skip {get; }
        bool IsPagingEnabled {get; }
    }
}