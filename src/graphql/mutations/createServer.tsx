import IGraphQLRequest from "../../types/IGraphQLRequest.d";

const CreateServer = (name: string): IGraphQLRequest => ({
  query: `
    mutation CreateServer($name: String!) {
      create_server(name: $name) {
        status
        errors {
          path
          message
        }
        server {
          _id
          name
          logo
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
            servers {
              _id
              name
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
          members {
            _id
            username
            email
            avatar
          }
          staff {
            _id
            username
            email
            avatar
          }
        }
      }
    }
  `,
  variables: { name }
});

export default CreateServer;
