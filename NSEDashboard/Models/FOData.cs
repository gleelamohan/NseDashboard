using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NSEDashboard.Models
{
    public class FOData
    {
        public string INSTRUMENT { get; set; }
        public string SYMBOL { get; set; }
        public string EXP_DATE { get; set; }
        public string OPT_TYPE { get; set; }
        public double STR_PRICE { get; set; }
        public double OPEN_PRICE { get; set; }
        public double HI_PRICE { get; set; }
        public double LO_PRICE { get; set; }
        public double CLOSE_PRICE { get; set; }
        public double OPEN_Int { get; set; }
        public double TRD_QTY { get; set; }
         public double NO_OF_CONT { get; set; }
        public double NO_OF_TRADE { get; set; }
        public double NOTION_VAL { get; set; }
        public double PR_VA { get; set; }

      
    }
}