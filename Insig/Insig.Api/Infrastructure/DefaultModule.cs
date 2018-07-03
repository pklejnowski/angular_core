using System;
using System.Reflection;
using Autofac;
using EnsureThat;
using Insig.Api.Controllers;
using Insig.ApplicationServices.UseCases;
using Insig.Infrastructure.DataModel.Context;
using Insig.Infrastructure.Queries;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Module = Autofac.Module;

namespace Insig.Api.Infrastructure
{
    public class DefaultModule : Module
    {
        private readonly string _insigConnectionString;

        public DefaultModule(string insigConnectionString)
        {
            Ensure.String.IsNotNullOrWhiteSpace(insigConnectionString, nameof(insigConnectionString));

            _insigConnectionString = insigConnectionString;
        }

        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<QueryDispatcher>().AsImplementedInterfaces();

            RegisterControllers(builder);
            RegisterContext(builder);
            RegisterQueries(builder);
            RegisterUseCases(builder);
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

        private void RegisterContext(ContainerBuilder builder)
        {
            var options = new DbContextOptionsBuilder<InsigContext>();
            options.UseSqlServer(_insigConnectionString)
                .ConfigureWarnings(warnings => warnings.Throw(RelationalEventId.QueryClientEvaluationWarning));

            builder.Register((container) => new InsigContext(options.Options)).InstancePerLifetimeScope();
        }
    }
}
