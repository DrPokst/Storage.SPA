import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';

const uri = '/api/v4/endpoint'; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink){
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',

    }
  }));

  const auth = setContext((operation, context) => ({
    headers: {
      token: `7be19da2-7329-4e35-83a3-61a97d1bb694`
    },
  }));

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache
  }

}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
