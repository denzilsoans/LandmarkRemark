using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace LandmarkRemark.Entities
{
    public class Remark
    {
        public int Id { get; set; }

        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }

        public string Notes { get; set; }

        public DateTime DateCreated { get; set; }

        public string Address { get; set; }

        public string Username { get; set; }
    }
}