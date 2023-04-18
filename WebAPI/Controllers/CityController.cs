using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Data.Repository.IRepository;
using WebAPI.Models;

namespace WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CityController : ControllerBase
	{
		private readonly ICityRepository _cityRepository;
		private readonly IUnitOfWork _unitOfWork;
		public CityController(DataContext dataContext, ICityRepository cityRepository, IUnitOfWork unitOfWork)
		{
			_cityRepository = cityRepository;
			_unitOfWork = unitOfWork;
		}
		[HttpGet]
		public async Task<IActionResult> GetCities()
		{
			var cities = await _cityRepository.GetAllAsync();
			return Ok(cities);
		}

		[HttpPost("addCity")]
		public async Task<IActionResult> AddCity(City city)
		{
			_cityRepository.Add(city);
			await _unitOfWork.SaveAsync();
			/*City newCity = new City();
			newCity = city;
			await _dataContext.Cities.AddAsync(newCity);
			await _dataContext.SaveChangesAsync();*/
			return StatusCode(201);
		}

		[HttpPost("delete/{id}")]
		public async Task<IActionResult> DeleteCity(int id)
		{
			City cityFromDb = await _cityRepository.GetAsync(u=> u.Id == id);
			if(cityFromDb != null)
			{
				_cityRepository.Remove(cityFromDb);
				await _unitOfWork.SaveAsync();
				return Ok(id);
			}
			return NotFound();
		}
	}
}
