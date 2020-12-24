// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// <auto-generated/>

#nullable disable

using System.Collections.Generic;
using Azure.Core;

namespace Microsoft.Marketplace.SaaS.Models
{
    /// <summary> The SubscriptionPlans. </summary>
    public partial class SubscriptionPlans
    {
        /// <summary> Initializes a new instance of SubscriptionPlans. </summary>
        internal SubscriptionPlans()
        {
            Plans = new ChangeTrackingList<Plan>();
        }

        /// <summary> Initializes a new instance of SubscriptionPlans. </summary>
        /// <param name="plans"> . </param>
        internal SubscriptionPlans(IReadOnlyList<Plan> plans)
        {
            Plans = plans;
        }

        public IReadOnlyList<Plan> Plans { get; }
    }
}
