const bottomTier = ['a', 'd', 'e', 'g', 'i', 'l', 'n', 'o', 'r', 's', 't', 'u'];
const midTier = ['b', 'c', 'm', 'p'];
const secondTier = ['f', 'h', 'k', 'v', 'w', 'y'];
const topTier = ['j', 'q', 'x', 'z'];

export const getBlockData = (letter) => {
  if (bottomTier.indexOf(letter) > -1) return { colour: 'green', value: 1 };
  if (midTier.indexOf(letter) > -1) return { colour: 'blue', value: 3 };
  if (secondTier.indexOf(letter) > -1) return { colour: 'yellow', value: 6 };
  if (topTier.indexOf(letter) > -1) return { colour: 'pink', value: 10 };

  return { colour: 'green', value: 1 };
};
