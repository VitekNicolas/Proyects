using System.Security.Claims;

namespace TP1_REST_Vitek_Nicolas.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static int GetClientId(this ClaimsPrincipal user)
        {
            var claim = user.FindFirst("clientId");
            if (claim == null || !int.TryParse(claim.Value, out int clientId))
            {
                throw new UnauthorizedAccessException("Token inválido: falta el clientId.");
            }
            return clientId;
        }
    }
}