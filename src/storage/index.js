export const getHighScores = () => {
  let highScores = [0, 0, 0, 0, 0];
  
  try {
    const scoresStr = localStorage.getItem('highScores');

    if (scoresStr) highScores = JSON.parse(scoresStr);
  } catch (error) {
    highScores = [0, 0, 0, 0, 0];
    return highScores;
  } finally {
    return highScores;
  }
};

export const setHighScores = (scores) => {
  try {
    localStorage.setItem('highScores', JSON.stringify(scores));
  } catch (error) {

  }
};

export const updateHighScores = (newScore) => {
  const highScores = getHighScores();
  for (let i = 0; i < highScores.length; i++) {
    if (newScore >= highScores[i]) {
      highScores.splice(i, 0, newScore);
      highScores.pop();
      break;
    }
  }
  return highScores;
};
