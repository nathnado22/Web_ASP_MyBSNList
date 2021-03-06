﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ASP_MyBSNList.Controllers.Database;
using ASP_MyBSNList.Models;

namespace ASP_MyBSNList.Controllers.Api
{
    [RoutePrefix("api/occupations")]
    public class OccupationsController : ApiController
    {
        [HttpGet]
        [Route("")]
        public IEnumerable<Occupation> GetOccupations()
        {
            var dbOccupations = DbController.Context.Occupations.ToList();

            return dbOccupations;
        }
    }
}
