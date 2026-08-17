using Application.Exceptions;
using Application.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TP1_REST_Vitek_Nicolas.Extensions;

namespace TP1_REST_Vitek_Nicolas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController(IOrderService service) : ControllerBase
    {
        private readonly IOrderService _service = service;

        /// <summary>Create a purchase order.</summary>
        /// <returns>The client given his ID.</returns>
        /// <response code="200">Order created successfully.</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(object))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateOrder()
        {
            try
            {
                int clientId = User.GetClientId();
                var result = await _service.CreateOrder(clientId);
                return new JsonResult(result);
            }
            catch (NonExistentIDException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>Returns a list of purchase orders within a specified date range.</summary>
        /// <param name="from">The start date of the range(yyyy/mm/dd).</param>
        /// <param name="to">The end date of the range(yyyy/mm/dd).</param>
        /// <returns>A JSON result containing the list of purchase orders within 
        /// the specified date range or a bad request if the dates are the same.</returns>
        /// <response code="200">Orders delivered successfully.</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(object))]
        public async Task<IActionResult> ShowBalance([FromQuery] DateTime from, [FromQuery] DateTime to)
        {
            try
            {
                var result = await _service.ShowBalance(from, to);
                return new JsonResult(result);
            }
            catch (SameDateException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>Devuelve el historial de órdenes del cliente autenticado.</summary>
        /// <returns>Lista de productos comprados por el cliente, agrupados por orden.</returns>
        /// <response code="200">Historial obtenido correctamente.</response>
        [Authorize]
        [HttpGet("my-orders")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetMyOrders()
        {
            int clientId = User.GetClientId();
            var result = await _service.GetMyOrders(clientId);
            return new JsonResult(result);
        }
    }
}
