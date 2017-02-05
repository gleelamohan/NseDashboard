using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NSEDashboard.Models
{
    public class PDModelData
    {
        public List<PDData> lstDate0 { get; set; }
        public List<PDData> lstDate1 { get; set; }
        public List<PDData> lstDate2 { get; set; }
        public List<PDData> lstDate3 { get; set; }
        public List<PDData>  lstDate4 { get; set; }
        public List<PDData> lstDate5 { get; set; }
        public List<PDData> lstDate6 { get; set; }    
        public List<PDData> lstDate7 { get; set; }

        public List<string> sectorInfo { get; set; }

        public List<string> lastFiveDates { get; set; }
    }
}