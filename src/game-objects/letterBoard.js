import { KEYS } from '../utils/constants/keyboard';
import { ROW_SCALE_FACTOR_X, ROW_SCALE_FACTOR_Y, NUM_SCALE_FACTOR_X, NUM_SCALE_FACTOR_Y, NUM_W, NUM_H, SQUARE_W, SQUARE_H } from '../utils/constants/letterboard';
import { WIDTH, HEIGHT } from '../';
import { half } from '../utils/math';
import { getBlockData } from '../utils/keyboard';

class letterBoard extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene, config.x, config.y);

    this.blocks = [];

    //* Top row
    this.upperRow = this.scene.make.image({ x: 0, y: 0, key: 'letterboard_row', scale: { x: ROW_SCALE_FACTOR_X, y: ROW_SCALE_FACTOR_Y } });
    this.upperRowNumber = this.scene.make.image({ x: 0, y: 0, key: 'letterboard_number', scale: { x: NUM_SCALE_FACTOR_X, y: NUM_SCALE_FACTOR_Y } });
    this.upperRowCount = this.scene.add.text(0, 0, '0', { fontFamily: 'Paneuropa Freeway', fontSize: '4rem', color: '#fff' });
    this.upperRowBlocks = [];

    Phaser.Display.Align.In.TopCenter(this.upperRow, this.scene.add.zone(half(WIDTH), half(HEIGHT), WIDTH, HEIGHT), -half(NUM_W * NUM_SCALE_FACTOR_X), 0);
    Phaser.Display.Align.To.RightCenter(this.upperRowNumber, this.upperRow, -1250, 0);
    Phaser.Display.Align.In.Center(this.upperRowCount, this.upperRowNumber);

    //* Middle row
    this.middleRow = this.scene.make.image({ x: 0, y: 0, key: 'letterboard_row', scale: { x: ROW_SCALE_FACTOR_X, y: ROW_SCALE_FACTOR_Y } });
    this.middleRowNumber = this.scene.make.image({ x: 0, y: 0, key: 'letterboard_number', scale: { x: NUM_SCALE_FACTOR_X, y: NUM_SCALE_FACTOR_Y } });
    this.middleRowCount = this.scene.add.text(0, 0, '0', { fontFamily: 'Paneuropa Freeway', fontSize: '4rem', color: '#fff' });
    this.middleRowBlocks = [];

    Phaser.Display.Align.To.BottomCenter(this.middleRow, this.upperRow, 0, -(NUM_H * NUM_SCALE_FACTOR_Y));
    Phaser.Display.Align.To.RightCenter(this.middleRowNumber, this.middleRow, -1250, 0);
    Phaser.Display.Align.In.Center(this.middleRowCount, this.middleRowNumber);

    //* Bottom row
    this.bottomRow = this.scene.make.image({ x: 0, y: 0, key: 'letterboard_row', scale: { x: ROW_SCALE_FACTOR_X, y: ROW_SCALE_FACTOR_Y } });
    this.bottomRowNumber = this.scene.make.image({ x: 0, y: 0, key: 'letterboard_number', scale: { x: NUM_SCALE_FACTOR_X, y: NUM_SCALE_FACTOR_Y } });
    this.bottomRowCount = this.scene.add.text(0, 0, '0', { fontFamily: 'Paneuropa Freeway', fontSize: '4rem', color: '#fff' });
    this.bottomRowBlocks = [];

    Phaser.Display.Align.To.BottomCenter(this.bottomRow, this.middleRow, 0, -(NUM_H * NUM_SCALE_FACTOR_Y));
    Phaser.Display.Align.To.RightCenter(this.bottomRowNumber, this.bottomRow, -1250, 0);
    Phaser.Display.Align.In.Center(this.bottomRowCount, this.bottomRowNumber);

    this.scene.add.existing(this);
  }
  isAnyRowFull() {
    return this.upperRowBlocks.length >= 20 || this.middleRowBlocks.length >= 20 || this.bottomRowBlocks.length >= 20;
  }
  isKeyStroke() {
    return this.upperRowBlocks.length === this.middleRowBlocks.length && this.upperRowBlocks.length === this.bottomRowBlocks.length;
  }
  isRowFull(letter) {
    if (KEYS[0].indexOf(letter) > -1) return this.upperRowBlocks.length >= 20;
    else if (KEYS[1].indexOf(letter) > -1) return this.middleRowBlocks.length >= 20;
    else if (KEYS[2].indexOf(letter) > -1) return this.bottomRowBlocks.length >= 20;
    return false;
  }
  destroyBlocks() {
    while (this.upperRowBlocks.length > 0) {
      let { block, text, colour } = this.upperRowBlocks.shift();
      block.play(`destroy_${colour}_letter`);
      if (text) text.destroy();
    }
    while (this.middleRowBlocks.length > 0) {
      let { block, text, colour } = this.middleRowBlocks.shift();
      block.play(`destroy_${colour}_letter`);
      if (text) text.destroy();
    }
    while (this.bottomRowBlocks.length > 0) {
      let { block, text, colour } = this.bottomRowBlocks.shift();
      block.play(`destroy_${colour}_letter`);
      if (text) text.destroy();
    }
  }
  getTotalPoints() {
    const upperTotal = this.upperRowBlocks.map(({ value }) => value).reduce((prev, curr) => prev + curr);
    const midTotal = this.middleRowBlocks.map(({ value }) => value).reduce((prev, curr) => prev + curr);
    const botttomTotal = this.bottomRowBlocks.map(({ value }) => value).reduce((prev, curr) => prev + curr);

    const total = upperTotal + midTotal + botttomTotal;

    return total;
  }
  resetLetterCount() {
    this.upperRowCount.setText('0');
    this.middleRowCount.setText('0');
    this.bottomRowCount.setText('0');
  }
  recenterLetterCounters() {
    Phaser.Display.Align.In.Center(this.upperRowCount, this.upperRowNumber);
    Phaser.Display.Align.In.Center(this.middleRowCount, this.middleRowNumber);
    Phaser.Display.Align.In.Center(this.bottomRowCount, this.bottomRowNumber);
  }
  constructBlock(letter) {
    const { colour, value } = getBlockData(letter);
    const block = this.scene.make.sprite({
      x: 0,
      y: 0,
      key: 'blocks_squares',
      frame: `${colour}_square_000.png`,
      scale: { x: ROW_SCALE_FACTOR_X, y: ROW_SCALE_FACTOR_Y },
    });
    const text = this.scene.add.text(0, 0, letter, { fontFamily: 'Paneuropa Freeway', fontSize: 48, color: '#000' });
    block.on('animationcomplete', () => block.destroy(), this);

    if (KEYS[0].indexOf(letter) > -1) this.addTopBlock(block, text, colour, value);
    else if (KEYS[1].indexOf(letter) > -1) this.addMiddleBlock(block, text, colour, value);
    else if (KEYS[2].indexOf(letter) > -1) this.addBottomBlock(block, text, colour, value);
  }
  constructEmptyBlocks() {
    const colour = 'red';
    const value = -1;

    const block1 = this.constructEmptyBlock(colour);
    const block2 = this.constructEmptyBlock(colour);
    const block3 = this.constructEmptyBlock(colour);

    this.addTopBlock(block1, null, colour, value);
    this.addMiddleBlock(block2, null, colour, value);
    this.addBottomBlock(block3, null, colour, value);
  }
  constructEmptyBlock(colour) {
    const block = this.scene.make.sprite({
      x: 0,
      y: 0,
      key: 'blocks_squares',
      frame: `${colour}_square_000.png`,
      scale: { x: ROW_SCALE_FACTOR_X, y: ROW_SCALE_FACTOR_Y },
    });
    block.on('animationcomplete', () => block.destroy(), this);
    return block;
  }
  addTopBlock(block, text, colour, value) {
    Phaser.Display.Align.In.Center(block, this.upperRow, SQUARE_W * (-9.5 + this.upperRowBlocks.length) * ROW_SCALE_FACTOR_X, 0);

    if (text) Phaser.Display.Align.In.Center(text, block);

    this.upperRowBlocks.push({ block, text, colour, value });

    this.upperRowCount.setText(this.upperRowBlocks.map(({ value }) => value).reduce((prev, curr) => prev + curr));
    Phaser.Display.Align.In.Center(this.upperRowCount, this.upperRowNumber);
  }
  addMiddleBlock(block, text, colour, value) {
    Phaser.Display.Align.In.Center(block, this.middleRow, SQUARE_W * (-9.5 + this.middleRowBlocks.length) * ROW_SCALE_FACTOR_X, 0);

    if (text) Phaser.Display.Align.In.Center(text, block);

    this.middleRowBlocks.push({ block, text, colour, value });

    this.middleRowCount.setText(this.middleRowBlocks.map(({ value }) => value).reduce((prev, curr) => prev + curr));
    Phaser.Display.Align.In.Center(this.middleRowCount, this.middleRowNumber);
  }
  addBottomBlock(block, text, colour, value) {
    Phaser.Display.Align.In.Center(block, this.bottomRow, SQUARE_W * (-9.5 + this.bottomRowBlocks.length) * ROW_SCALE_FACTOR_X, 0);

    if (text) Phaser.Display.Align.In.Center(text, block);

    this.bottomRowBlocks.push({ block, text, colour, value });
    this.bottomRowCount.setText(this.bottomRowBlocks.map(({ value }) => value).reduce((prev, curr) => prev + curr));
    Phaser.Display.Align.In.Center(this.bottomRowCount, this.bottomRowNumber);
  }
}

export default letterBoard;
