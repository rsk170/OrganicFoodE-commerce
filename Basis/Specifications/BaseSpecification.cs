using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Basis.Specifications
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        public BaseSpecification()
        {
        }

        //includes is not needed in the constructor 
        public BaseSpecification(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }

        public Expression<Func<T, bool>> Criteria { get; }

        //list of include statements that can be passed to method
        //set by default to an empty list to start initially
        public List<Expression<Func<T, object>>> Includes { get; } =
            new List<Expression<Func<T, object>>>();

        public Expression<Func<T, object>> OrderBy {get; private set; } //private set to set what this is inside the class 

        public Expression<Func<T, object>> OrderByDescending {get; private set; }

        public int Take {get; private set; }

        public int Skip {get; private set; }

        public bool IsPagingEnabled {get; private set; }

        // to add include statements to Include list above 
        protected void AddInclude(Expression<Func<T, object>> includeExpression)
        {
            Includes.Add(includeExpression);
        }

        protected void AddOrderBy(Expression<Func<T, object>> orderByExpression)
        {
            OrderBy = orderByExpression;
        }

        protected void AddOrderByDescending(Expression<Func<T, object>> orderByDescExpression)
        {
            OrderByDescending = orderByDescExpression;
        }

        protected void ApplyPaging(int skip, int take)
        {
            Skip = skip;
            Take = take;
            IsPagingEnabled = true;
        }
    }
}