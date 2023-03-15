import compose from "./compose";

export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState);

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => {
        dispatch(action);
      },
    };

    const chain = middlewares.map((middleware) => middleware(middlewareAPI));

    const dispatch = compose(...chain)(store.dispatch);

    return { ...store, dispatch };
  };
}
