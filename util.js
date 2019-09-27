const Z = f => (x => x(x))(x => f(y => x(x)(y)));

const curry = (fn, arity = fn.length) => {
  const gatherArgs = (x, size = 1, args = []) =>
    size === arity
      ? fn(...args, x)
      : y => gatherArgs(y, size + 1, [...args, x]);

  return gatherArgs;
};

module.exports = {
  curry,
  Z,
};
