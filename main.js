import createStore from "./src/mini-redux/createStore";

const initState = {
  value: 1,
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case "counter/add":
      return { ...state, value: state.value + 1 };
    case "counter/sub":
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log(store);
const render = () => {
  document.querySelector(".counter").innerHTML = store.getState().value;
};

store.subscribe(render);

document.querySelector(".add").addEventListener("click", () => {
  store.dispatch({ type: "counter/add" });
});

document.querySelector(".sub").addEventListener("click", () => {
  store.dispatch({ type: "counter/sub" });
});

render();
