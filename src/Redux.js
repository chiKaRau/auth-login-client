import { combineReducers, createStore } from "redux";

// Actions.js
export const addOneAction = () => ({
  type: "ADD_ONE"
});

export const subtractOneAction = () => ({
  type: "SUBTRACT_ONE"
});

export const setZeroAction = payload => ({
  type: "SET_ZERO",
  PAYLOAD: payload
});

// DataReducer.js
const initialState = {
  counter: 0
};
export const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ONE":
      return { ...state, counter: state.counter + 1 };
    case "SUBTRACT_ONE":
      return { ...state, counter: state.counter - 1 };
    case "SET_ZERO":
      return { ...state, counter: action.PAYLOAD.zero };
    default:
      return state;
  }
};

// RootReducer.js
export const RootReducer = combineReducers({
  DataReducer
});

// Store.js
export default function configureStore() {
  return createStore(RootReducer);
}
