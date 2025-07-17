using System.Linq.Expressions;
using Application.Exceptions;
using Application.Interface;
using Application.Models;
using Microsoft.AspNetCore.Mvc;

namespace TP1_REST_Vitek_Nicolas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _service;
        public ClientController(IClientService service)
        {
            _service = service;
        }
        /// <summary>Returns a client.</summary>
        /// <param name="id">Client ID.</param>
        /// <returns>The client given his ID.</returns>
        /// <response code="200">Client delivered successfully.</response>
        /// <response code="400">The client dont exists.</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(object))]
        public async Task<IActionResult> GetAll(int id)
        {
            try
            {
                var result = await _service.GetAll(id);
                return new JsonResult(result);
            }
            catch (NonExistentIDException ex)
            {
                return BadRequest(ex.message);
            }
        }
        /// <summary>Create a client.</summary>
        /// <returns>The object client recently created</returns>
        /// <response code="200">Client created successfully.</response>
        /// <response code="400">Validation error. The dni must be between 1000000 and 99999999.</response>
        /// <response code="400">Validation error. The dni entered already exists.</response>
        [HttpPost, ActionName("Crear cliente")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(object))]
        public async Task<IActionResult> CreateClient(ClientRequest request)
        {
            try
            {
                var result = await _service.CreateClient(request);
                return new JsonResult(result);
            }
            catch (DuplicateDniException ex)
            {
                return BadRequest(ex.message);
            }
            catch (InvalidDniException ex)
            {
                return BadRequest(ex.message);
            }
        }
    }
}