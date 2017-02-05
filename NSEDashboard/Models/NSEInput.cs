using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NSEDashboard.Models
{
    public class NSEInput
    {
        public string name { get; set; }
        public string fullname { get; set; }
        public string high52 { get; set; }
        public string low52 { get; set; }
        public string trades { get; set; }
        public string gainer_losser { get; set; }
        public string gainRs { get; set; }
        public string gainPer { get; set; }
        public string cDate1 { get; set; }
        public string cDate2 { get; set; }

    }
}