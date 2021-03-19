import { WIDTH, HEIGHT } from '../';
import { H, ORIGIN_X, ORIGIN_Y, SCALE_FACTOR_X, SCALE_FACTOR_Y } from '../utils/constants/wordPanel';
import { half } from '../utils/math';

class wordPanel extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene, config.x, config.y);

    this.wordPanel = this.scene.make.image({
      x: 0,
      y: 0,
      key: 'word_panel',
      scale: {
        x: SCALE_FACTOR_X,
        y: SCALE_FACTOR_Y,
      },
      origin: {
        x: ORIGIN_X,
        y: ORIGIN_Y,
      }
    });

    Phaser.Display.Align.In.BottomCenter(this.wordPanel, this.scene.add.zone(half(WIDTH), half(HEIGHT), WIDTH, HEIGHT));
    this.createBlock();

    this.scene.add.existing(this);
  }
  createBlock() {
    const tile = this.scene.make.image({
      x: 0,
      y: 0,
      key: 'blocks_squares',
      frame: 'green_block.png',
      scale: {
        x: SCALE_FACTOR_X / 2,
        y: SCALE_FACTOR_Y / 2,
      },
      origin: {
        x: ORIGIN_X,
        y: 0.5
      }
    });
    Phaser.Display.Align.In.BottomCenter(tile, this.wordPanel);
  }
}

export default wordPanel;
