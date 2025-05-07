import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as web from "@pulumi/azure-native/web";
import { listStaticSiteSecretsOutput } from "@pulumi/azure-native/web";

// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup("vue2048-rg", {
  location: "westeurope",
  tags: { Class: "EI8IT213" }
});

// Create an Azure Static Web App
const staticSite = new web.StaticSite("vue2048-static", {
  resourceGroupName: resourceGroup.name,
  location: resourceGroup.location,
  sku: { name: "Free" },
  tags: { Class: "EI8IT213" },
  repositoryUrl: "https://github.com/Karim-Mkaouar/vue2048", 
});

// Export the default hostname of the Static Web App
export const staticSiteHostname = staticSite.defaultHostname;

// Export the deployment token (API key)
const secrets = listStaticSiteSecretsOutput({
  name: staticSite.name,
  resourceGroupName: resourceGroup.name,
});
export const deploymentToken = pulumi.secret(secrets.apply(s => s.properties?.apiKey));