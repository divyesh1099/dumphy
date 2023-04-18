using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data
{
	public class DataContext: DbContext
	{
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
            
        }
        public DbSet<City> Cities { get; set; }
		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<City>().HasData(
                new City { Id = 4, Name = "Kalamboli" },
                new City { Id = 1, Name = "Canada" },
                new City { Id = 2, Name = "New York" },
                new City { Id = 3, Name = "Navi Mumbai" }
				);
        }

	}
}
