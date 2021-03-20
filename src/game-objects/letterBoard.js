import { WIDTH, HEIGHT } from '../';
import { half } from '../utils/math';

class letterBoard extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene, config.x, config.y);

    this.letterBoardRow = this.scene.make.image({
      x: 0,
      y: 0,
      key: 'letterboard_row',
      scale: {
        x: 0.4,
        y: 0.5,
      },
      origin: {
        x: 0.5,
        y: 0.5,
      }
    });

    this.letterBoardNumber = this.scene.make.image({
      x: 0,
      y: 0,
      key: 'letterboard_number',
      scale: {
        x: 0.5,
        y: 0.5,
      },
      origin: {
        x: 0.5,
        y: 0.5,
      }
    });

    Phaser.Display.Align.In.TopCenter(this.letterBoardRow, this.scene.add.zone(half(WIDTH), half(HEIGHT), WIDTH, HEIGHT));
    Phaser.Display.Align.To.BottomCenter(this.letterBoardNumber, this.letterBoardRow);

    this.scene.add.existing(this);
  }
}

export default letterBoard;
