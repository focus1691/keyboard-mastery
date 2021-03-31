import { getHighScores } from '../../storage';

const createHighScores = (scene) => {
  const highScores = getHighScores();
  let scores = [];
  for (let i = 0; i < highScores.length; i++) {
    const label = scene.make.text({
      x: 0,
      y: 0,
      text: `${i+1}.`,
      style: { fontFamily: 'Paneuropa Road', fontSize: '3rem', textAlign: 'center', color: '#81ADE5' },
    });
    const score = scene.make.text({
      x: 0,
      y: 0,
      text: highScores[i],
      style: { fontFamily: 'Paneuropa Road', fontSize: '3rem', textAlign: 'center', color: '#81ADE5' },
    });
    scores.push({ label, score });
  }
  return scores;
};

export default createHighScores;
