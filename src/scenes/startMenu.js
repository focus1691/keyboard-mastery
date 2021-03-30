import { WIDTH, HEIGHT } from '../';
import { half } from '../utils/math';

class startMenu extends Phaser.Scene {
  constructor() {
    super('startMenu');
  }
  init() {
    this.isStarted = false;
  }
  create() {
    this.make.image({ key: 'background_menu', x: 0, y: 0, width: this.cameras.main.width, origin: { x: 0, y: 0 }, scale: { x: 1, y: 1 } });

    this.title = this.make.text({
      x: 0,
      y: 0,
      text: 'Keyboard\n Mastery',
      style: { fontFamily: 'Paneuropa Freeway', fontSize: '7rem', strokeThickness: 3, color: '#000', textAlign: 'center' },
    });

    // Chunk Five Print
    this.highScoreTxt = this.make.text({
      x: 0,
      y: 0,
      text: 'High scores',
      style: { fontFamily: 'Chunk Five Print', fontSize: '5rem', strokeThickness: 3, textAlign: 'center' },
    });

    this.playBtn = this.add.image(0, 0, 'menu', 'play.png').setInteractive();
    this.playBtn.on('pointerup', this.handlePlay, this);

    this.highScore = this.add.image(0, 0, 'menu', 'high_score.png')

    const zone = this.add.zone(half(WIDTH), half(HEIGHT), WIDTH, HEIGHT);

    Phaser.Display.Align.In.TopCenter(this.title, zone, 0, -50);
    Phaser.Display.Align.To.BottomCenter(this.playBtn, this.title, 0, 50);

    //* High scores
    Phaser.Display.Align.To.BottomCenter(this.highScore, this.playBtn, 0, 50);
    Phaser.Display.Align.In.TopCenter(this.highScoreTxt, this.highScore, 0, -20);
  }
  handlePlay() {
    if (!this.isStarted) {
      this.playBtn.setFrame('play_active.png');
      this.time.delayedCall(1500, () => this.scene.start('playGame'), [], this);
      this.isStarted = true;
    }
  }
}

export default startMenu;
