import params from 'queryparams';
import qs from 'qs';
import debounce from 'debounce';
import Marquee from './lib/marquee';
import height from './lib/height';

const DOM = {
  app: document.getElementById('app'),
};

window.url = xs => qs.stringify(xs, { indices: false });

export default () => {
  const PARAMS = params();

  const xs = Object.keys(PARAMS).map(key => PARAMS[key]);

  const config = xs.length ? xs : [
    ['fastest', 7],
    ['faster', 6],
    ['fast', 5],
    ['normal', 4],
    ['slow', 3],
    ['slower', 2],
    ['slowest', 1],
  ];

  let marquees = [];

  const init = () => {
    marquees = config.map(([text, speed]) => new Marquee(text, speed));

    marquees
      .map(m => {
        DOM.app.appendChild(m.render(height(DOM.app) / marquees.length));
        m.run();
      });
  };

  const reinit = debounce(() => {
    marquees.map(m => m.destroy(DOM.app));
    init();
  }, 500);

  window.addEventListener('resize', reinit);

  init();
};
