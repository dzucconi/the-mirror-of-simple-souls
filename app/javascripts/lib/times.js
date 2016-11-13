export default n => fn =>
  Array(n).fill(undefined).map(fn);
