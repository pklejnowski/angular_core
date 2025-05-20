param projectName string
param environment string
param location string
param sqlServerLogin string

@secure()
param sqlServerPassword string

resource sqlServer 'Microsoft.Sql/servers@2023-05-01-preview' = {
  name: '${projectName}-${environment}-sqlserver'
  location: location
  properties: {
    minimalTlsVersion: '1.2'
    administratorLogin: sqlServerLogin
    administratorLoginPassword: sqlServerPassword
  }
}

resource sqlDB 'Microsoft.Sql/servers/databases@2023-05-01-preview' = {
  name: '${projectName}-${environment}-db'
  location: location
  sku: {
    name: 'Basic'
    tier: 'Basic'
    capacity: 5
  }
  parent: sqlServer
}

resource SQLAllowAllWindowsAzureIps 'Microsoft.Sql/servers/firewallRules@2023-05-01-preview' = {
  name: 'AllowAllWindowsAzureIps'
  parent: sqlServer
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}
