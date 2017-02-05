using NSEDashboard.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NSEDashboard.Controllers
{
    public class GetChartController : ApiController
    {
        NSEBusiness BAL = new NSEBusiness();
        public IHttpActionResult Get([FromUri]string symbol)
        {

            var data = BAL.GetTwentyRecord(symbol);
            return Ok(new { data });
        }
    }


}
