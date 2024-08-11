import IGraphQLRequest from "../../types/IGraphQLRequest.d";

const Server = (_id: string): IGraphQLRequest => ({
  query: `
    query ($id: String!) {
      server(_id: $id) {
        status
        errors {
          path
          message
        }
        server {
          _id
          name
          owner {
            _id
            username
            email
            avatar
          }
          logo
          staff {
            _id
            username
            email
            avatar
          }
          members {
            _id
            username
            email
            avatar
          }
        }
      }
    }
  `,
  variables: { id: _id }
});

export default Server;
