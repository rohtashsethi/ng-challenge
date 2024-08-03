import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { environment } from '../../environments/environment';

const uri = 'https://api.github.com/graphql'; // <-- add the URL of the GraphQL server here
export function apolloOptionsFactory(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);

  // Authentication Link
  const auth = setContext((_, { headers }) => {
    const token = environment.githubToken; // Use environment variable
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return {
    link: auth.concat(httpLink.create({ uri })),
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];