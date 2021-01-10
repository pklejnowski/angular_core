# Insig Project Clean Architecture
This is a solution template for creating a Single Page App (SPA) with Angular 11 + .NET 5.0 + IdentityServer4 (Authorization Code Flow + PKCE)

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

# Features
**Authorization Project:**
- .NET 5.0
- IdentityServer4
- Authorization Code Flow + PKCE
- Database - Microsoft SQL Server
- Email verification (after registering)
- Phone number verification (in Manage Account)

**API Project:**
- .NET 5.0
- CQRS + Dispatcher
- Custom Query Builder for Dapper
- Prepared for Domain-driven design
- IoC Container Autofac
- Database - Microsoft SQL Server

**Angular Project:**
- .NET 5.0
- Angular 11
- Authorization (oidc-client.js)
- Silent refresh
- Angular Material
- Toasts
- Directive for input validation errors
- Secured API calls (Encoding URI)

**Other:**
- Domain tests
- Integration API tests
- Serilog
- HTTP security headers
