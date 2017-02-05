using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(NSEDashboard.Startup))]
namespace NSEDashboard
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
        }
    }
}
