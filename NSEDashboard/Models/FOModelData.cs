using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NSEDashboard.Models
{
    public class FOModelData
    {
        public List<FOData> lstDate0 { get; set; }
        public List<FOData> lstDate1 { get; set; }
        public List<FOData> lstDate2 { get; set; }
        public List<FOData> lstDate3 { get; set; }
        public List<FOData> lstDate4 { get; set; }
        public List<FOData> lstDate5 { get; set; }
     
        public List<string> lastFiveDates { get; set; }
    }
}