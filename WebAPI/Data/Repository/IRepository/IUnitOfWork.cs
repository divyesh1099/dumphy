namespace WebAPI.Data.Repository.IRepository
{
	public interface IUnitOfWork
	{
		ICityRepository City { get; }
		Task<bool> SaveAsync();
	}
}
