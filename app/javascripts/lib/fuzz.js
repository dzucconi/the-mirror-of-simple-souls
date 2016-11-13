export default target => {
  return Math.random() * ((target + 0.5) - (target - 0.5)) + (target - 0.5);
};
