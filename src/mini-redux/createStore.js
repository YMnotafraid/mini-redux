export default function createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === "function") {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer === "function") {
    return enhancer(createStore)(reducer, preloadedState);
  }

  let state = preloadedState;
  let listeners = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
    const index = listeners.indexOf(listener);
    return function unsubscibe() {
      listeners.splice(index, 1);
    };
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
    return action;
  }

  // 当一个Store被创建时，会自动发送INIT Action，这样做可以初始化状态
  dispatch({ type: "@@redux/INIT" });

  return { dispatch, subscribe, getState };
}
