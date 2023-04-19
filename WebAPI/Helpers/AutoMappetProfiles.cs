using AutoMapper;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Helpers
{
	public class AutoMappetProfiles: Profile
	{
        public AutoMappetProfiles()
        {
            CreateMap<City, CityDTO>();
        }
    }
}
