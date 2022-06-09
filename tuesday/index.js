import {ApolloClient, gql, InMemeoryCache, useQuery, useMutation} from '@apollo/client';

const client = new AolloClient({
    cache: new InMemeoryCache(),
    uri: 'http://localhost:4000/graphql',
});

client.query({
    query:gql`
        query {
         getUserDetails(id:2){
            name
            website
  }
}
`
})

