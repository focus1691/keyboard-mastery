import { WIDTH, HEIGHT } from '../';
//* Utils
import createHighScores from '../utils/text/CreateHighScores';
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

    this.tutorialBtn = this.add.image(0, 0, 'menu', 'question.png').setInteractive();
    this.tutorialBtn.on('pointerup', this.handleTutorial, this);

    const zone = this.add.zone(half(WIDTH), half(HEIGHT), WIDTH, HEIGHT);

    Phaser.Display.Align.In.TopCenter(this.title, zone, 0, -50); // title top center
    Phaser.Display.Align.To.BottomCenter(this.playBtn, this.title, 0, 50); // play button below it

    //* High scores
    Phaser.Display.Align.To.BottomCenter(this.highScoreContainer, this.playBtn, 0, 50);
    Phaser.Display.Align.In.TopCenter(this.highScoreTxt, this.highScoreContainer, 0, -this.highScoreTxt.height - 30);
    Phaser.Display.Align.In.Center(this.highScoresTextWrapper, this.highScoreContainer);
    Phaser.Display.Align.In.BottomCenter(this.tutorialBtn, this.highScoreContainer, 0, -this.tutorialBtn.height / 2 - 30);

    for (let i = 0; i < this.highScores.length; i++) {
      const { label, score } = this.highScores[i];
      let xOffset = 0;
      if (i === 0) xOffset = -40;
      if (i === 1) xOffset = -50 * 2;
      if (i === 2) xOffset = -53 * 3;
      if (i === 3) xOffset = -53 * 4;
      if (i === 4) xOffset = -55 * 5;

      Phaser.Display.Align.In.TopCenter(label, this.highScoresTextWrapper, -75, xOffset);
      Phaser.Display.Align.To.RightCenter(score, label, 50, 0);
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
  handleTutorial() {
    this.scene.start('tutorial');
  }
}

export default startMenu;
