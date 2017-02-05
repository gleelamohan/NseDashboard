using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NSEDashboard.Models
{
    public class Candalchart
    {        
        public double close { get; set; }
        public double low { get; set; }
        public double high { get; set; }
        public double open { get; set; }
        public double volume { get; set; }
        public double quantity { get; set; }
        public string date { get; set; }
    }
}