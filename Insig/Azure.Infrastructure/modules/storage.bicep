param projectName string
param environment string
param location string

@allowed([
  'Premium_LRS'
  'Premium_ZRS'
  'Standard_GRS'
  'Standard_GZRS'
  'Standard_LRS'
  'Standard_RAGRS'
  'Standard_RAGZRS'
  'Standard_ZRS'
])
param skuName string = 'Standard_LRS'

@allowed([
  'BlobStorage'
  'BlockBlobStorage'
  'FileStorage'
  'Storage'
  'StorageV2'
])
param kind string = 'StorageV2'

resource storage 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: '${projectName}${environment}storage'
  location: location
  sku: {
    name: skuName
  }
  kind: kind
  properties: {
    allowBlobPublicAccess: true
    minimumTlsVersion: 'TLS1_2'
  }
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
  parent: storage
  name: 'default'
  properties: {
    deleteRetentionPolicy: {
      enabled: true
      days: 7
    }
    containerDeleteRetentionPolicy: {
      enabled: true
      days: 7
    }
  }
}

output storageName string = storage.name
