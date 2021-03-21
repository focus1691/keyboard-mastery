const bottomTier = ['a', 'd', 'e', 'g', 'i', 'l', 'n', 'o', 'r', 's', 't', 'u'];
const midTier = ['b', 'c', 'm', 'p'];
const secondTier = ['f', 'h', 'k', 'v', 'w', 'y'];
const topTier = ['j', 'q', 'x', 'z'];

export const getBlockColour = (letter) => {
  if (bottomTier.indexOf(letter) > -1) return 'green';
  if (midTier.indexOf(letter) > -1) return 'blue';
  if (secondTier.indexOf(letter) > -1) return 'yellow';
  if (topTier.indexOf(letter) > -1) return 'pink';

  return 'green';
};
