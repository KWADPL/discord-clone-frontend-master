import { saveToLocalStorage } from "../../services/authentication";

const INITIAL_STATE: any = {
  push_to_talk_key: "t",
  microphone: true,
  headphones: true,
  friends: [],
  friend_requests: [],
  servers: []
};

const updateUser = (fields: any) => {
  const oldUser = JSON.parse(localStorage.getItem("@discord:user") as string);
  const newUser = { ...oldUser, ...fields };
  saveToLocalStorage({ user: newUser, token: oldUser.token });

  return { ...newUser, token: oldUser.token };
};

interface Dictionary {
  [key: string]: <T>(state: T, action: any) => T;
}

const handlers: Dictionary = {
  SET_USER: <T>(state: T, action: any) => action.user,
  UPDATE_USER: <T>(state: T, action: { fields: any }) =>
    updateUser(action.fields)
};

function reducer(state = INITIAL_STATE, action: { type: string | number }) {
  const handler = handlers[action.type];

  return handler ? handler(state, action) : state;
}

export default reducer;
