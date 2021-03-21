//* Game Objects
import Keyboard from '../game-objects/keyboard';
import LetterBoard from '../game-objects/letterBoard';
import WordPanel from '../game-objects/wordPanel';
//* Utils
import { KEYBOARD_H, KEY_SCALE_FACTOR } from '../utils/constants/keyboard';
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
    this.answerSubmitted = false;
  }
  create() {
    this.sound.volume = 0.1;

    this.words = this.cache.text.get('words').split('\n');

    this.make.image({ key: 'background', x: 0, y: 0, width: this.cameras.main.width, origin: { x: 0, y: 0 }, scale: { x: 1, y: 1 } });

    //* Components
    this.letterBoard = new LetterBoard(this, { x: 0, y: 0 });
    this.keyboard = new Keyboard(this, { x: WIDTH / 2, y: HEIGHT - KEYBOARD_H * KEY_SCALE_FACTOR });
    this.wordPanel = new WordPanel(this, { x: 0, y: 0 });

    this.input.keyboard.on(
      'keydown',
      function (event) {
        if (this.answerSubmitted) return;

        let key = event.key.toLowerCase();
        // Spacebar
        if (key === ' ') {
          key = 'space';
        }

        if (this.keyboard.keys[`${key}-key`]) {
          if (key === 'enter') {
            this.answerSubmitted = true;
            this.submitWord();
          } else if (key === 'backspace') {
            this.word = this.word.substring(0, this.word.length - 1);
          } else {
            this.word += key;
          }
          this.keyboard.keys[`${key}-key`].setFrame(`${key}_key_pressed.png`);
          this.sound.play('key_press');
        }
      },
      this
    );

    this.input.keyboard.on(
      'keyup',
      function (event) {
        let key = event.key.toLowerCase();

        // Spacebar
        if (key === ' ') {
          key = 'space';
        }

        if (this.keyboard.keys[`${key}-key`]) {
          this.keyboard.keys[`${key}-key`].setFrame(`${key}_key.png`);
        }
      },
      this
    );
  }
  submitWord() {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.length > 0) {
          handleWordCorrect();
        } else {
          handleWordError();
        }
        this.answerSubmitted = false;
      });
  }
  handleWordCorrect() {
    this.word = '';
  }
  handleWordError() {
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
