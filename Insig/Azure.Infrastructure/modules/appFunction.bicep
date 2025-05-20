param projectName string
param environment string
param location string
param frontDoorProfileName string
param storageName string

// TODO: Add Custom domain with https or default web if custom domain not defined
param allowedOrigins array

var appFunctionName = '${projectName}-${environment}-func'

resource frontDoorProfile 'Microsoft.Cdn/profiles@2023-05-01' existing = if (frontDoorProfileName != '') {
  name: frontDoorProfileName
}

var ipSecurityRestrictions = frontDoorProfileName == ''
  ? []
  : [
      {
        tag: 'ServiceTag'
        ipAddress: 'AzureFrontDoor.Backend'
        action: 'Allow'
        priority: 100
        headers: {
          'x-azure-fdid': [
            frontDoorProfile.properties.frontDoorId
          ]
        }
        name: 'Allow traffic from Front Door'
      }
    ]

resource storage 'Microsoft.Storage/storageAccounts@2023-01-01' existing = {
  name: storageName
}

resource appServicePlan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: '${projectName}-${environment}-plan'
  location: location
  sku: {
    name: 'Y1' // Consumption plan (Dynamic plan)
    tier: 'Dynamic'
  }
  properties: {
    reserved: true
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: '${appFunctionName}-appinsights'
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
  }
}

resource functionApp 'Microsoft.Web/sites@2022-09-01' = {
  name: appFunctionName
  location: location
  kind: 'functionapp'
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: 'DOTNET-ISOLATED|8.0'
      appSettings: [
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storage.name};EndpointSuffix=core.windows.net;AccountKey=${storage.listKeys().keys[0].value}'
        }
        {
          name: 'FUNCTIONS_EXTENSION_VERSION'
          value: '~4'
        }
        {
          name: 'FUNCTIONS_WORKER_RUNTIME'
          value: 'dotnet-isolated'
        }
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsights.properties.InstrumentationKey
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsights.properties.ConnectionString
        }
      ]
      ipSecurityRestrictions: ipSecurityRestrictions
      cors: {
        allowedOrigins: allowedOrigins
      }
    }
  }
}

output appFunctionName string = functionApp.name
