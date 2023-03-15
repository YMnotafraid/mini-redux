import { createStore, combineReducers, compose } from "./src/mini-redux/index";
import { dispatchEnhancer, subscribeEnhancer } from "./src/example/enhancer";
const initState = {
  value: 1,
};
const counterReducer = (state = initState, action) => {
  switch (action.type) {
    case "counter/add":
      return { ...state, value: state.value + 1 };
    case "counter/sub":
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
};
const nameReducer = (state = { name: "lym" }, action) => {
  switch (action.type) {
    case "name/add":
      return { ...state, name: "luoyuming" };
    case "name/sub":
      return { ...state, name: "m" };
    default:
      return state;
  }
};

const reducer = combineReducers({ counterReducer, nameReducer });
const enhancer = compose(subscribeEnhancer, dispatchEnhancer);
const store = createStore(reducer, undefined, enhancer);

const render = () => {
  document.querySelector(".counter").innerHTML =
    store.getState().counterReducer.value;
  document.querySelector(".name").innerHTML = store.getState().nameReducer.name;
};

store.subscribe(render);

document.querySelector(".add").addEventListener("click", () => {
  store.dispatch({ type: "counter/add" });
});

document.querySelector(".sub").addEventListener("click", () => {
  store.dispatch({ type: "counter/sub" });
});

document.querySelector(".long").addEventListener("click", () => {
  store.dispatch({ type: "name/add" });
});

document.querySelector(".short").addEventListener("click", () => {
  store.dispatch({ type: "name/sub" });
});

render();
