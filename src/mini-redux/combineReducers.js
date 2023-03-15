export default function combineReducers(reducers) {
  return function reducer(state = {}, action) {
    let nextState = {};
    let hasChanged = false;
    for (let key in reducers) {
      console.log(state);
      const preState = state[key];
      nextState[key] = reducers[key](preState, action);
      hasChanged = hasChanged || nextState[key] !== preState;
    }
    return hasChanged ? nextState : state;
  };
}
