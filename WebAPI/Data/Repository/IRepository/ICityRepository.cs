using WebAPI.Models;

namespace WebAPI.Data.Repository.IRepository
{
	public interface ICityRepository: IRepository<City>
	{
		Task<bool> UpdateAsync(City city);
	}
}
