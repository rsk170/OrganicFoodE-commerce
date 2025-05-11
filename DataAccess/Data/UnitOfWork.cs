using System;
using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Basis.Entities;
using Basis.Interfaces;

namespace DataAccess.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _context;

        // any repositories used inside the unit of work will be stored in this hash table 
        private Hashtable _repositories;

        public UnitOfWork(StoreContext context)
        {
            _context = context;
        }

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        // give type of the entity to method
        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            // check if we have anything inside the repositories (hashtable)
            if (_repositories == null) 
                _repositories = new Hashtable();

            // get the type of TEntity and see what it actually is
            var type = typeof(TEntity).Name;

            // check if the hashtable contains an entry for the entity with this specific name
            if (!_repositories.ContainsKey(type))
            {
                var repositoryType = typeof(GenericRepository<>);

                // if no repository for the part type - create it
                var repositoryInstance = Activator
                .CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), _context);

                // add a new entry to the hashtable
                // hashtable stores all of the repos in use inside the unit of work 
                _repositories.Add(type, repositoryInstance);
            }

            return (IGenericRepository<TEntity>) _repositories[type]; 
        }
    }
}