import IGraphQLRequest from "../../types/IGraphQLRequest.d";

const Users = (page: number): IGraphQLRequest => ({
  query: `
    query ($page: Int!) {
      users(page: $page) {
        status
        page
        errors {
          path
          message
        }
        users {
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
  variables: { page }
});

export default Users;
