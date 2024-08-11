import IGraphQLRequest from "../../types/IGraphQLRequest.d";

const AcceptFriendRequest = (_id: string): IGraphQLRequest => ({
  query: `
    mutation AcceptFriendRequest($id: String!) {
      accept_friend_request(_id: $id) {
        status
        errors {
          path
          message
        }
        token
        user {
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
        }
      }
    }
  `,
  variables: { id: _id }
});

export default AcceptFriendRequest;
