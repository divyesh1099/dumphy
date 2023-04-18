using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Linq;
using WebAPI.Data.Repository.IRepository;

namespace WebAPI.Data.Repository
{
	public class Repository<T>: IRepository<T> where T : class
	{
		private readonly DataContext _db;
		internal DbSet<T> dbSet;
		public Repository(DataContext db)
		{
			_db = db;
			this.dbSet = _db.Set<T>();
			//_db.Products.Include(u => u.Category);
		}
		public void Add(T entity)
		{
			dbSet.AddAsync(entity);
		}

		public async Task<T> GetAsync(Expression<Func<T, bool>> filter, string? includeProperties = null, bool tracked = false)
		{
			if (tracked)
			{
				IQueryable<T> query = dbSet;
				query = query.Where(filter);
				if (!string.IsNullOrEmpty(includeProperties))
				{
					foreach (var includeProp in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
					{
						query = query.Include(includeProp);
					}
				}
				return await query.FirstOrDefaultAsync();
			}
			else
			{
				IQueryable<T> query = dbSet.AsNoTracking();
				query = query.Where(filter);
				if (!string.IsNullOrEmpty(includeProperties))
				{
					foreach (var includeProp in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
					{
						query = query.Include(includeProp);
					}
				}
				return await query.FirstOrDefaultAsync();
			}

		}

		//Category, CoverType
		/*public IEnumerable<T> GetAll(Expression<Func<T, bool>>? filter, string? includeProperties = null)
		{
			IQueryable<T> query = dbSet;
			if (filter != null)
			{
				query = query.Where(filter);
			}
			if (!string.IsNullOrEmpty(includeProperties))
			{
				foreach (var includeProp in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
				{
					query = query.Include(includeProp);
				}
			}
			return query.ToList();
		}*/

		public async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null, string? includeProperties = null)
		{
			IQueryable<T> query = dbSet;
			if (filter != null)
			{
				query = query.Where(filter);
			}
			if (!string.IsNullOrEmpty(includeProperties))
			{
				foreach (var includeProp in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
				{
					query = query.Include(includeProp);
				}
			}
			return await query.ToListAsync();
		}

		public void Remove(T entity)
		{
			dbSet.Remove(entity);
		}

		public void RemoveRange(IEnumerable<T> entities)
		{
			dbSet.RemoveRange(entities);
		}
	}
}
