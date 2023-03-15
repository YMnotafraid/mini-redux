export const print1 = (storeAPI) => (next) => (action) => {
  console.log("中间件1");
  return next(action);
};

export const print2 = (storeAPI) => (next) => (action) => {
  console.log("中间件2");
  return next(action);
};

export const print3 = (storeAPI) => (next) => (action) => {
  console.log("中间件3");
  return next(action);
};
