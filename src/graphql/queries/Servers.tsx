import IGraphQLRequest from "../../types/IGraphQLRequest.d";

const Servers = (page: number): IGraphQLRequest => ({
  query: `
    query ($page: Int!) {
      servers(page: $page) {
        status
        errors {
          path
          message
        }
        servers {
          _id
          name
          owner {
            _id
            username
            email
            avatar
            friends {
              _id
              username
              email
              avatar
            }
            friend_requests {
              _id
              username
              email
              avatar
            }
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
  variables: { page }
});

export default Servers;
