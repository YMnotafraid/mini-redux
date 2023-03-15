const thunk = (storeAPI) => (next) => (action) => {
  // If the "action" is actually a function instead...
  if (typeof action === "function") {
    // 将dispatch和getstate传给当前的异步函数并调用，可以对store状态进行操作
    return action(storeAPI.dispatch, storeAPI.getState);
  }

  // 普通的对象就直接传给下个中间件直到传到reducer
  return next(action);
};
export default thunk;
