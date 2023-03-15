import compose from "./compose";

//中间件本质就是增强器,只能增强disptach
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState);

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => {
        dispatch(action);
      },
    };
    //赋予所有的中间件store的接口
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    //我们将所有中间件通过函数嵌套串联起来
    const dispatch = compose(...chain)(store.dispatch);

    return { ...store, dispatch };
  };
}
