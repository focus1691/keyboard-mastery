//* Game Objects
import Keyboard from '../game-objects/keyboard';
import LetterBoard from '../game-objects/letterBoard';
import WordPanel from '../game-objects/wordPanel';
//* Utils
import { ALPHABET, KEYBOARD_H, KEY_SCALE_FACTOR } from '../utils/constants/keyboard';
import { binarySearch } from '../utils/search';
import { half } from '../utils/math';

import { WIDTH, HEIGHT, assetsDPR } from '..';

class playGame extends Phaser.Scene {
  constructor() {
    super('playGame');
  }
  init() {
    this.accumMS = 0;
    this.hzMS = (1 / 60) * 1000;
    this.word = '';
    this.processingAnswer = false;
    this.score = 0;
  }
  create() {
    this.sound.volume = 0.1;

    this.wordList = this.cache.text.get('words').split('\n').map((word) => word.trim());

    this.make.image({ key: 'background', x: 0, y: 0, width: this.cameras.main.width, origin: { x: 0, y: 0 }, scale: { x: 1, y: 1 } });

    //* Components
    this.letterBoard = new LetterBoard(this, { x: 0, y: 0 });
    this.keyboard = new Keyboard(this, { x: WIDTH / 2, y: HEIGHT - KEYBOARD_H * KEY_SCALE_FACTOR });
    this.wordPanel = new WordPanel(this, { x: 0, y: 0 });

    this.scoreText = this.make.text({
      x: 0,
      y: 0,
      text: `${this.score}`,
      style: { fontFamily: 'Paneuropa Freeway', fontSize: '7rem', strokeThickness: 3, color: '#000' },
    });
    this.scoreZone = this.add.zone(half(WIDTH), half(HEIGHT), WIDTH - 20, HEIGHT - 20);
    Phaser.Display.Align.In.TopRight(this.scoreText, this.scoreZone);

    //* Letter animations
    this.createAnimation('destroy_green_letter', 'blocks_squares', 'green_square_00', 0, 5, '.png', false, 0, 10);
    this.createAnimation('destroy_blue_letter', 'blocks_squares', 'blue_square_00', 0, 5, '.png', false, 0, 10);
    this.createAnimation('destroy_yellow_letter', 'blocks_squares', 'yellow_square_00', 0, 5, '.png', false, 0, 10);
    this.createAnimation('destroy_pink_letter', 'blocks_squares', 'pink_square_00', 0, 5, '.png', false, 0, 10);

    this.input.keyboard.on(
      'keydown',
      function (event) {
        if (this.processingAnswer) return;

        let key = event.key.toLowerCase();

        if (ALPHABET.includes(key)) {
          this.word += key;
          this.keyboard.keys[`${key}-key`].setFrame(`${key}_key_pressed.png`);
          this.sound.play('key_press');
        } else if (key === 'enter') {
          this.processingAnswer = true;
          this.submitWord();
        } else if (key === 'backspace') {
          this.word = this.word.substring(0, this.word.length - 1);
        }
      },
      this
    );

    this.input.keyboard.on(
      'keyup',
      function (event) {
        let key = event.key.toLowerCase();

        if (ALPHABET.includes(key)) {
          this.keyboard.keys[`${key}-key`].setFrame(`${key}_key.png`);
        }
      },
      this
    );
  }
  submitWord() {
    if (binarySearch(this.wordList, this.word) > -1) {
      this.handleWordCorrect();
    } else {
      this.handleWordError();
    }
    this.processingAnswer = false;
  }
  handleWordCorrect() {
    console.log(`${this.word} word exists`);

    for (let i = 0; i < this.word.length; i++) {
      const letter = this.word[i];
      if (!this.letterBoard.isRowFull(letter)) {
        this.letterBoard.constructBlock(letter);
      } else {
        //! Game Over
        this.handleGameOver();
      }
    }

    if (this.letterBoard.isKeyStroke()) {
      // Update score
      const points = this.letterBoard.getTotalPoints();
      this.score += points;
      this.scoreText.setText(this.score);
      Phaser.Display.Align.In.TopRight(this.scoreText, this.scoreZone);

      // Destroy blocks
      this.letterBoard.destroyBlocks();
      this.letterBoard.resetLetterCount();
      this.letterBoard.recenterLetterCounters();
    }

    this.clearWord();
  }
  handleWordError() {
    console.log(`${this.word} word doesn't exist`);
    this.clearWord();
  }
  handleGameOver() {

  }
  clearWord() {
    this.word = '';
  }
  createAnimation(key, name, prefix, start, end, suffix, yoyo, repeat, frameRate) {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNames(name, {
        prefix,
        start,
        end,
        suffix,
      }),
      frameRate,
      yoyo,
      repeat,
    });
  }
  update(time, delta) {
    this.accumMS += delta;

    if (this.accumMS >= this.hzMS) {
    }
    while (this.accumMS >= this.hzMS) {
      this.accumMS -= this.hzMS;
    }
  }
}

export default playGame;
