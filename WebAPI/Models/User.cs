using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
	public class User
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public required string UserName { get; set; }

		[Required]
		public required string Password { get; set; }
	}
}
