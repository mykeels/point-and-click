/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
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
export const createLoginEvent = /* GraphQL */ `
  mutation CreateLoginEvent(
    $input: CreateLoginEventInput!
    $condition: ModelLoginEventConditionInput
  ) {
    createLoginEvent(input: $input, condition: $condition) {
      id
      user_id
      createdAt
      updatedAt
    }
  }
`;
export const updateLoginEvent = /* GraphQL */ `
  mutation UpdateLoginEvent(
    $input: UpdateLoginEventInput!
    $condition: ModelLoginEventConditionInput
  ) {
    updateLoginEvent(input: $input, condition: $condition) {
      id
      user_id
      createdAt
      updatedAt
    }
  }
`;
export const deleteLoginEvent = /* GraphQL */ `
  mutation DeleteLoginEvent(
    $input: DeleteLoginEventInput!
    $condition: ModelLoginEventConditionInput
  ) {
    deleteLoginEvent(input: $input, condition: $condition) {
      id
      user_id
      createdAt
      updatedAt
    }
  }
`;
