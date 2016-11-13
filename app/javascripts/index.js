import axios from 'axios';
import parameters from 'queryparams';
import debounce from 'debounce';
import Marquee from './lib/marquee';
import height from './lib/height';
import * as misspell from './lib/misspell';
import fuzz from './lib/fuzz';
import times from './lib/times';

const DOM = {
  app: document.getElementById('app'),
};

window.parameters = parameters;

export default () => {
  const { ratio, misspelt, speed, n, style } = parameters({
    ratio: 7,
    misspelt: true,
    speed: 5.0,
    n: 1,
    style: '',
  });

  axios
    .get('books/The%20Mirror%20of%20Simple%20Souls%20-%20Margeurite%20Porete.txt')
    .then(({ data }) => {
      const book = data.split('\n');

      const text = times(n)(() => [book.slice(0), fuzz(speed)]);

      let marquees = [];

      const init = () => {
        marquees = text.map(([message, speed]) =>
          new Marquee({
            speed,
            style,
            messages: message,
            intercept: misspelt ? misspell.all : undefined,
          })
        );

        marquees
          .map(m => {
            DOM.app.appendChild(m.render(height(DOM.app) / marquees.length, ratio));
            m.run();
          });
      };

      const reinit = debounce(() => {
        marquees.map(m => m.destroy(DOM.app));
        init();
      }, 500);

      window.addEventListener('resize', reinit);

      init();
    });
};
