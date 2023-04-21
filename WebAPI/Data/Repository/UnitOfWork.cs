using WebAPI.Data.Repository.IRepository;

namespace WebAPI.Data.Repository
{
	public class UnitOfWork : IUnitOfWork
	{
		private readonly DataContext _context;

		public ICityRepository City { get; private set; }
		public IUserRepository User { get; private set; }
		public UnitOfWork(DataContext context)
		{
			_context = context;
			City = new CityRepository(_context);
			User = new UserRepository(_context);
		}

		public async Task<bool> SaveAsync()
		{
			return await _context.SaveChangesAsync() > 0;
		}
	}
}
