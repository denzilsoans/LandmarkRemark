using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LandmarkRemark.Entities;
using LandmarkRemark.Helpers;

namespace LandmarkRemark.Services
{
    public interface IRemarkService
    {
        Remark AddUserRemark(Remark userRemark);
        List<Remark> GetUserRemarks();
    }
    public class RemarkService : IRemarkService
    {
        private DataContext _context;

        public RemarkService(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Method Used to save a new Remark to the database
        /// </summary>
        /// <param name="userRemark">User Current Location Model received from the UI</param>
        /// <returns></returns>
        public Remark AddUserRemark(Remark userRemark)
        {
            _context.Remark.Add(userRemark);
            _context.SaveChanges();
            return userRemark;
        }

        /// <summary>
        /// Get the List of Remarks for all users from the database
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public List<Remark> GetUserRemarks()
        {
            return _context.Remark.ToList();
        }
    }
}
