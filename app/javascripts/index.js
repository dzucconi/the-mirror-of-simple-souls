import debounce from 'debounce';
import Marquee from './lib/marquee';

const DOM = {
  app: document.getElementById('app'),
};

export default () => {
  let marquees = [];

  const init = () => {
    marquees = [
      new Marquee('most boring', 7),
      new Marquee('more boring', 6),
      new Marquee('boring', 5),
      new Marquee('normal', 4),
      new Marquee('interesting', 3),
      new Marquee('more interesting', 2),
      new Marquee('most interesting', 1),
    ];

    marquees
      .map(m => {
        DOM.app.appendChild(m.render(window.innerHeight / marquees.length));
        m.run();
      });
  };

  const reinit = debounce(() => {
    marquees.map(m => m.destroy(DOM.app));
    init();
  }, 1000);

  window.addEventListener('resize', reinit);

  init();
};
