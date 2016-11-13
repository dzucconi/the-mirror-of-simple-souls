import { knuthShuffle as shuffle } from 'knuth-shuffle';

const misspell = token => {
  const chars = token.split('');
  const first = chars.shift();
  const last = chars.pop();
  return first + shuffle(chars).join('') + last;
};

export const word = token => {
  if (token.length <= 3) return token;

  let tries = 1;
  let misspelt = misspell(token);

  while (token === misspelt) {
    if (tries > 50) break;
    misspelt = misspell(token);
    tries++;
  }

  return misspelt;
};

export const all = text =>
  text.replace(/(\w+)/g, word);
