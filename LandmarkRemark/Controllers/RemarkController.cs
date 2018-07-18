using System.Diagnostics;
using LandmarkRemark.Entities;
using LandmarkRemark.Helpers;
using LandmarkRemark.Services;
using Microsoft.AspNetCore.Mvc;

namespace LandmarkRemark.Controllers
{
    public class RemarkController : Controller
    {
        private static readonly log4net.ILog logger =
                            log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private IRemarkService _remarkService;
        public RemarkController(IRemarkService remarkService)
        {
            _remarkService = remarkService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetUserLocations()
        {
            try
            {
                var currentUser = _remarkService.GetUserRemarks();
               
                return this.Ok(new { location = currentUser });
            }
            catch (AppException ex)
            {
                logger.Error(ex);
                return BadRequest("Unable to process your request.");
            }
        }

        [HttpPost]
        public IActionResult AddUserLocation([FromBody]Remark remarkData)
        {
            try
            {
                var createdRemark = _remarkService.AddUserRemark(remarkData);
            return this.Ok(new { userLocation = createdRemark });
            }
            catch (AppException ex)
            {
                logger.Error(ex);
                return this.BadRequest("Unable to process your request.");
            }
        }
    }
}
