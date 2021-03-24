//* Images
import backgroundImg from '../assets/images/background.png';
import wordPanelImg from '../assets/images/word_panel.png';

import keyboardContainer from '../assets/images/keyboard_container.png';
import keyboardBackground from '../assets/images/keyboard_background.png';
import keyboardOutline from '../assets/images/keyboard_outline.png';

import textInput from '../assets/images/text_input.png';

import letterBoardRow from '../assets/images/letterboard_row.png';
import letterBoardNumber from '../assets/images/letterboard_number.png';

//* Spritesheets
import blocksSquares from '../assets/sprites/blocks_squares.png';
import blocksSquaresJSON from '../assets/sprites/blocks_squares.json';
import keyboard from '../assets/sprites/keyboard.png';
import keyboardJSON from '../assets/sprites/keyboard.json';

//* Audio
import keyPressSound from '../assets/audio/computer_apple_magic_keyboard_key_press_001_17520.mp3';

export default class preloaderScene extends Phaser.Scene {
  constructor() {
    super('preloaderScene');
  }
  preload() {
    this.cameras.main.setBackgroundColor('#381889');
    console.log(NODE_ENV);

    const W = this.game.config.width;
    const H = this.game.config.height;
    const BAR_FRAME_W = W / 4;
    const BAR_FRAME_H = H / 16;
    const BAR_W = BAR_FRAME_W - 110;
    const BAR_H = BAR_FRAME_H - 10;

    this.loadingText = this.add.text(0, 0, 'Loading: ', { fontFamily: 'Paneuropa Bankette', fontSize: '5rem', fill: '#fff' });
    this.loadingText.setPosition(this.game.config.width / 2 - this.loadingText.width / 1.5, this.game.config.height / 2 - this.loadingText.height / 1.5);

    this.xPos = W / 2 - this.loadingText.width / 1.5;
    this.yPos = H / 2 + this.loadingText.height / 1.5;

    this.graphics = this.add.graphics();
    this.newGraphics = this.add.graphics();
    var progressBar = new Phaser.Geom.Rectangle(this.xPos, this.yPos, BAR_FRAME_W, BAR_FRAME_H);
    var progressBarFill = new Phaser.Geom.Rectangle(this.xPos + 5, this.yPos + 5, BAR_W, BAR_H);

    this.graphics.fillStyle(0xffffff, 2);
    this.graphics.fillRectShape(progressBar);

    this.newGraphics.fillGradientStyle(0x8b96d6, 0x281979, 0x741998, 0x8b96d6, 1);
    this.newGraphics.fillRectShape(progressBarFill);

    this.load.text('words', `${NODE_ENV === 'development' ? 'src/assets/words/' : ''}en.txt`);

    this.load.image('background', backgroundImg);

    this.load.image('word_panel', wordPanelImg);

    //* Letterboard
    this.load.image('letterboard_row', letterBoardRow);
    this.load.image('letterboard_number', letterBoardNumber);

    //* Keyboard
    this.load.image('keyboard_container', keyboardContainer);
    this.load.image('keyboard_background', keyboardBackground);
    this.load.image('keyboard_outline', keyboardOutline);

    //* Text input
    this.load.image('text_input', textInput);

    //* Word Panel
    this.load.image('word_panel', wordPanelImg);

    this.load.atlas('blocks_squares', blocksSquares, blocksSquaresJSON);
    this.load.atlas('keyboard', keyboard, keyboardJSON);

    this.load.audio('key_press', keyPressSound);

    this.load.on('progress', this.updateBar, this);
    this.load.on('complete', this.complete, this);
  }

  updateBar(percentage) {
    const W = this.game.config.width;
    const H = this.game.config.height;
    const BAR_FRAME_W = W / 4;
    const BAR_FRAME_H = H / 16;
    const BAR_W = BAR_FRAME_W - 110;
    const BAR_H = BAR_FRAME_H - 10;

    this.newGraphics.clear();
    this.newGraphics.fillGradientStyle(0x8b96d6, 0x281979, 0x741998, 0x8b96d6, 1);
    this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(this.xPos + 5, this.yPos + 5, percentage * (BAR_FRAME_W - 10), BAR_H));

    percentage = percentage * 100;
    this.loadingText.setText('Loading: ' + percentage.toFixed(2) + '%');
  }
  complete() {
    this.scene.start('playGame');
  }
}
