using FoodApplication.Models;
using System.Security.Claims;

namespace FoodApplication.Respository
{
    public interface IData
    {
        Task<ApplicationUser> GetUser(ClaimsPrincipal claims);
    }
}
