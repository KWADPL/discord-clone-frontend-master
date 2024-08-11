import IGraphQLRequest from "../../types/IGraphQLRequest.d";

const User = (_id: string): IGraphQLRequest => ({
  query: `
    query ($id: String!) {
      user(_id: $id) {
        status
        errors {
          path
          message
        }
        user {
          _id
          createdAt
          updatedAt
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
            owner {
              _id
              username
              email
              avatar
            }
          }
        }
      }
    }
  `,
  variables: { id: _id }
});

export default User;
