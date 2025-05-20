param projectName string
param environment string

resource frontDoorProfile 'Microsoft.Cdn/profiles@2023-05-01' = {
  name: '${projectName}-${environment}-afd'
  location: 'global'
  sku: {
    name: 'Standard_AzureFrontDoor'
  }
}

output frontDoorProfileName string = frontDoorProfile.name
