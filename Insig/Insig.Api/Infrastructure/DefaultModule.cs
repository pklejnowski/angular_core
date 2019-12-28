using System;
using System.Data;
using System.Reflection;
using Autofac;
using EnsureThat;
using Insig.Api.Controllers;
using Insig.ApplicationServices;
using Insig.ApplicationServices.UseCases;
using Insig.Common.Auth;
using Insig.Infrastructure.DataModel.Context;
using Insig.Infrastructure.Domain;
using Insig.Infrastructure.Queries;
using Insig.Infrastructure.QueryBuilder;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Module = Autofac.Module;

namespace Insig.Api.Infrastructure
{
    public class DefaultModule : Module
    {
        private readonly string _connectionString;

        public DefaultModule(string connectionString)
        {
            Ensure.String.IsNotNullOrWhiteSpace(connectionString, nameof(connectionString));

            _connectionString = connectionString;
        }

        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<QueryDispatcher>().AsImplementedInterfaces();
            builder.RegisterType<CommandDispatcher>().AsImplementedInterfaces();

            RegisterContext(builder);
            RegisterDatabaseAccess(builder);
            RegisterServices(builder);
            RegisterControllers(builder);
            RegisterUseCases(builder);
            RegisterQueries(builder);
            RegisterRepositories(builder);
        }

        private static void RegisterTransientDependenciesAutomatically(
             ContainerBuilder builder,
             Assembly assembly,
             string nameSpace)
        {
            builder.RegisterAssemblyTypes(assembly)
                .Where(t => !string.IsNullOrEmpty(t.Namespace) && t.Namespace.StartsWith(nameSpace, StringComparison.InvariantCulture))
                .AsSelf()
                .AsImplementedInterfaces()
                .InstancePerDependency();
        }

        private void RegisterContext(ContainerBuilder builder)
        {
            var options = new DbContextOptionsBuilder<InsigContext>();
            options.UseSqlServer(_connectionString);

            builder.Register(container => new InsigContext(options.Options, container.Resolve<ICurrentUserService>())).InstancePerLifetimeScope();
        }

        private void RegisterDatabaseAccess(ContainerBuilder builder)
        {
            builder
                .Register<IDbConnection>(c => new SqlConnection(_connectionString))
                .InstancePerLifetimeScope();
            builder
                .RegisterType<SqlQueryBuilder>()
                .InstancePerDependency();
        }

        private void RegisterServices(ContainerBuilder builder)
        {
            builder.RegisterType<CurrentUserService>().AsImplementedInterfaces().InstancePerLifetimeScope();
        }

        private static void RegisterControllers(ContainerBuilder builder)
        {
            RegisterTransientDependenciesAutomatically(
                builder,
                typeof(ValuesController).Assembly,
                "Insig.Api.Controllers");
        }

        private static void RegisterUseCases(ContainerBuilder builder)
        {
            RegisterTransientDependenciesAutomatically(
                builder,
                typeof(GetSampleUseCase).Assembly,
                "Insig.ApplicationServices.UseCases");
        }

        private static void RegisterQueries(ContainerBuilder builder)
        {
            RegisterTransientDependenciesAutomatically(
                builder,
                typeof(SampleQuery).Assembly,
                "Insig.Infrastructure.Queries");
        }

        private void RegisterRepositories(ContainerBuilder builder)
        {
            RegisterTransientDependenciesAutomatically(
                builder,
                typeof(SampleRepository).Assembly,
                "Insig.Infrastructure.Domain");
        }
    }
}
