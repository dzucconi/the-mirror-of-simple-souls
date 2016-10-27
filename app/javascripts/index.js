const DOM = {
  app: document.getElementById('app'),
};

const marquee = () => {
  const el = document.createElement('DIV');
  el.className = 'marquee';
  DOM.app.appendChild(el);
  return el;
};

const segment = (container, text) => {
  const el = document.createElement('DIV');
  el.className = 'crawler';
  el.innerText = text;
  container.appendChild(el);
  return el;
};

const queue = (container, text, amount = 4) =>
  new Promise(resolve => {
    const el = segment(container, text + '\xa0');

    const bounds = -(el.offsetWidth);
    const limit = -(el.offsetWidth + container.offsetWidth);

    let left = 0;

    function tick () {
      el.style.transform = `translateX(${left -= amount}px)`;

      // Next
      if (left < bounds) resolve();

      // Animate
      if (left > limit) window.requestAnimationFrame(tick);

      // Done
      if (left <= limit) container.removeChild(el);
    }
    tick();

    return el;
  });

export default () => {
  const run = (container, lines, amount = 4) =>
    lines.reduce((promise, line) => {
      return promise.then(() => queue(container, line, amount));
    }, Promise.resolve(true))
    .then(() => run(container, lines, amount));

  run(marquee(), ['fastest'], 7);
  run(marquee(), ['faster'], 6);
  run(marquee(), ['fast'], 5);
  run(marquee(), ['normal'], 4);
  run(marquee(), ['slow'], 3);
  run(marquee(), ['slower'], 2);
  run(marquee(), ['slowest'], 1);
};
