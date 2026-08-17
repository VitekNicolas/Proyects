using Application.Exceptions;
using Application.Interface;
using Application.Interface.Models;
using Microsoft.AspNetCore.Mvc;

namespace TP1_REST_Vitek_Nicolas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;

        public AuthController(IAuthService service)
        {
            _service = service;
        }

        /// <summary>Registra un cliente nuevo con email y contraseña, y le crea su carrito inicial.</summary>
        /// <param name="request">Datos del cliente a registrar.</param>
        /// <returns>El cliente creado.</returns>
        /// <response code="200">Cliente registrado correctamente.</response>
        /// <response code="400">DNI o email inválido/duplicado.</response>
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(object))]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            try
            {
                var result = await _service.Register(request);
                return new JsonResult(result);
            }
            catch (DuplicateDniException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidDniException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (DuplicateEmailException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>Inicia sesión con email y contraseña.</summary>
        /// <param name="request">Credenciales de acceso.</param>
        /// <returns>Los datos del cliente autenticado.</returns>
        /// <response code="200">Login exitoso.</response>
        /// <response code="400">Email o contraseña incorrectos.</response>
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(object))]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            try
            {
                var result = await _service.Login(request);
                return new JsonResult(result);
            }
            catch (InvalidCredentialsException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}