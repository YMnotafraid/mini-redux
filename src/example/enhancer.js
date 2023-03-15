export function dispatchEnhancer(createStore) {
  return function (reducer, preloadedState) {
    const store = createStore(reducer, preloadedState);
    const newDispatch = (action) => {
      store.dispatch(action);
      console.log("增强了dispatch");
    };

    return { ...store, dispatch: newDispatch };
  };
}

export function subscribeEnhancer(createStore) {
  return function (reducer, preloadedState) {
    const store = createStore(reducer, preloadedState);
    const newsubscribe = (listener) => {
      console.log("增强了subscribe");
      store.subscribe(listener);
      return store.subscribe(listener);
    };

    return { ...store, subscribe: newsubscribe };
  };
}
