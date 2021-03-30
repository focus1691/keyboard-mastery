import { WIDTH, HEIGHT } from '../';
import { half } from '../utils/math';

class gameOver extends Phaser.Scene {
  constructor() {
    super('gameOver');
  }
  init() {
    this.isRestarted = false;
  }
  create() {
    this.make.image({ key: 'background_menu', x: 0, y: 0, width: this.cameras.main.width, origin: { x: 0, y: 0 }, scale: { x: 1, y: 1 } });

    this.title = this.make.image({
      x: 0,
      y: 0,
      key: 'menu',
      frame: 'game_over.png',
      scale: { x: 0.8, y: 0.8 },
    });

    this.highScoreTxt = this.make.text({
      x: 0,
      y: 0,
      text: 'High scores',
      style: { fontFamily: 'Chunk Five Print', fontSize: '5rem', textAlign: 'center', color: '#81ADE5' },
    });

    this.playBtn = this.make.image({
      x: 0,
      y: 0,
      key: 'menu',
      frame: 'play_again.png',
      scale: { x: 0.8, y: 0.8 },
    });

    this.playBtn.setInteractive();
    this.playBtn.on('pointerup', this.handlePlay, this);

    this.highScores = this.createHighScores();

    this.highScoreContainer = this.make.image({
      x: 0,
      y: 0,
      key: 'menu',
      frame: 'high_score.png',
      scale: { x: 0.8, y: 0.8 },
    });

    this.highScoresTextWrapper = this.make.image({
      x: 0,
      y: 0,
      key: 'menu',
      frame: 'high_score_names.png',
      scale: { x: 0.8, y: 0.8 },
    });

    const zone = this.add.zone(half(WIDTH), half(HEIGHT), WIDTH, HEIGHT);

    Phaser.Display.Align.In.TopCenter(this.title, zone, 0, 0);
    Phaser.Display.Align.To.BottomCenter(this.playBtn, this.title, 0, 0);

    //* High scores
    Phaser.Display.Align.To.BottomCenter(this.highScoreContainer, this.playBtn, 0, 0);
    Phaser.Display.Align.In.TopCenter(this.highScoreTxt, this.highScoreContainer, 0, -this.highScoreTxt.height - 10);
    Phaser.Display.Align.In.Center(this.highScoresTextWrapper, this.highScoreContainer);

    for (let i = 0; i < this.highScores.length; i++) {
      const { label, score } = this.highScores[i];
      if (i === 0) {
        Phaser.Display.Align.In.TopCenter(label, this.highScoresTextWrapper, -75, -40);
        Phaser.Display.Align.To.RightCenter(score, label, 50, 0);
      } else {
        Phaser.Display.Align.To.BottomCenter(label, this.highScores[i-1].label, 0, 5);
        Phaser.Display.Align.To.RightCenter(score, label, 50, 0); 
      }
      this.children.bringToTop(label);
      this.children.bringToTop(score);
    }
    this.children.bringToTop(this.highScoreTxt);
  }
  handlePlay() {
    if (!this.isRestarted) {
      this.playBtn.setFrame('play_again_active.png');
      this.time.delayedCall(1500, () => this.scene.start('playGame'), [], this);
      this.isRestarted = true;
    }
  }
  createHighScores() {
    let scores = [];
    for (let i = 1; i < 6; i++) {
      const label = this.make.text({
        x: 0,
        y: 0,
        text: `${i}.`,
        style: { fontFamily: 'Paneuropa Road', fontSize: '3rem', textAlign: 'center', color: '#81ADE5' },
      });
      const score = this.make.text({
        x: 0,
        y: 0,
        text: '100',
        style: { fontFamily: 'Paneuropa Road', fontSize: '3rem', textAlign: 'center', color: '#81ADE5' },
      });
      scores.push({ label, score });
    }
    return scores;
  }
}

export default gameOver;
