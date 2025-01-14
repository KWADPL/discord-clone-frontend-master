import IGraphQLRequest from "../../types/IGraphQLRequest.d";

const UpdateAccount = (
  username: string,
  email: string,
  password: string
): IGraphQLRequest => ({
  query: `
    mutation ($username: String!, $email: String!, $password: String!) {
      update_account(username: $username, email: $email, password: $password) {
        status
        errors {
          path
          message
        }
        user {
          _id
          username
          email
        }
      }
    }
  `,
  variables: { username, email, password }
});

export default UpdateAccount;
