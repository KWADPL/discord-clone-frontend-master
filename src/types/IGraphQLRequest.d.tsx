// types/IGraphQLRequest.d.ts
export default interface IGraphQLRequest {
  query: string;
  variables?: { [key: string]: any }; // Dodaj to pole, jeśli go brakuje
}
