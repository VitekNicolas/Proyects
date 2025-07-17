using Application.Interface;
using Application.Response;
using Microsoft.AspNetCore.Mvc;

namespace TP1_REST_Vitek_Nicolas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductController(IProductService service)
        {
            _service = service;
        }
        /// <summary>Retrieves a list of products filtered by name and optionally sorted.</summary>
        /// <param name="name">The name or partial name to filter the products by.</param>
        /// <param name="sort">Indicates whether to sort the products in ascending order by name.</param>
        /// <returns>A JSON result containing a list of filtered and/or sorted products.</returns>
        /// <response code="200">Product/s delivered successfully.</response>
        /// <response code="400">The product with that name dont exists</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(object))]        
        public async Task<ActionResult<IEnumerable<ProductResponse>>> GetAll([FromQuery] string name, [FromQuery] bool sort)
        {
            try
            {
                var result = await _service.GetAll(name,sort);
                return new JsonResult(result);
            }
            catch (NonExistentNameException ex)
            {
                return BadRequest(ex.message);
            }
        }
        /// <summary>Retrieves the details of a specific product by its unique identifier</summary>
        /// <param name="id">The unique identifier of the product.</param>
        /// <returns>
        /// A JSON result containing the product details if found, 
        /// or a bad request response if the product does not exist.
        /// </returns>
        /// <response code="200">Product delivered successfully.</response>
        /// <response code="400">The product dont exists.</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(object))]        
        public async Task<IActionResult> GetAll(int id)
        {
            try
            {
                var result = await _service.GetProduct(id);
                return new JsonResult(result);
            }
            catch (NonExistentIDException ex)
            {
                return BadRequest(ex.message);
            }
        }
    }
}