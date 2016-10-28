export default el => {
  const { paddingTop, paddingBottom } = getComputedStyle(el);
  return el.clientHeight - (parseFloat(paddingTop) + parseFloat(paddingBottom));
};
