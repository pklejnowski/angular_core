targetScope = 'subscription'

@allowed(['uat', 'prod'])
param environment string

param projectName string

@allowed(['westeurope', 'polandcentral'])
param location string

param addFrontDoor bool

param wafEnableLimitToPoland bool

param customDomain string

param sqlServerLogin string

@secure()
param sqlServerPassword string

resource resrcGroup 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: '${projectName}-${environment}'
  location: location
}

module frontDoorProfile './modules/frontDoorProfile.bicep' = if (addFrontDoor == true) {
  scope: resourceGroup(resrcGroup.name)
  name: 'FrontDoorProfile'
  params: {
    environment: environment
    projectName: projectName
  }
}

module storage './modules/storage.bicep' = {
  scope: resourceGroup(resrcGroup.name)
  name: 'Storage'
  params: {
    environment: environment
    projectName: projectName
    location: location
  }
}

module webApp './modules/webApp.bicep' = {
  scope: resourceGroup(resrcGroup.name)
  name: 'StaticWebApp'
  params: {
    environment: environment
    projectName: projectName
    location: location
  }
}

module appFunction './modules/appFunction.bicep' = {
  scope: resourceGroup(resrcGroup.name)
  name: 'appFunction'
  params: {
    environment: environment
    projectName: projectName
    location: location
    frontDoorProfileName: addFrontDoor == true ? frontDoorProfile.outputs.frontDoorProfileName : ''
    storageName: storage.outputs.storageName
  }
}

module sql './modules/sql.bicep' = {
  scope: resourceGroup(resrcGroup.name)
  name: 'Sql'
  params: {
    environment: environment
    projectName: projectName
    location: location
    sqlServerLogin: sqlServerLogin
    sqlServerPassword: sqlServerPassword
  }
}

module frontDoor './modules/frontdoor.bicep' = if (addFrontDoor == true) {
  scope: resourceGroup(resrcGroup.name)
  name: 'FrontDoor'
  params: {
    environment: environment
    projectName: projectName
    webAppName: webApp.outputs.webAppName
    appFunctionName: appFunction.outputs.appFunctionName
    storageName: storage.outputs.storageName
    frontDoorProfileName: addFrontDoor == true ? frontDoorProfile.outputs.frontDoorProfileName : ''
    wafEnableLimitToPoland: wafEnableLimitToPoland
    customDomain: customDomain
  }
}
