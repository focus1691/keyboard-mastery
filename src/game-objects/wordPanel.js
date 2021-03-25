import { WIDTH, HEIGHT } from '../';
import { BLOCK_SCALE_X, BLOCK_SCALE_Y, BLOCK_SPACE, ORIGIN_X, ORIGIN_Y, SCALE_FACTOR_X, SCALE_FACTOR_Y, INPUT_W, INPUT_H, INPUT_SCALE_FACTOR_X, INPUT_SCALE_FACTOR_Y } from '../utils/constants/wordPanel';
import { half } from '../utils/math';

class wordPanel extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene, config.x, config.y);

    this.activeTweens = 0;

    //* Word panel is the container for the word blocks
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
      },
    });

    this.tiles = [];

    //* Block Tail animation
    this.blockTail = this.scene.make.sprite({
      x: 0,
      y: 0,
      key: 'blocks_squares',
      frame: 'block_tail.png',
      scale: {
        x: BLOCK_SCALE_X,
        y: BLOCK_SCALE_Y,
      },
    });
    this.blockTail.setVisible(false);

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

    this.scene.add.existing(this);
  }
  setWord(word) {
    this.wordText.setText(word);
  }
  createWordBlock(word) {
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

    this.placeWordBlockInPanel(tile, text);
    this.blockTail.setVisible(true);

    // The total width of the blocks with this new addition
    let offset = this.calculateTotalWordBlocksWidth(tile);

    // Check that the width of adding this block will not exceed the total width available
    while (offset >= WIDTH && this.tiles.length > 0) {
      // Update the offset with the removed blocks to make space
      const blockSpace = this.destroyFirstWordBlock();
      this.moveWordBlocksAlong(blockSpace);
      // Calculate the full width with all of these blocks as the offset
      offset = this.calculateTotalWordBlocksWidth(tile);
    }

    // Update the offset to align with the next block / start if no blocks found
    const xPos = this.calculateWordBlockPosition(tile);

    // Slide it in after they are repositioned
    this.slideWordInPosition(tile, text, xPos);

    this.tiles.push({ tile, text });
  }
  calculateTotalWordBlocksWidth(tile) {
    if (this.tiles.length > 0) {
      const { displayWidth, x } = this.tiles[this.tiles.length - 1].tile;
      return BLOCK_SPACE + x + tile.displayWidth;
    }
    return BLOCK_SPACE + tile.displayWidth;
  }
  calculateWordBlockPosition(tile) {
    if (this.tiles.length > 0) {
      const { displayWidth, x } = this.tiles[this.tiles.length - 1].tile;
      return BLOCK_SPACE + x + tile.displayWidth - (tile.displayWidth - displayWidth) / 2;
    }
    return BLOCK_SPACE + tile.displayWidth - tile.displayWidth / 2;
  }
  slideWordInPosition(tile, text, xPos) {
    // Block
    this.scene.tweens.add({
      targets: [tile, this.blockTail],
      x: xPos,
      duration: 2500,
      ease: 'Power2',
      easeParams: [1.5, 0.5],
      onComplete: function () {
        this.activeTweens -= 1;
        if (this.activeTweens <= 0) {
          this.scene.onWordTweenOver();
        }
      }.bind(this),
    });

    // Text
    this.scene.tweens.add({
      targets: [text],
      x: xPos - (tile.displayWidth / 2 - text.displayWidth / 2),
      duration: 2500,
      ease: 'Power2',
      easeParams: [1.5, 0.5],
      onComplete: function () {
        this.activeTweens -= 1;
        if (this.activeTweens <= 0) {
          this.scene.onWordTweenOver();
        }
      }.bind(this),
    });

    // Tail
    this.scene.tweens.add({
      targets: [this.blockTail],
      x: xPos,
      duration: 3500,
      ease: 'Power2',
      easeParams: [1.5, 0.5],
      onComplete: function () {
        this.blockTail.setVisible(false);
        this.activeTweens -= 1;
        if (this.activeTweens <= 0) {
          this.scene.onWordTweenOver();
        }
      }.bind(this),
    });
    this.activeTweens += 3;
    this.scene.sound.play('word_slide');
  }
  placeWordBlockInPanel(tile, text) {
    Phaser.Display.Align.In.BottomCenter(tile, this.wordPanel, this.wordPanel.displayWidth, this.wordPanel.displayHeight - text.height);
    Phaser.Display.Align.In.Center(this.blockTail, tile);
    Phaser.Display.Align.In.Center(text, tile, 0, 0);
  }
  moveWordBlocksAlong(freeSpace) {
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].tile.x -= freeSpace;
      this.tiles[i].text.x -= freeSpace;
    }
  }
  destroyFirstWordBlock() {
    if (this.tiles.length === 0) return 0;

    const { text, tile } = this.tiles.shift();
    const { x, displayWidth } = tile;
    text.destroy();
    tile.destroy();
    return x + displayWidth / 2;
  }
  destroyWordBlocks() {
    while (this.tiles.length > 0) {
      const { text, tile } = this.tiles.shift();
      text.destroy();
      tile.destroy();
    }
  }
}

export default wordPanel;
