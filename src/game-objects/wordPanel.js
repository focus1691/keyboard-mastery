import { WIDTH, HEIGHT } from '../';
import { BLOCK_W, BLOCK_H, ORIGIN_X, ORIGIN_Y, SCALE_FACTOR_X, SCALE_FACTOR_Y, INPUT_W, INPUT_H, INPUT_SCALE_FACTOR_X, INPUT_SCALE_FACTOR_Y } from '../utils/constants/wordPanel';
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

    this.input = this.scene.make.image({ x: 0, y: 0, key: 'text_input', scale: { x: INPUT_SCALE_FACTOR_X, y: INPUT_SCALE_FACTOR_Y } });
    Phaser.Display.Align.To.TopCenter(this.input, this.wordPanel, 0, -(INPUT_H / 1.5));

    this.wordText = this.scene.make.text({
      x: 0,
      y: 0,
      text: '',
      style: { fontFamily: 'Paneuropa Freeway', fontSize: '4rem', strokeThickness: 3, color: '#000' },
    });
    Phaser.Display.Align.In.Center(this.wordText, this.input, -INPUT_W / 5, 0);

    this.scene.add.existing(this);
  }
  setWord(word) {
    this.wordText.setText(word);
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
        y: ORIGIN_Y,
      }
    });
    Phaser.Display.Align.In.BottomCenter(tile, this.wordPanel, -(BLOCK_W * SCALE_FACTOR_X), -(BLOCK_H));


    const tile2 = this.scene.make.image({
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
        y: ORIGIN_Y,
      }
    });
    Phaser.Display.Align.In.BottomCenter(tile2, this.wordPanel, 0, -(BLOCK_H));
  }
}

export default wordPanel;
