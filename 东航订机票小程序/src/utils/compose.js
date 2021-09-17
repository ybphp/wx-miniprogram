function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  funcs = funcs.filter(func => typeof func === 'function')

  if (funcs.length === 1) {
    return funcs[0]
  }

  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
}

module.exports = compose;
