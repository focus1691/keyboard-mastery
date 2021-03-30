import { WIDTH, HEIGHT } from '../';
//* Utils
import createHighScores from '../utils/CreateHighScores';
import { BUTTON_HANG_TIME } from '../utils/constants/menu';
import { half } from '../utils/math';

class startMenu extends Phaser.Scene {
  constructor() {
    super('startMenu');
  }
  init() {
    this.isStarted = false;
  }
  create() {
    //* Audio
    if (this.sound.get('theme_song')) {
      this.sound.stopByKey('theme_song');
    } else {
      this.sound.add('theme_song');
      this.sound.volume = 0.2;
    }

    this.make.image({ key: 'background_menu', x: 0, y: 0, width: this.cameras.main.width, origin: { x: 0, y: 0 }, scale: { x: 1, y: 1 } });

    this.title = this.make.text({
      x: 0,
      y: 0,
      text: 'Keyboard Mastery',
      style: { fontFamily: 'Chunk Five Print', fontSize: '10rem', color: '#81ADE5', textAlign: 'center' },
    });

    // Chunk Five Print
    this.highScoreTxt = this.make.text({
      x: 0,
      y: 0,
      text: 'High scores',
      style: { fontFamily: 'Chunk Five Print', fontSize: '4rem', strokeThickness: 3, textAlign: 'center', color: '#81ADE5' },
    });

    this.playBtn = this.add.image(0, 0, 'menu', 'play.png').setInteractive();
    this.playBtn.on('pointerup', this.handlePlay, this);

    this.highScores = createHighScores(this);
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

    Phaser.Display.Align.In.TopCenter(this.title, zone, 0, -50);
    Phaser.Display.Align.To.BottomCenter(this.playBtn, this.title, 0, 50);

    //* High scores
    Phaser.Display.Align.To.BottomCenter(this.highScoreContainer, this.playBtn, 0, 50);
    Phaser.Display.Align.In.TopCenter(this.highScoreTxt, this.highScoreContainer, 0, -this.highScoreTxt.height - 30);
    Phaser.Display.Align.In.Center(this.highScoresTextWrapper, this.highScoreContainer);

    for (let i = 0; i < this.highScores.length; i++) {
      const { label, score } = this.highScores[i];
      if (i === 0) {
        Phaser.Display.Align.In.TopCenter(label, this.highScoresTextWrapper, -75, -40);
        Phaser.Display.Align.To.RightCenter(score, label, 50, 0);
      } else {
        Phaser.Display.Align.To.BottomCenter(label, this.highScores[i - 1].label, 0, 5);
        Phaser.Display.Align.To.RightCenter(score, label, 50, 0);
      }
      this.children.bringToTop(label);
      this.children.bringToTop(score);
    }

    this.children.bringToTop(this.highScoreTxt);
  }
  handlePlay() {
    if (!this.isStarted) {
      this.playBtn.setFrame('play_active.png');
      this.sound.play('button_click');
      this.time.delayedCall(BUTTON_HANG_TIME, () => this.scene.start('playGame'), [], this);
      this.isStarted = true;
    }
  }
}

export default startMenu;
