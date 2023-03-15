export default function createStore(reducer, preloadedState, enhancer) {
  //因为preloadedState是可选的，所以这里要特判然后做一下处理
  if (typeof preloadedState === "function") {
    enhancer = preloadedState;
    preloadedState = undefined;
  }
  //传递参数给我们的增强器
  if (typeof enhancer === "function") {
    return enhancer(createStore)(reducer, preloadedState);
  }
  //state保存最新状态
  let state = preloadedState;
  //listeners保存订阅者，元素都是回调函数
  let listeners = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
    const index = listeners.indexOf(listener);
    //默认返回取消订阅的函数
    return function unsubscibe() {
      listeners.splice(index, 1);
    };
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  // 当一个Store被创建时，会自动发送INIT Action，这样做可以初始化状态
  dispatch({ type: "@@redux/INIT" });

  return { dispatch, subscribe, getState };
}
