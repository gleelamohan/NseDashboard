﻿using System;
using System.Data.SqlClient;
using System.Data;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using NSEDashboard.Business;
using NSEDashboard.Models;
using System.Configuration;

namespace NSEDashboard.Controllers
{
    public class NSEFOController : ApiController
    {
        NSEBusiness BAL = new NSEBusiness();
        // GET api/<controller>
        public IHttpActionResult Get([FromUri] FOInput location)
        {
            var data = BAL.GetFOData(location);
            return Ok(new { data });
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
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