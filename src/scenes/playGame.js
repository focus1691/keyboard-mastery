//* Game Objects
import Keyboard from '../game-objects/keyboard';
import LetterBoard from '../game-objects/letterBoard';
import WordPanel from '../game-objects/wordPanel';
//* Utils
import { ALPHABET, KEYBOARD_H, KEY_SCALE_FACTOR } from '../utils/constants/keyboard';
import { binarySearch } from '../utils/search';
import { WIDTH, HEIGHT } from '..';

class playGame extends Phaser.Scene {
  constructor() {
    super('playGame');
  }
  init() {
    this.accumMS = 0;
    this.hzMS = (1 / 60) * 1000;
    this.word = '';
    this.processingAnswer = false;
  }
  create() {
    this.sound.volume = 0.1;

    this.words = this.cache.text.get('words').split('\n').map((word) => word.trim());

    this.make.image({ key: 'background', x: 0, y: 0, width: this.cameras.main.width, origin: { x: 0, y: 0 }, scale: { x: 1, y: 1 } });

    //* Components
    this.letterBoard = new LetterBoard(this, { x: 0, y: 0 });
    this.keyboard = new Keyboard(this, { x: WIDTH / 2, y: HEIGHT - KEYBOARD_H * KEY_SCALE_FACTOR });
    this.wordPanel = new WordPanel(this, { x: 0, y: 0 });

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
    if (binarySearch(this.words, this.word) > -1) {
      this.handleWordCorrect();
    } else {
      this.handleWordError();
    }
    this.processingAnswer = false;
  }
  handleWordCorrect() {
    console.log(`${this.word} word exists`);
    this.word = '';
  }
  handleWordError() {
    console.log(`${this.word} word doesn't exist`);
    this.word = '';
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
