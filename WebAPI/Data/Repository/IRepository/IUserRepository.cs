using WebAPI.Models;

namespace WebAPI.Data.Repository.IRepository
{
	public interface IUserRepository: IRepository<User>
	{
		Task<User> Authenticate(string username, string password);
	}
}
