import IGraphQLRequest from "../../types/IGraphQLRequest.d";

const FriendRequest = (_id: string): IGraphQLRequest => ({
  query: `
    mutation ($id: String!) {
      send_friend_request(_id: $id) {
        status
        errors {
          path
          message
        }
      }
    }
  `,
  variables: { id: _id }
});

export default FriendRequest;
