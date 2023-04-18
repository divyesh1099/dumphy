using WebAPI.Data.Repository.IRepository;
using WebAPI.Models;

namespace WebAPI.Data.Repository
{
	public class CityRepository : Repository<City>, ICityRepository
	{
		private readonly DataContext _db;
		public CityRepository(DataContext db) : base(db)
		{
			_db = db;
		}

		public async Task<bool> UpdateAsync(City city)
		{
			City cityFromDb = await _db.Cities.FindAsync(city.Id);
			if(cityFromDb != null)
			{
				cityFromDb.Name = city.Name;
			}
			cityFromDb.Name = city.Name;
			return await _db.SaveChangesAsync() > 0;
		}
	}
}
