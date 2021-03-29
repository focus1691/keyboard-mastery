import { WIDTH, HEIGHT } from '../';
import { half } from '../utils/math';

class startMenu extends Phaser.Scene {
  constructor() {
    super('startMenu');
  }
  create() {
    this.make.image({ key: 'background_menu', x: 0, y: 0, width: this.cameras.main.width, origin: { x: 0, y: 0 }, scale: { x: 1, y: 1 } });

    this.title = this.make.text({
      x: 0,
      y: 0,
      text: 'Keyboard\n Mastery',
      style: { fontFamily: 'Paneuropa Freeway', fontSize: '7rem', strokeThickness: 3, color: '#000', textAlign: 'center' },
    });

    Phaser.Display.Align.In.TopCenter(this.title, this.add.zone(half(WIDTH), half(HEIGHT), WIDTH, HEIGHT));
  }
}

export default startMenu;
