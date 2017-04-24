using Microsoft.VisualBasic.FileIO;
using NSEDashboard.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;

namespace NSEDashboard.Business
{
    public class NSEBusiness
    {
        private List<string> LstDates = new List<string>();
        public PDModelData GetPDData(NSEInput location)
        {
            PDModelData lstModel = new PDModelData();

            lstModel.lastFiveDates = GetLastFiveDates();

            LstDates = lstModel.lastFiveDates;

            if (LstDates != null && LstDates.Count > 0)
            {
                var lstSymbol = getData(location, LstDates[0]);

                lstModel.lstDate0 = new List<PDData>();
                lstModel.lstDate1 = new List<PDData>();
                lstModel.lstDate2 = new List<PDData>();
                lstModel.lstDate3 = new List<PDData>();
                lstModel.lstDate4 = new List<PDData>();
                lstModel.lstDate5 = new List<PDData>();
                lstModel.lstDate6 = new List<PDData>();
                lstModel.lstDate7 = new List<PDData>();


                foreach (DataRow row in lstSymbol.Rows)
                {
                    lstModel.lstDate1.Add(getPDDate(row["SYMBOL"].ToString(), LstDates[0]));
                    lstModel.lstDate2.Add(getPDDate(row["SYMBOL"].ToString(), LstDates[1]));
                    lstModel.lstDate3.Add(getPDDate(row["SYMBOL"].ToString(), LstDates[2]));
                    lstModel.lstDate4.Add(getPDDate(row["SYMBOL"].ToString(), LstDates[3]));
                    lstModel.lstDate5.Add(getPDDate(row["SYMBOL"].ToString(), LstDates[4]));
                    lstModel.lstDate0.Add(getPDDate(row["SYMBOL"].ToString(), LstDates[5]));
                    lstModel.lstDate6.Add(getPDDate(row["SYMBOL"].ToString(), location.cDate1));
                    lstModel.lstDate7.Add(getPDDate(row["SYMBOL"].ToString(), location.cDate2));
                }

                lstModel.sectorInfo = GetSector();
            }
          
            return lstModel;
        }

        public List<string> GetLastFiveDates()
        {
            List<string> pdData = new List<string>();

            string connectionString = ConfigurationManager.ConnectionStrings["NseConfig"].ConnectionString;
            string SqlString = "SELECT distinct TOP 6 UPLOAD_DATE FROM [eqsharedb].[dbo].[pdshare] order by UPLOAD_DATE desc";

            using (var conn = new SqlConnection(connectionString))
            {
                SqlDataAdapter sda = new SqlDataAdapter(SqlString, conn);
                DataTable dt = new DataTable();
                try
                {
                    conn.Open();
                    sda.Fill(dt);
                }
                catch (SqlException se)
                {
                }

                foreach (DataRow row in dt.Rows)
                {
                    pdData.Add(DateTime.Parse( row["UPLOAD_DATE"].ToString()).ToShortDateString());

                }
            }

            return pdData;
        }

        private PDData getPDDate(string Symbol, string dte)
        {
            PDData pdData = new PDData();

            string connectionString = ConfigurationManager.ConnectionStrings["NseConfig"].ConnectionString;
            string SqlString = "SELECT (Select Top 20 SUM(((CLOSE_PRICE-PREV_CL_PR)/PREV_CL_PR)*100) from [pdshare] i where i.SYMBOL =[pdshare].[SYMBOL]) Sum_Avg_20, (Select Top(1) EX_DT from bcshare where SYMBOL=[pdshare].[SYMBOL] order by upload_date desc)  ExDate,(Select Top(1) PURPOSE from bcshare where SYMBOL=[pdshare].[SYMBOL] order by upload_date desc) Purpose,* FROM PDSHARE where SYMBOL LIKE '" + Symbol + "' and upload_date = '"+Convert.ToDateTime( dte )+ "' ";

            using (var conn = new SqlConnection(connectionString))
            {
                SqlDataAdapter sda = new SqlDataAdapter(SqlString, conn);
                DataTable dt = new DataTable();
                try
                {
                    conn.Open();
                    sda.Fill(dt);
                }
                catch (SqlException se)
                {
                }

                foreach (DataRow row in dt.Rows)
                {
                    string Exdate = String.Empty;
                    if (row["ExDate"].ToString() != "")
                    {
                        string format = "dd/MM/yyyy";
                        var result = DateTime.ParseExact(row["ExDate"].ToString(), format, CultureInfo.InvariantCulture);

                        if(result >= System.DateTime.Now)
                        {
                            Exdate = row["ExDate"].ToString();
                        }
                    }
                        pdData.Ex_date = Exdate;
                    pdData.Top_Avg_20 = row["Sum_Avg_20"].ToString();
                    pdData.Purpose = row["Purpose"].ToString();
                        //row["ExDate"].ToString()!=""? Convert.ToDateTime( row["ExDate"].ToString()) > System.DateTime.Now?  row["ExDate"].ToString():"":"" ;
                    pdData.SECURITY = row["SECURITY"].ToString();
                    pdData.SYMBOL = row["SYMBOL"].ToString();
                    pdData.SERIES = row["SERIES"].ToString();
                    pdData.MKT = row["MKT"].ToString();
                    pdData.OPEN_PRICE = Convert.ToDouble(row["OPEN_PRICE"].ToString());
                    pdData.PREV_CLOSE = Convert.ToDouble(row["PREV_CL_PR"].ToString());
                    pdData.CLOSE_PRICE = Convert.ToDouble(row["CLOSE_PRICE"].ToString());
                    pdData.HIGH_PRICE = Convert.ToDouble(row["HIGH_PRICE"].ToString());
                    pdData.HI_52_WK = Convert.ToDouble(row["HI_52_WK"].ToString());
                    pdData.IND_SEC = row["IND_SEC"].ToString();
                    pdData.LOW_PRICE = Convert.ToDouble(row["LOW_PRICE"].ToString());
                    pdData.NET_TRDQTY = Convert.ToDouble(row["NET_TRDQTY"].ToString());
                    pdData.NET_TRDVAL = Convert.ToDouble(row["NET_TRDVAL"].ToString());
                    pdData.TRADES = Convert.ToInt64(row["TRADES"].ToString());
                    pdData.LO_52_WK = Convert.ToDouble(row["LO_52_WK"].ToString());
                    pdData.CORP_IND = row["CORP_IND"].ToString();

                }
            }

                return pdData;
        }

        private DataTable getData(NSEInput data , string uploaddate)
        {
            string connectionString = ConfigurationManager.ConnectionStrings["NseConfig"].ConnectionString;

            string QueryString = null;

            string SqlString = "SELECT DISTINCT SYMBOL,(CLOSE_PRICE-PREV_CL_PR)/(CLOSE_PRICE*0.01) pr FROM PDSHARE,sector1 WHERE sectortype1 LIKE '" + data.name + "' AND SYMBOL1 = SYMBOL AND upload_date='"+uploaddate+"'";

            QueryString = SqlString;

            if(data.fullname!=null)
            {
                string queryString2 = " and security LIKE '%" + data.fullname + "%'";
                QueryString = QueryString + queryString2;
            }

            if (data.high52 != null && data.high52 != "")
            {
                string queryString4 = " and (((HI_52_WK -CLOSE_PRICE)/HI_52_WK)*100) >='" + data.high52 + "'";
                QueryString = QueryString + queryString4;
            }

            if (data.low52 != null && data.low52 != "")
            {
                
                string queryString5 = " and ((CLOSE_PRICE-LO_52_WK)/LO_52_WK*100) <='" + data.low52 + "'";
                QueryString = QueryString + queryString5;
            }
            if (data.trades != null && data.trades != "")
            {
                String queryString6 = " and TRADES>='" + data.trades + "'";
                QueryString = QueryString + queryString6;
            }
            if (data.gainer_losser != "" && data.gainer_losser != null)
            {
                string queryString8 = " and HI_52_WK-LO_52_WK>='" + data.gainer_losser + "'";
                QueryString = QueryString + queryString8;
            }
            if (data.gainRs != "" && data.gainer_losser != null)
            {
                string queryString9 = " and HI_52_WK/LO_52_WK>='" + data.gainRs + "'";
                QueryString = QueryString + queryString9;
            }

            int gain = 0;
            if (data.gainPer != null && data.gainPer != "" && data.gainPer.StartsWith("-"))
            {
                String queryString7 = " and (CLOSE_PRICE-PREV_CL_PR)/(CLOSE_PRICE*0.01)<='" + data.gainPer + "' order by 2";
                QueryString = QueryString + queryString7;
                gain = 1;
            }
            if (data.gainPer != null && data.gainPer != "" && gain == 0)
            {
                string queryString7 = " and (CLOSE_PRICE-PREV_CL_PR)/(CLOSE_PRICE*0.01)>='" + data.gainPer + "' order by 2 desc";
                QueryString = QueryString + queryString7;
            }

            using (var conn = new SqlConnection(connectionString))
            {
                SqlDataAdapter sda = new SqlDataAdapter(QueryString, conn);
                DataTable dt = new DataTable();
                try
                {
                    conn.Open();
                    sda.Fill(dt);
                }
                catch (SqlException se)
                {
                }
              return dt;
            }
        }

        public List<string> GetSector()
        {
            List<string> pdData = new List<string>();

            string connectionString = ConfigurationManager.ConnectionStrings["NseConfig"].ConnectionString;
            string SqlString = "SELECT distinct SECTORTYPE1 FROM  SECTOR1 ORDER BY SECTORTYPE1 ASC";

            using (var conn = new SqlConnection(connectionString))
            {
                SqlDataAdapter sda = new SqlDataAdapter(SqlString, conn);
                DataTable dt = new DataTable();
                try
                {
                    conn.Open();
                    sda.Fill(dt);
                }
                catch (SqlException se)
                {
                }

                foreach (DataRow row in dt.Rows)
                {
                    pdData.Add( row["SECTORTYPE1"].ToString());
                  
                }
            }

            return pdData;
        }


        #region Upload
        public void InsertPDData(List<UploadData> value)
        {
            DataTable csvData = GetDataTableFromCSVFile(value[0].uploadPath);
            string connectionString = "Server=.;DataBase=eqsharedb;Integrated Security=SSPI";
            using (var conn = new SqlConnection(connectionString))
            using (var command = new SqlCommand("pdshareupdate", conn)
            {
                CommandType = CommandType.StoredProcedure
            })
            {
                string _sqlWhere = "SERIES = 'EQ' AND SYMBOL <> ''";
                string _sqlOrder = "SERIES DESC";

                DataTable _newDataTable = csvData.Select(_sqlWhere, _sqlOrder).CopyToDataTable();
                command.Parameters.Add(new SqlParameter("@myTableType", _newDataTable));
                command.Parameters.Add(new SqlParameter("@dtDate", Convert.ToDateTime(value[0].uploadDate)));
                conn.Open();
                command.ExecuteNonQuery();
            }
        }

        public void InsertBCData(List<UploadData> value)
        {
            DataTable csvData = GetDataTableFromCSVFile(value[0].uploadPath);
            string connectionString = "Server=.;DataBase=eqsharedb;Integrated Security=SSPI";
            using (var conn = new SqlConnection(connectionString))
            using (var command = new SqlCommand("bcshareupdate", conn)
            {
                CommandType = CommandType.StoredProcedure
            })
            {
                string _sqlWhere = "SERIES = 'EQ' AND SYMBOL <> ''";
                string _sqlOrder = "SERIES DESC";

                DataTable _newDataTable = csvData.Select(_sqlWhere, _sqlOrder).CopyToDataTable();
                command.Parameters.Add(new SqlParameter("@myTableType", _newDataTable));
                command.Parameters.Add(new SqlParameter("@dtDate", Convert.ToDateTime(value[0].uploadDate)));
                conn.Open();
                command.ExecuteNonQuery();
            }
        }


        public void InsertFOData(List<UploadData> value)
        {
            DataTable csvData = GetDataTableFromCSVFile(value[0].uploadPath);

            var lastRow = csvData.Rows[csvData.Rows.Count - 1];
            csvData.Rows.Remove(lastRow);
            string connectionString = "Server=.;DataBase=eqsharedb;Integrated Security=SSPI";
            using (var conn = new SqlConnection(connectionString))
            using (var command = new SqlCommand("foshareupdate", conn)
            {
                CommandType = CommandType.StoredProcedure
            })
            {

                command.Parameters.Add(new SqlParameter("@myTableType", csvData));
                command.Parameters.Add(new SqlParameter("@dtDate", Convert.ToDateTime(value[0].uploadDate)));
                conn.Open();
                command.ExecuteNonQuery();
            }
        }



        private static DataTable GetDataTableFromCSVFile(string csv_file_path)
        {
            DataTable csvData = new DataTable();

            try
            {
                using (TextFieldParser csvReader = new TextFieldParser(csv_file_path))
                {
                    csvReader.SetDelimiters(new string[] { "," });
                    csvReader.HasFieldsEnclosedInQuotes = true;
                    string[] colFields = csvReader.ReadFields();

                    foreach (string column in colFields)
                    {
                        DataColumn datecolumn = new DataColumn(column);
                        datecolumn.AllowDBNull = true;
                        csvData.Columns.Add(datecolumn);
                    }

                    while (!csvReader.EndOfData)
                    {
                        string[] fieldData = csvReader.ReadFields();
                        //Making empty value as null
                        for (int i = 0; i < fieldData.Length; i++)
                        {
                            if (fieldData[i] == "")
                            {
                                fieldData[i] = null;
                            }
                        }

                        csvData.Rows.Add(fieldData);
                    }
                }
            }
            catch (Exception ex)
            {
            }

            return csvData;
        }
        #endregion


        #region
        public List<Candalchart> GetTwentyRecord(string Symbol)
        {
            List<Candalchart> pdData = new List<Candalchart>();

            string connectionString = ConfigurationManager.ConnectionStrings["NseConfig"].ConnectionString;
            string SqlString = "select * from (SELECT TOP 20  [SYMBOL], [OPEN_PRICE], [HIGH_PRICE]  ,[LOW_PRICE] ,[CLOSE_PRICE] ,[NET_TRDVAL] ,[NET_TRDQTY] ,[TRADES] ,[HI_52_WK] ,[LO_52_WK] ,[UPLOAD_DATE]  FROM[dbo].[pdshare] where SYMBOL = '" + Symbol + "' order by UPLOAD_DATE desc) T order by UPLOAD_DATE";

            using (var conn = new SqlConnection(connectionString))
            {
                SqlDataAdapter sda = new SqlDataAdapter(SqlString, conn);
                DataTable dt = new DataTable();
                try
                {
                    conn.Open();
                    sda.Fill(dt);
                }
                catch (SqlException se)
                {
                }

                foreach (DataRow row in dt.Rows)
                {
                    pdData.Add(new Candalchart {
                        open= Convert.ToDouble(row["OPEN_PRICE"].ToString()),
                        close =Convert.ToDouble( row["CLOSE_PRICE"].ToString()),
                        high = Convert.ToDouble(row["HIGH_PRICE"].ToString()),
                        low= Convert.ToDouble(row["LOW_PRICE"].ToString()),
                        volume= Convert.ToDouble(row["NET_TRDVAL"].ToString()),
                        quantity= Convert.ToDouble(row["NET_TRDQTY"].ToString()),
                        date = Convert.ToDateTime( row["UPLOAD_DATE"].ToString()).ToString("MM/dd/yyyy"),
                        
                    });

                }
            }

            return pdData;
        }


        #endregion



        #region FO Contoller

        public List<Candalchart> GetFOTwentyRecord(FoInputModel data)
        {
            List<Candalchart> pdData = new List<Candalchart>();

            string connectionString = ConfigurationManager.ConnectionStrings["NseConfig"].ConnectionString;
            string SqlString = "select * from (SELECT TOP 20  [SYMBOL], [OPEN_PRICE], [HI_PRICE]  ,[LO_PRICE] ,[CLOSE_PRICE] ,[OPEN_Int*] ,TRD_qTY ,[UPLOAD_DATE]  FROM[dbo].foshare where SYMBOL = '"+ data .SYMBOL+ "'  and STR_PRICE=" + data.STR_PRICE + " and opt_type='" + data.OPT_TYPE + "'  and EXP_DATE ='" + data.EXP_DATE + "' order by UPLOAD_DATE desc) T order by UPLOAD_DATE";

            using (var conn = new SqlConnection(connectionString))
            {
                SqlDataAdapter sda = new SqlDataAdapter(SqlString, conn);
                DataTable dt = new DataTable();
                try
                {
                    conn.Open();
                    sda.Fill(dt);
                }
                catch (SqlException se)
                {
                }

                foreach (DataRow row in dt.Rows)
                {
                    pdData.Add(new Candalchart
                    {
                        open = Convert.ToDouble(row["OPEN_PRICE"].ToString()),
                        close = Convert.ToDouble(row["CLOSE_PRICE"].ToString()),
                        high = Convert.ToDouble(row["HI_PRICE"].ToString()),
                        low = Convert.ToDouble(row["LO_PRICE"].ToString()),
                        volume = Convert.ToDouble(row["OPEN_Int*"].ToString()),
                        quantity = Convert.ToDouble(row["TRD_qTY"].ToString()),
                        date = Convert.ToDateTime(row["UPLOAD_DATE"].ToString()).ToString("MM/dd/yyyy"),

                    });

                }
            }

            return pdData;
        }

        public FOModelData GetFOData(FOInput location)
        {
            FOModelData lstModel = new FOModelData();
            lstModel.lastFiveDates = GetLastFOFiveDates();
            LstDates = lstModel.lastFiveDates;

            if (LstDates != null && LstDates.Count > 0)
            {
                var lstSymbol = getFOData(location, LstDates[0]);

                lstModel.lstDate0 = new List<FOData>();
                lstModel.lstDate1 = new List<FOData>();
                lstModel.lstDate2 = new List<FOData>();
                lstModel.lstDate3 = new List<FOData>();
                lstModel.lstDate4 = new List<FOData>();
                lstModel.lstDate5 = new List<FOData>();
            
                foreach (DataRow row in lstSymbol.Rows)
                {
                    getFODate(lstModel.lstDate1,row["SYMBOL"].ToString(), LstDates[0],row["STR_PRICE"].ToString(),row["OPT_TYPE"].ToString());
                    getFODate(lstModel.lstDate2,row["SYMBOL"].ToString(), LstDates[1],row["STR_PRICE"].ToString(),row["OPT_TYPE"].ToString());
                    getFODate(lstModel.lstDate3,row["SYMBOL"].ToString(), LstDates[2],row["STR_PRICE"].ToString(),row["OPT_TYPE"].ToString());
                    getFODate(lstModel.lstDate4,row["SYMBOL"].ToString(), LstDates[3],row["STR_PRICE"].ToString(),row["OPT_TYPE"].ToString());
                    getFODate(lstModel.lstDate5,row["SYMBOL"].ToString(), LstDates[4],row["STR_PRICE"].ToString(),row["OPT_TYPE"].ToString());
                    getFODate(lstModel.lstDate0,row["SYMBOL"].ToString(), LstDates[5],row["STR_PRICE"].ToString(),row["OPT_TYPE"].ToString());
                    
                }               
            }

            return lstModel;
        }

        private List<FOData> getFODate(List<FOData> lstFo ,string Symbol, string dte,string sp, string opt)
        {
            
           
            string connectionString = ConfigurationManager.ConnectionStrings["NseConfig"].ConnectionString;
            string SqlString = "SELECT * FROM FOSHARE where SYMBOL LIKE '" + Symbol + "' and OPT_TYPE='"+opt+"' and STR_PRICE='" + sp+"' and upload_date = '" + Convert.ToDateTime(dte) + "' ";

            using (var conn = new SqlConnection(connectionString))
            {
                SqlDataAdapter sda = new SqlDataAdapter(SqlString, conn);
                DataTable dt = new DataTable();
                try
                {
                    conn.Open();
                    sda.Fill(dt);
                }
                catch (SqlException se)
                {
                }

                foreach (DataRow row in dt.Rows)
                {
                    FOData FOData = new FOData();
                    FOData.EXP_DATE = row["EXP_DATE"].ToString();
                    FOData.SYMBOL = row["SYMBOL"].ToString();
                    FOData.OPT_TYPE = row["OPT_TYPE"].ToString();
                    FOData.INSTRUMENT = row["INSTRUMENT"].ToString();
                    FOData.STR_PRICE =Convert.ToDouble( row["STR_PRICE"].ToString());
                    FOData.OPEN_PRICE = Convert.ToDouble(row["OPEN_PRICE"].ToString());
                    FOData.HI_PRICE = Convert.ToDouble(row["HI_PRICE"].ToString());
                    FOData.LO_PRICE = Convert.ToDouble(row["LO_PRICE"].ToString());
                    FOData.CLOSE_PRICE = Convert.ToDouble(row["CLOSE_PRICE"].ToString());
                    FOData.OPEN_Int = Convert.ToDouble(row["OPEN_Int*"].ToString());
                    FOData.TRD_QTY = Convert.ToDouble(row["TRD_QTY"].ToString());
                    FOData.NO_OF_CONT = Convert.ToDouble(row["NO_OF_CONT"].ToString());
                    FOData.NO_OF_TRADE = Convert.ToDouble(row["NO_OF_TRADE"].ToString());
                    FOData.PR_VA = Convert.ToDouble(row["PR_VAL"].ToString());
                    lstFo.Add(FOData);

                }
            }

            return lstFo;
        }

        private DataTable getFOData(FOInput Symbol,string uploaddate)
        {
            string connectionString = ConfigurationManager.ConnectionStrings["NseConfig"].ConnectionString;

            string SqlString = "SELECT DISTINCT SYMBOL,STR_PRICE,OPT_TYPE FROM FOSHARE WHERE ";

            SqlString += "SYMBOL like '" + Symbol.name + "%'";

            if(Symbol.index != "" && Symbol.index != null)
                SqlString += "and STR_PRICE =" + Symbol.index ;

            if (Symbol.type != "" && Symbol.type != null)
                SqlString += " and OPT_TYPE ='" + Symbol.type + "'";

            if (Symbol.date != "" && Symbol.date != null)
                SqlString += " and EXP_DATE ='" + Symbol.date +"'";

            using (var conn = new SqlConnection(connectionString))
            {
                SqlDataAdapter sda = new SqlDataAdapter(SqlString, conn);
                DataTable dt = new DataTable();
                try
                {
                    conn.Open();
                    sda.Fill(dt);
                }
                catch (SqlException se)
                {
                }
                return dt;
            }
        }
        public List<string> GetLastFOFiveDates()
        {
            List<string> pdData = new List<string>();

            string connectionString = ConfigurationManager.ConnectionStrings["NseConfig"].ConnectionString;
            string SqlString = "SELECT distinct TOP 6 UPLOAD_DATE FROM [eqsharedb].[dbo].[foshare] order by UPLOAD_DATE desc";

            using (var conn = new SqlConnection(connectionString))
            {
                SqlDataAdapter sda = new SqlDataAdapter(SqlString, conn);
                DataTable dt = new DataTable();
                try
                {
                    conn.Open();
                    sda.Fill(dt);
                }
                catch (SqlException se)
                {
                }

                foreach (DataRow row in dt.Rows)
                {
                    pdData.Add(DateTime.Parse(row["UPLOAD_DATE"].ToString()).ToShortDateString());

                }
            }

            return pdData;
        }
        #endregion

    }
}