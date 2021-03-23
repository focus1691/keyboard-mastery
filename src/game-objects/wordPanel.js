import { WIDTH, HEIGHT } from '../';
import { BLOCK_W, BLOCK_H, BLOCK_SCALE_X, BLOCK_SCALE_Y, ORIGIN_X, ORIGIN_Y, SCALE_FACTOR_X, SCALE_FACTOR_Y, INPUT_W, INPUT_H, INPUT_SCALE_FACTOR_X, INPUT_SCALE_FACTOR_Y } from '../utils/constants/wordPanel';
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

    this.tiles = [];

    Phaser.Display.Align.In.BottomCenter(this.wordPanel, this.scene.add.zone(half(WIDTH), half(HEIGHT), WIDTH, HEIGHT));

    this.input = this.scene.make.image({ x: 0, y: 0, key: 'text_input', scale: { x: INPUT_SCALE_FACTOR_X, y: INPUT_SCALE_FACTOR_Y } });
    Phaser.Display.Align.To.TopCenter(this.input, this.wordPanel, 0, -INPUT_H + 10);

    this.wordText = this.scene.make.text({
      x: 0,
      y: 0,
      text: '',
      style: { fontFamily: 'Paneuropa Freeway', fontSize: '4rem', strokeThickness: 3, color: '#000' },
    });
    Phaser.Display.Align.In.Center(this.wordText, this.input, -INPUT_W / 5, 0);

    this.createBlock('too');

    this.scene.add.existing(this);
  }
  setWord(word) {
    this.wordText.setText(word);
  }
  createBlock(word) {
    const tile = this.scene.make.image({
      x: 0,
      y: 0,
      key: 'blocks_squares',
      frame: 'green_block.png',
      scale: {
        x: BLOCK_SCALE_X,
        y: BLOCK_SCALE_Y,
      },
    });
    const text = this.scene.make.text({
      x: 0,
      y: 0,
      text: word,
      style: { fontFamily: 'Paneuropa Bankette', fontSize: '4rem', strokeThickness: 1, color: '#fff' },
    });
    tile.setDisplaySize(text.displayWidth * 2, tile.displayHeight);

    let offset = 0;
    if (this.tiles.length > 0) {
      const { displayWidth, x } = this.tiles[this.tiles.length -1].tile;
      offset = x + tile.displayWidth - ((tile.displayWidth - displayWidth) / 2);
    }

    this.tiles.push({tile, text});
    Phaser.Display.Align.In.BottomCenter(tile, this.wordPanel, this.wordPanel.displayWidth, this.wordPanel.displayHeight - text.height);
    Phaser.Display.Align.In.Center(text, tile, 0, 0);

    this.scene.tweens.add({
      targets: [tile],
      x: offset > 0 ? offset : 150,
      duration: 3000,
      ease: 'Power2',
      easeParams: [ 1.5, 0.5 ],
    });

    this.scene.tweens.add({
      targets: [text],
      x: (offset > 0 ? offset : 150) - ((tile.displayWidth / 2) - (text.displayWidth / 2)),
      duration: 3000,
      ease: 'Power2',
      easeParams: [ 1.5, 0.5 ],
    });
  }
}

export default wordPanel;
