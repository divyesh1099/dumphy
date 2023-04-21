using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Data.Repository.IRepository;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Controllers
{
	[Authorize]
	public class CityController : BaseController
	{
		private readonly ICityRepository _cityRepository;
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
		public CityController(DataContext dataContext, ICityRepository cityRepository, IUnitOfWork unitOfWork, IMapper mapper)
		{
			_cityRepository = cityRepository;
			_unitOfWork = unitOfWork;
			_mapper = mapper;


		}
		[HttpGet]
		public async Task<IActionResult> GetCities()
		{
			var cities = await _cityRepository.GetAllAsync();
			var citiesDTO = _mapper.Map<IEnumerable<CityDTO>>(cities);
			return Ok(citiesDTO);
		}

		[HttpPost("addCity")]
		public async Task<IActionResult> AddCity(CityDTO cityDTO)
		{
			var city = new City
			{
				Name = cityDTO.Name,
				LastUpdated = DateTime.Now,
				LastUpdatedBy = Guid.NewGuid().ToString()
			};
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

		[HttpPost("update/{id}")]
		public async Task<IActionResult> UpdateCity(int id, CityDTO cityDTO)
		{
			City cityFromDb = await _cityRepository.GetAsync(u => u.Id == id);
			if(cityFromDb != null)
			{
				cityFromDb.Name = cityDTO.Name;
				cityFromDb.LastUpdated = DateTime.Now;
				cityFromDb.LastUpdatedBy = Guid.NewGuid().ToString();
				await _unitOfWork.City.UpdateAsync(cityFromDb);
				await _unitOfWork.SaveAsync();
				return Ok(cityDTO);
			}
			return NotFound();
		}
	}
}
