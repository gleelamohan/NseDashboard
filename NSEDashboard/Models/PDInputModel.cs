using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NSEDashboard.Models
{
    public class PDInputModel
    {
        public string name { get; set; }
        public string fullname { get; set; }
        public List<string > dates { get; set; }
    }
}