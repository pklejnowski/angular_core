param projectName string
param environment string
param location string

resource webApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: '${projectName}-${environment}-web'
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {}
}

output webAppName string = webApp.name
