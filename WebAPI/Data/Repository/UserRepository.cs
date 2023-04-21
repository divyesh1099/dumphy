using Microsoft.EntityFrameworkCore;
using WebAPI.Data.Repository.IRepository;
using WebAPI.Models;

namespace WebAPI.Data.Repository
{
	public class UserRepository : Repository<User>, IUserRepository
	{
		private readonly DataContext _dataContext;
		public UserRepository(DataContext dataContext) : base(dataContext)
		{
			_dataContext = dataContext;
		}

		public async Task<User> Authenticate(string username, string password)
		{
			return await _dataContext.Users.FirstOrDefaultAsync(u=>u.UserName == username && u.Password == password);
		}
	}
}
