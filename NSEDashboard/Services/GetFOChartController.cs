using NSEDashboard.Business;
using NSEDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NSEDashboard.Services
{
    public class GetFOChartController : ApiController
    {
        NSEBusiness BAL = new NSEBusiness();
        public IHttpActionResult Get([FromUri]string symbol
            ,string expdate, string opttype, string strtype)
         {

            FoInputModel sym= new FoInputModel();

            sym.EXP_DATE = expdate;
            sym.OPT_TYPE = opttype;
            sym.SYMBOL = symbol;
            sym.STR_PRICE = strtype;


            var data = BAL.GetFOTwentyRecord(sym);
            return Ok(new { data });
        }
    }
}
