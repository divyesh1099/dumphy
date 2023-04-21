namespace WebAPI.Data.Repository.IRepository
{
	public interface IUnitOfWork
	{
		ICityRepository City { get; }
		IUserRepository User { get; }
		Task<bool> SaveAsync();
	}
}
