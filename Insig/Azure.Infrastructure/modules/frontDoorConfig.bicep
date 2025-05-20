param name string = 'Default'

param frontDoorProfileName string

param originHostName string

param originHostHeader string

param frontDoorEndpointName string = 'afd-${uniqueString(resourceGroup().id)}'

param frontDoorOriginGroupName string = '${name}OriginGroup'

param frontDoorOriginName string = '${name}ServiceOrigin'

param frontDoorRouteName string = '${name}RouteName'

param patternToMatch string = '/*'

param useCaching bool = false

param ruleSets array = []

var cacheConfiguration = {
  queryStringCachingBehavior: 'IgnoreQueryString'
}

resource frontDoorProfile 'Microsoft.Cdn/profiles@2023-05-01' existing = {
  name: frontDoorProfileName
}

resource frontDoorEndpoint 'Microsoft.Cdn/profiles/afdEndpoints@2023-05-01' = {
  name: frontDoorEndpointName
  parent: frontDoorProfile
  location: 'global'
  properties: {
    enabledState: 'Enabled'
  }
}

resource frontDoorOriginGroup 'Microsoft.Cdn/profiles/originGroups@2023-05-01' = {
  name: frontDoorOriginGroupName
  parent: frontDoorProfile
  properties: {
    loadBalancingSettings: {
      sampleSize: 4
      successfulSamplesRequired: 3
    }
    healthProbeSettings: {
      probePath: '/'
      probeRequestType: 'HEAD'
      probeProtocol: 'Https'
      probeIntervalInSeconds: 100
    }
  }
}

resource frontDoorOrigin 'Microsoft.Cdn/profiles/originGroups/origins@2023-05-01' = {
  name: frontDoorOriginName
  parent: frontDoorOriginGroup
  properties: {
    hostName: originHostName
    httpPort: 80
    httpsPort: 443
    originHostHeader: originHostHeader
    priority: 1
    weight: 1000
  }
}

resource frontDoorRoute 'Microsoft.Cdn/profiles/afdEndpoints/routes@2023-05-01' = {
  name: frontDoorRouteName
  parent: frontDoorEndpoint
  dependsOn: [
    frontDoorOrigin
  ]
  properties: {
    originGroup: {
      id: frontDoorOriginGroup.id
    }
    supportedProtocols: [
      'Http'
      'Https'
    ]
    patternsToMatch: [
      patternToMatch
    ]
    forwardingProtocol: 'HttpsOnly'
    linkToDefaultDomain: 'Enabled'
    httpsRedirect: 'Enabled'
    cacheConfiguration: useCaching ? cacheConfiguration : null
    ruleSets: ruleSets
  }
}

output frontDoorId string = frontDoorProfile.properties.frontDoorId
output frontDoorEndpointId string = frontDoorEndpoint.id
output frontDoorEndpointHostName string = frontDoorEndpoint.properties.hostName
