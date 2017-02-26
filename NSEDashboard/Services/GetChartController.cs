using NSEDashboard.Business;
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
