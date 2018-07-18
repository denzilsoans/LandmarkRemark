using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using LandmarkRemark.Services;
using LandmarkRemark.Dtos;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using LandmarkRemark.Helpers;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using LandmarkRemark.Entities;
using Microsoft.AspNetCore.Authorization;

namespace LandmarkRemark.Controllers
{
    [Authorize]
    public class UsersController : Controller
    {
        private IUserService _userService;
        private IMapper _mapper;
        private static readonly log4net.ILog logger =
            log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public UsersController(
            IUserService userService,
            IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Authenticate([FromBody]UserDto userDto)
        {
            try
            {
                var user = _userService.Authenticate(userDto.Username, userDto.Password);

                if (user == null)
                    return Unauthorized();

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("Secret Text Required to create a secret key");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                //// return basic user info (without password) and token to store client side
                return Ok(new
                {
                    user.Id,
                    user.Username,
                    user.FirstName,
                    user.LastName,
                    Token = tokenString
                });
            }

            catch (AppException ex)
            {
                logger.Error(ex);
                return this.BadRequest("Unable to process your request.");
            }
        }
    }
}
