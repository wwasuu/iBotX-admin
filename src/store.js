import { combineReducers, compose, createStore } from "redux";

const auth_login = (payload) => ({
  type: "AUTH/LOGIN",
  payload,
});

const auth_logout = () => ({
  type: "AUTH/LOGOUT",
});

const initialAuthState = {
  username: "",
  isLoggedIn: false,
};

const auth = (state = initialAuthState, action) => {
  switch (action.type) {
    case "AUTH/LOGIN":
      return {
        ...action.payload,
        isLoggedIn: true,
      };
    case "AUTH/LOGOUT":
      return initialAuthState;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers());

export default store;
