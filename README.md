# Insig project
Proof of Concept for project with Angular 8 + .NET Core 2.2 + IdentityServer4 (Authorization Code Flow + PKCE)

# Project references
![project_references](https://github.com/pklejnowski/angular_core/blob/master/project_references.png)

# Setup
1. Ensure that you have valid Data Source (current: ".\\SQLEXPRESS") in ConnectionString (appsettings.json) in following projects: Insig.Api, Insig.Infrastructure, Insig.IdentityServer, Insig.Integration.Tests

2. Run database migrations ("dotnet ef database update") in following projects: Insig.Infrastructure, Insig.IdentityServer

3. Download npm packages ("npm install") in Insig.Web

4. Build scripts ("ng build --aot") in Insig.Web

5. Set startup projects:
- Insig.IdentityServer
- Insig.Api
- Insig.Web

6. Rebuild solution and start application
