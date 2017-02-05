using System;
using System.Data.SqlClient;
using System.Data.OleDb;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.VisualBasic.FileIO;
using System.Web.Http.Description;
using NSEDashboard.Business;
using NSEDashboard.Models;
using System.Configuration;

namespace NSEDashboard
{
    public class NSEUploadController : ApiController
    {
        NSEBusiness BAL = new NSEBusiness();
        // GET api/<controller>
        //public IHttpActionResult Get(string name, string fullname, List<string> dates)
        public IHttpActionResult Get([FromUri] NSEInput location)
        {
          
           var data= BAL.GetPDData(location);
            return Ok(new { data });
        }

        // GET api/<controller>/5
        public List<string> Get(int id)
        {
            List<string> pdData = new List<string>();

            string connectionString = ConfigurationManager.ConnectionStrings["NseConfig"].ConnectionString;
            string SqlString = "SELECT distinct TOP 6 UPLOAD_DATE FROM [eqsharedb].[dbo].[pdshare] order by UPLOAD_DATE desc";

            using (var conn = new SqlConnection(connectionString))
            {
                SqlDataAdapter sda = new SqlDataAdapter(SqlString, conn);
                DataTable dt = new DataTable();

                conn.Open();
                sda.Fill(dt);


                foreach (DataRow row in dt.Rows)
                {
                    pdData.Add(DateTime.Parse(row["UPLOAD_DATE"].ToString()).ToShortDateString());

                }
            }

            return pdData;
        }

        // POST api/<controller>
        public IHttpActionResult Post([FromBody]List<UploadData> value)
        {

            switch(value[0].uploadId)
            {
                case "pd": BAL.InsertPDData(value); break;
                case "bc": BAL.InsertBCData(value);break;
            }

          

            return Ok(new { HttpStatusCode.OK });
        }

 

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }

    
    }

    
}