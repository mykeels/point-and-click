/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      x
      y
      user
      color
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        x
        y
        user
        color
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLoginEvent = /* GraphQL */ `
  query GetLoginEvent($id: ID!) {
    getLoginEvent(id: $id) {
      id
      user_id
      createdAt
      updatedAt
    }
  }
`;
export const listLoginEvents = /* GraphQL */ `
  query ListLoginEvents(
    $filter: ModelLoginEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLoginEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
