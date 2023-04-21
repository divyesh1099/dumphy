using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
	public class City
	{
		[Key]
		public int Id { get; set; }
		[Required(ErrorMessage ="Name is a mandatory field")]
		public string Name { get; set; }
		public DateTime? LastUpdated { get; set; }
		public string? LastUpdatedBy { get; set; }
	}
}
