using System;
using System.Linq;
using Basis.Entities;
using Basis.Specifications;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Data
{
    //constrain only to use with the entity classes 
    public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery,
        ISpecification<TEntity> spec)
        {
            // a product will be stored in the variable query
            var query = inputQuery;

            //evaluate what is in the specification 
            if (spec.Criteria != null)
            {
                query = query.Where(spec.Criteria); // example: p => p.ProductTypeId == id
            }

            if (spec.OrderBy != null)
            {
                query = query.OrderBy(spec.OrderBy);
    
            }

            if (spec.OrderByDescending != null)
            {
                query = query.OrderByDescending(spec.OrderByDescending);
            }

            //paging needs to come after sorting and filtering 
            if (spec.IsPagingEnabled)
            {
                query = query.Skip(spec.Skip).Take(spec.Take);
            }

            query = spec.Includes.Aggregate(query, (current, include) => current.Include(include));

            return query;
        }
    }
}