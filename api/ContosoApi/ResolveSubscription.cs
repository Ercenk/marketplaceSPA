// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


namespace Microsoft.CommercialMarketplace
{
    extern alias AzureIdentity;

    using System.IO;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Azure.WebJobs.Extensions.Http;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Configuration.AzureAppConfiguration;
    using System.Reflection;
    using Microsoft.Marketplace.SaaS;
    using AzureIdentity::Azure.Identity;
    using System.Text.Json;
    using System.Text.Json.Serialization;    
    using System.Web;

    public static class ResolveSubscription
    {
        private static IConfiguration Configuration { set; get; }
        static ResolveSubscription()
        {

            var builder = new ConfigurationBuilder();
            builder
            // .AddAzureAppConfiguration((options) => {
            //                 options.
            //             })
                        .AddUserSecrets(Assembly.GetExecutingAssembly(), false);
            Configuration = builder.Build();

        }

        [FunctionName("ResolveSubscription")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            // The query parameter comes in as UrlDecoded, but not fully. The %2b chars are converted to space, 
            // but we want them to be replaced by + instead to conform.
            var marketplaceToken = req.Query["token"].ToString().Replace(" ", "+");

            var tenantId = Configuration["TenantId"];
            var appId = Configuration["AppId"];
            var clientSecret = Configuration["ClientSecret"];

            var marketplaceClient = new MarketplaceSaaSClient(new ClientSecretCredential(Configuration["TenantId"], Configuration["AppId"], Configuration["ClientSecret"]));

            var subscriptionDetailsResponse = await marketplaceClient.Fulfillment.ResolveAsync(marketplaceToken).ConfigureAwait(false);

            string responseMessage = subscriptionDetailsResponse.Value == null
                ? "No subscription found."
                : JsonSerializer.Serialize(subscriptionDetailsResponse.Value);

            return new OkObjectResult(responseMessage);
        }
    }
}
