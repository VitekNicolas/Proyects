using Application.Exceptions;
using Application.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TP1_REST_Vitek_Nicolas.Extensions;

namespace TP1_REST_Vitek_Nicolas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController(ICartService service) : ControllerBase
    {
        private readonly ICartService _service = service;

        /// <summary>Devuelve el carrito activo del cliente autenticado, con sus productos y el total.</summary>
        /// <returns>El carrito con sus items.</returns>
        /// <response code="200">Carrito obtenido correctamente.</response>
        /// <response code="400">El cliente no tiene un carrito activo.</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(object))]
        public async Task<IActionResult> GetMyCart()
        {
            try
            {
                int clientId = User.GetClientId();
                var result = await _service.GetMyCart(clientId);
                return new JsonResult(result);
            }
            catch (NonExistentIDException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}