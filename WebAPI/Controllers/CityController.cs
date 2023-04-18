using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CityController : ControllerBase
	{
		private readonly DataContext _dataContext;
		public CityController(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpGet]
		public async Task<IActionResult> GetCities()
		{
			var cities = await _dataContext.Cities.ToListAsync();
			return Ok(cities);
		}

		[HttpPost("addCity")]
		public async Task<IActionResult> AddCity(City city)
		{
			City newCity = new City();
			newCity = city;
			await _dataContext.Cities.AddAsync(newCity);
			await _dataContext.SaveChangesAsync();
			return Ok(newCity);
		}

		[HttpPost("delete/{id}")]
		public async Task<IActionResult> DeleteCity(int id)
		{
			City cityFromDb = await _dataContext.Cities.FindAsync(id);
			if(cityFromDb != null)
			{
				var removedid = _dataContext.Cities.Remove(cityFromDb);
				await _dataContext.SaveChangesAsync();
				return Ok(removedid);

			}
			return NotFound();
		}
	}
}
