using System;
using System.Reflection;
using System.Runtime.ExceptionServices;
using Autofac;
using EnsureThat;
using Insig.Common.CQRS;

namespace Insig.Api.Infrastructure
{
    public class QueryDispatcher : IQueryDispatcher
    {
        private readonly ILifetimeScope _lifetimeScope;

        public QueryDispatcher(ILifetimeScope lifetimeScope)
        {
            EnsureArg.IsNotNull(lifetimeScope, nameof(lifetimeScope));

            _lifetimeScope = lifetimeScope;
        }

        public TResult Dispatch<TResult>(IQuery<TResult> query)
        {
            object handler;

            var handlerExists = TryGetQueryHandler(_lifetimeScope, query, out handler);

            if (!handlerExists)
            {
                throw new Exception($"Handler for query {GetQueryName(query)} does not exist.");
            }

            return ExecuteHandler(handler, query);
        }

        protected virtual TResult ExecuteHandler<TResult>(object handler, IQuery<TResult> query)
        {
            try
            {
                var result = handler.GetType()
                    .GetRuntimeMethod("Handle", new[] { query.GetType() })
                    .Invoke(handler, new object[] { query });

                return (TResult)result;
            }
            catch (TargetInvocationException ex)
            {
                ExceptionDispatchInfo.Capture(ex.InnerException).Throw();
                throw;
            }
        }

        private static bool TryGetQueryHandler<TResult>(ILifetimeScope scope, IQuery<TResult> query, out object handler)
        {
            var asyncGenericType = typeof(IQueryHandler<,>);
            var closedAsyncGeneric = asyncGenericType.MakeGenericType(query.GetType(), typeof(TResult));

            return scope.TryResolve(closedAsyncGeneric, out handler);
        }

        private static string GetQueryName(object query)
        {
            return query.GetType().Name;
        }
    }
}