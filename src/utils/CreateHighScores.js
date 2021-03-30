const createHighScores = (scene) => {
  let scores = [];
  for (let i = 1; i < 6; i++) {
    const label = scene.make.text({
      x: 0,
      y: 0,
      text: `${i}.`,
      style: { fontFamily: 'Paneuropa Road', fontSize: '3rem', textAlign: 'center', color: '#81ADE5' },
    });
    const score = scene.make.text({
      x: 0,
      y: 0,
      text: '100',
      style: { fontFamily: 'Paneuropa Road', fontSize: '3rem', textAlign: 'center', color: '#81ADE5' },
    });
    scores.push({ label, score });
  }
  return scores;
};

export default createHighScores;
