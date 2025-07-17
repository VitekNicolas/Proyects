using Application.Exceptions;
using Application.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TP1_REST_Vitek_Nicolas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _service;

        public OrderController(IOrderService service)
        {
            _service = service;
        }

        /// <summary>Create a purchase order.</summary>
        /// <param name="clientId">Client ID.</param>
        /// <returns>The client given his ID.</returns>
        /// <response code="200">Order created successfully.</response>
        [HttpPost("{clientId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(object))]       
        public async Task<IActionResult> CreateOrder(int clientId)
        {
            try
            {
                var result = await _service.CreateOrder(clientId);
                return new JsonResult(result);
            }
            catch (NonExistentIDException ex)
            {
                return BadRequest(ex.message);
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
        public async Task<IActionResult> ShowBalance([FromQuery]DateTime from, [FromQuery] DateTime to)
        {
            try
            {
                var result = await _service.ShowBalance(from, to);
                return new JsonResult(result);
            }
            catch (SameDateException ex)
            {
                return BadRequest(ex.message);
            }
        }
    }
}
