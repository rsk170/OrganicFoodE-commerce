using System;
using System.Threading.Tasks;
using System.Transactions;
using Basis.Entities;

namespace Basis.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        // interface for the generic repository
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
        
        // returns the number of changes to the database 
        Task<int> Complete();
    }
}