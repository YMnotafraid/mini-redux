export default function compose(...funcs) {
  if (funcs.length === 1) {
    return funcs[0];
  }
  //把我们的函数通过递归串联起来
  //在增强器合成中，上一个增强器会把增强完的store作为参数传给下一个增强器继续增强，最终返回一个最强store
  //在中间件合成中，next指向的是下一个中间件
  return funcs.reduce(
    (composed, func) =>
      (...args) =>
        composed(func(...args))
  );
}
