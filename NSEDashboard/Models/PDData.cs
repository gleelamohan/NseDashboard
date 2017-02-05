namespace NSEDashboard.Models
{
    public class PDData
    {
        public string Top_Avg_20 { get; set; }
        public string Purpose { get; set; }
        public string Ex_date { get; set; }
        public string MKT{get; set;}
      public string SERIES{get; set;}
      public string SYMBOL{get; set;}
      public string SECURITY{get; set;}
      public double PREV_CLOSE{get; set;}
      public double OPEN_PRICE{get; set;}
      public double HIGH_PRICE{get; set;}
      public double LOW_PRICE{get; set;}
      public double CLOSE_PRICE{get; set;}
      public double NET_TRDVAL{get; set;}
      public double NET_TRDQTY{get; set;}
      public string IND_SEC{get; set;}
      public string CORP_IND{get; set;}
      public long TRADES{get; set;}
      public double HI_52_WK{get; set;}
      public double LO_52_WK{get; set;}
      public double NET_PD{get; set;}
    }
}