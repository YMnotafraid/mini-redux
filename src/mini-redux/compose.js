export default function compose(...funcs) {
  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (composed, func) =>
      (...args) =>
        composed(func(...args))
  );
}
