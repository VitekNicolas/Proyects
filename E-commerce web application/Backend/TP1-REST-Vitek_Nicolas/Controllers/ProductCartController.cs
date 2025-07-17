using Application.Interface;
using Application.Models;
using Microsoft.AspNetCore.Mvc;

namespace TP1_REST_Vitek_Nicolas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCartController : ControllerBase
    {
        private readonly IProductCartService _service;

        public ProductCartController(IProductCartService service)
        {
            _service = service;
        }
        /// <summary>Delete a product cart.</summary>
        /// <param name="clientId">Client ID.</param>
        /// <param name="productId">Product ID.</param>
        /// <returns>The product cart object that was deleted.</returns>
        /// <response code="200">ProductCart deleted successfully.</response>
        /// <response code="400">There is no productCart for that
        /// clientId or productId</response>
        [HttpDelete("{clientId}/{productId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(object))]        
        public async Task<IActionResult> DeletedProductcart(int clientId, int productId)
        {
            try
            {
                var result = await _service.DeleteProductCart(clientId, productId);
                return new JsonResult(result);
            }
            catch (NonExistentIDException ex)
            {
                return BadRequest(ex.message);
            }
        }
        /// <summary>Update a product cart.</summary>
        /// <returns>The product cart object that was updated.</returns>
        /// <response code="200">ProductCart updated successfully.</response>
        /// <response code="400">There is no productCart for that productId</response>
        [HttpPatch]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(object))]        
        public async Task<IActionResult> UpdateProductCart(ProductCartRequest request)
        {
            try
            {
                var result = await _service.UpdateProductCart(request);
                return new JsonResult(result);
            }
            catch (NonExistentIDException ex)
            {
                return BadRequest(ex.message);
            }
        }
        /// <summary>Create a product cart.</summary>
        /// <returns>The product cart object that was created.</returns>
        /// <response code="200">ProductCart created successfully.</response>
        /// <response code="400">There is no client for that clientId</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(object))]        
        public async Task<IActionResult> CreateProductcart(ProductCartRequest request)
        {
            try
            {
                var result = await _service.CreateProductCart(request);
                return new JsonResult(result);
            }
            catch (NonExistentIDException ex)
            {
                return BadRequest(ex.message);
            }
        }
    }
}