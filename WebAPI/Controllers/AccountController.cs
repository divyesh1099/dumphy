using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.Data.Repository.IRepository;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Controllers
{
	public class AccountController : BaseController
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IUserRepository _userRepository;
		private readonly IConfiguration _configuration;
        public AccountController(IUnitOfWork unitOfWork, IUserRepository userRepository, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
			_userRepository = userRepository;
			_configuration = configuration;
        }

		[HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDTO loginRequestDTO)
		{
			var userFromDb = await _unitOfWork.User.Authenticate(loginRequestDTO.UserName, loginRequestDTO.Password);
			if(userFromDb == null)
			{
				return NotFound();
			}
			var loginResponseDTO = new LoginResponseDTO();
			loginResponseDTO.UserName = userFromDb.UserName;
			loginResponseDTO.Token = CreateJWT(userFromDb);
			return Ok(loginResponseDTO);
		}

		private string CreateJWT(User user)
		{
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["SecretKey"]));
			var claims = new Claim[]
			{
				new Claim(ClaimTypes.Name, user.UserName),
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
			};
			var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims),
				Expires = DateTime.UtcNow.AddDays(10),
				SigningCredentials = signingCredentials
			};
			var tokenHandler = new JwtSecurityTokenHandler();
			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}
	}
}
