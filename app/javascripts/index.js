import axios from 'axios';
import parameters from 'queryparams';
import debounce from 'debounce';
import Marquee from './lib/marquee';
import height from './lib/height';
import * as misspell from './lib/misspell';
import fuzz from './lib/fuzz';

const DOM = {
  app: document.getElementById('app'),
};

window.parameters = parameters;

export default () => {
  const { misspelt, ratio, speed } = parameters({
    ratio: 1,
    misspelt: true,
    speed: 5.0
  });

  axios
    .get('/books/The%20Mirror%20of%20Simple%20Souls%20-%20Margeurite%20Porete.txt')
    .then(({ data }) => {
      const book = data.split('\n');

      const text = [
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
        [book.slice(0), fuzz(speed)],
      ];

      let marquees = [];

      const init = () => {
        marquees = text.map(([message, speed]) =>
          new Marquee(message, speed, misspelt ? misspell.all : undefined));

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
