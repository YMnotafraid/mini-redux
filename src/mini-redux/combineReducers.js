export default function combineReducers(reducers) {
  //将所有reducer合成一个大reducer并返回
  return function reducer(state = {}, action) {
    //大reducer的最新状态
    let nextState = {};
    //大reducer是否发生了修改
    let hasChanged = false;
    //遍历所有的小reducer
    for (let key in reducers) {
      //当前小reducer的旧状态
      const preState = state[key];
      //调用当前小redcuer获取新状态
      nextState[key] = reducers[key](preState, action);
      //如果有小reducer发生状态更新，那么大reduer就会更新状态
      hasChanged = hasChanged || nextState[key] !== preState;
    }
    return hasChanged ? nextState : state;
  };
}
